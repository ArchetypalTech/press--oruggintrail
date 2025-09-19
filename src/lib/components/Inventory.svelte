<script>
	import { Icon } from '@archetypaltech/ayiui';
	const items = [
		{
			icon: 'download',
			label: 'Images pack',
			href: ''
		},
		{
			icon: 'download',
			label: 'Logo pack',
			href: ''
		}
	];
</script>

<h3 class="font-bold">Inventory</h3>
<div class="mt-8 flex flex-col gap-2">
	{#each items as item}
		<a class="link flex w-fit flex-row gap-4" download href={item.href}>
			<Icon ctx={item.icon} size="1" type="stroke" />
			<span>{item.label}</span>
		</a>
	{/each}
</div>
