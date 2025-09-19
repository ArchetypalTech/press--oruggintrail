<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Icon } from '@archetypaltech/ayiui';
	import Inventory from '$lib/components/Inventory.svelte';
	import Menu from '$lib/components/menu.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { MediaQuery } from 'svelte/reactivity';
	import { page } from '$app/state';
	let { data, children } = $props();
	let aside = $state(false);
	let md = new MediaQuery('(min-width: 768px)');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="absolute top-0 flex w-full justify-center p-3">
	<a class="nav-link-home" href="/" aria-label="home"
		><Icon ctx="Archetypal" type="fill" size="2.5" /></a
	>
</nav>

<main class="relative w-full">
	{#if data.menu}
		<div class="cosmo md:grid">
			<aside
				class:is-active={aside}
				class:has-nav={data.navigator}
				class="menu-container bg-background-secondary top-0 self-start p-8 md:text-xs lg:p-12 lg:text-base"
			>
				<Menu
					bind:sidebar={aside}
					isMobile={!md.current}
					nav={[[], []]}
					graph={data.menu}
					path={page.url.pathname}
					page={page.url.pathname}
					><div class="flex gap-2">
						<Icon ctx="home" size="1" type="stroke" /><a href="/" aria-label="home" class="link"
							>Home</a
						>
					</div>
				</Menu>
			</aside>

			<section class="page-container px-12 py-8" class:has-nav={data?.navigator}>
				{#if page.url.pathname !== '/'}
					<div class="mb-12">
						<h1 class="text-primary-100 text-right text-2xl font-bold">{data.title}</h1>
					</div>
				{/if}
				<article class="prose">
					{@render children()}
				</article>
			</section>
			<aside class:has-nav={true} class="summary-container sticky top-0 p-12">
				<Inventory />
			</aside>
		</div>
	{:else}
		{@render children()}
	{/if}
</main>
<Footer />

<style>
	@import 'tailwindcss';
	:global(img) {
		width: 100%;
	}
	main {
		background-color: var(--background-page);
	}
	.cosmo {
		grid-template-columns: 1fr;
		@media (min-width: 768px) {
			grid-template-columns: minmax(300px, 1fr) minmax(40ch, 2fr);
		}
		@media (min-width: 1024px) {
			grid-template-columns: minmax(300px, 1fr) minmax(40ch, 2fr) minmax(200px, 0.8fr);
		}
	}
	aside {
		transition: all 0.3s;
		width: 100%;
		height: var(--layout-nav-height);
		overflow: hidden;
		&.is-active {
			position: fixed;
			height: 100dvh;
			overflow-y: scroll;
			backdrop-filter: blur(2em);
			z-index: 10;
		}
		&.summary-container {
			display: none;
			@media (min-width: 1024px) {
				display: flex;
				flex-direction: column;
				/* justify-content: start; */
				/* align-items: start; */
				height: 100dvh;
				position: sticky;
				overflow-y: scroll;
				&.has-nav {
					height: calc(100dvh - var(--layout-nav-height));
				}
			}
			&.has-nav {
				@apply px-12;
				@apply py-8;
			}
		}
		&.menu-container {
			@media (min-width: 768px) {
				display: grid;
				height: 100dvh;
				position: sticky;
				overflow-y: scroll;
				&.has-nav {
					height: calc(100dvh - var(--layout-nav-height));
				}
			}
			&.has-nav {
				@apply px-12;
				@apply py-8;
				@apply md:py-8;
			}
		}
	}
	.page-container {
		article {
			transition: all 0.4s;
			opacity: 1;
			width: 100%;
			max-width: 100%;
			margin: 0 auto;
			@starting-style {
				opacity: 0;
			}
		}
		h1 {
			transition: all 0.4s;
			transform: translateX(0);
			opacity: 1;

			@starting-style {
				opacity: 0;
				transform: translateX(2em);
			}
		}
	}
</style>
