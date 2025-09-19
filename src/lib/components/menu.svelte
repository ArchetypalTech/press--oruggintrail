<script lang="ts">
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { Icon } from '@archetypaltech/ayiui';
	import { page } from '$app/state';

	type MenuLink = {
		children?: MenuLink[];
		link?: string;
		label: string;
		id?: string;
	};
	type NestedPaths = {
		id: string;
		label: string;
		link: string;
		published: boolean;
	};
	interface Graph {
		id: string;
		label: string;
		children: NestedPaths[];
	}
	interface Props {
		nav?: [MenuLink[], MenuLink[]];
		label?: string;
		graph?: {
			type: string;
			data: Graph[];
		};
		path?: string;
		sidebar?: boolean;
		page: unknown;
		isChild?: boolean;
		isMobile?: boolean;
		children?: () => any;
	}
	let {
		nav,
		graph,
		path = '/',
		isChild = false,
		sidebar = $bindable(),
		label = 'Contents',
		isMobile = false,
		children
	}: Props = $props();
	type DirectoryToggle = {
		[K: string]: boolean;
	};

	let currentPage = $state('');
	let dirs = $state<DirectoryToggle>({});
	$effect(() => {
		currentPage = page.url.pathname.slice(1);
	});

	function rando() {
		return Math.random().toString(36).substring(2, 15);
	}
	function node(child: MenuLink, children?: MenuLink[]) {
		const opts = children ? { children } : { link: child?.link };
		return {
			id: child.label + rando(),
			label: child.label,
			...opts
		};
	}

	let navmenu = nav
		?.flatMap((groups: MenuLink[]) => groups)
		.map((link) => {
			let children = link?.children?.map((child) => node(child));
			return node(link, children);
		});

	function handle(id: string) {
		if (!dirs[id]) return (dirs[id] = true);
		dirs[id] = false;
	}
	function simulateClick(e: KeyboardEvent, node: HTMLElement) {
		const allowed = ['Space', 'Enter'];
		if (allowed.includes(e.code)) {
			handle(node.id);
			e.target && e.target.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		}
	}
	function handleMobileMenu() {
		if (isChild || window.innerWidth > 768) return;
		sidebar = !sidebar;
	}
	function closeWhenMobile() {
		if (!sidebar || isChild) return;
		setTimeout(() => (sidebar = !sidebar), 400);
	}
	onMount(() => {
		const nodes = path.split('/');
		nodes.forEach((name) => (dirs[name] = true));
	});
</script>

{#snippet link(node: MenuLink)}
	<li
		onclick={closeWhenMobile}
		class:disabled={node?.disable}
		class:is-active={node.link === currentPage}
		class="group"
	>
		<div class="circle group-hover:transition-none"></div>
		<a
			target={node.link?.includes('https') ? '_blank' : '_self'}
			tabindex={sidebar ? 0 : -1}
			class="link group-hover:text-accent transition-colors"
			href={`${node.link?.includes('https') ? '' : '/'}${node.link}`}>{node.label}</a
		>
	</li>
{/snippet}
{#snippet directory(node: MenuLink, isRoot = false)}
	<li class:is-root={isRoot}>
		<label
			aria-label={node.label}
			tabindex={sidebar ? 0 : -1}
			onkeypress={(e): KeyboardEvent => simulateClick(e, node.id)}
			onclick={() => handle(node.id)}
			class="block cursor-pointer font-bold transition-all hover:pl-2"
			for={`directory-${node.id}`}>{node.label}</label
		>
		<input
			type="checkbox"
			aria-checked={!!dirs?.[node.id!]}
			class="accordion-checkbox peer hidden"
			id={`directory-${node.id}`}
		/>

		{#if dirs?.[node.id!]}
			<ul
				in:slide
				out:slide
				class="accordion-body mt-1 ml-4 flex flex-col gap-2 peer-checked:block"
			>
				{@render root(node.children!)}
			</ul>
		{/if}
	</li>
{/snippet}
{#snippet root(nodes: MenuLink[], root = false)}
	{#each nodes as node}
		{#if node.hasOwnProperty('link')}
			{@render link(node)}
		{:else}
			{@render directory(node, root)}
		{/if}
	{/each}
{/snippet}

{#snippet groupees(groups)}
	{#each groups as menu}
		<ul class="root-directory relative w-[inherit]" data-group={`menu-${menu.name}`}>
			{@render root(menu.group, true)}
			<span class="group-label absolute">{menu.name}</span>
		</ul>
	{/each}
{/snippet}

<nav aria-label="secondary" class="flex w-[inherit] flex-col items-start gap-4">
	<h3
		class="flex w-[inherit] flex-row-reverse justify-between font-bold"
		tabindex={sidebar ? 0 : -1}
		onclick={handleMobileMenu}
		class:is-active={sidebar}
	>
		{#if !isChild && sidebar}
			<Icon ctx="x" type="stroke" />
		{:else}
			{label}
		{/if}
		<Icon ctx="folder" type="stroke" />
	</h3>

	{#if children}
		<div class="mt-8 flex flex-col">
			<ul class="root-directory w-[inherit]">
				{@render children()}
			</ul>
		</div>
	{/if}
	{#if isMobile && navmenu && navmenu.length}
		<div class="flex flex-col">
			<ul class="root-directory w-[inherit]">
				{@render root(navmenu, true)}
			</ul>
		</div>
	{/if}
	{#if graph}
		{#if graph.type !== 'grouped'}
			<ul class="root-directory w-[inherit]">
				{@render root(graph.data, true)}
			</ul>
		{:else}
			<div class="flex w-[inherit] flex-col gap-4">
				{@render groupees(graph.data)}
			</div>
		{/if}
	{/if}
</nav>

<style>
	h3 {
		flex-direction: row-reverse;
	}
	h3.is-active {
		color: var(--col-accent);
		fill: var(--col-accent);
	}
	li:not(.is-root):has(label) {
		padding: 0.25em 0;
	}

	.is-root {
		padding-top: 1em;
	}
	.is-root:not(span):not(:first-child) {
		border-top: 1px solid currentColor;
	}
	ul:not(.root-directory) {
		position: relative;
		transition: all 0.25s allow-discrete;
		border-left: 1px dashed var(--col-black-25);
		padding-left: 1.5em;
	}
	ul.root-directory {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
	.root-directory > li > .circle {
		display: none;
	}
	li.group:hover .circle {
		background-color: currentColor;
	}
	.circle {
		transition: all 0.2s;
		transition-delay: 0.325s;
		position: absolute;
		width: 0.8em;
		height: 0.8em;
		border: 0.2em solid currentColor;
		--tw-bg-opacity: 0.5;
		background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
		left: -0.4em;
		margin-top: 0.4em;
		border-radius: 50%;
		@starting-style {
			left: 0.5em;
		}
	}
	.disabled {
		pointer-events: none;
		opacity: 0.6;
	}
	.is-active {
		font-weight: bold;
		color: var(--col-accent);
		& > .circle {
			background-color: var(--col-primary);
		}
	}
	.group-label {
		left: 50%;
		transform: translate(-50%, -50%);
		top: 0;
		padding: 0 0.5em;
		border-radius: 0.375rem;
	}
	[data-group^='menu'] {
		background-color: var(--col-primary-light);
		border-radius: 0.375rem;
		padding: 1rem;
		border: 0.025em dashed var(--col-primary);
	}
	[data-group='menu-null'] {
		background-color: transparent;
		padding: 0;
		border: none;
	}
</style>
