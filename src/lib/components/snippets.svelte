<script module lang="ts">
	export type Content = {
		heading?: string;
		description?: string;
		id: string;
	};
	import { Icon } from '@archetypaltech/ayiui';
	export const snippets = { iframe };
</script>

{#snippet iframe({ id, heading, description }: Content)}
	<div class="_container relative">
		{#if heading}
			<h3 class="text-2xl">{heading}</h3>
		{/if}
		<iframe
			data-loaded={false}
			onload={(e: Event) => ((e.target as HTMLElement).dataset.loaded = 'true')}
			loading="lazy"
			class="border-1"
			title="MARKETING MEDIA"
			src={`https://drive.google.com/file/d/${id}/preview`}
		></iframe>
		{#if description}
			<p>{description}</p>
		{/if}
		<div class="spinner absolute top-0 flex h-full w-full items-center justify-center">
			<div class="w-min animate-spin">
				<Icon ctx="loader" type="stroke" size="3" />
			</div>
		</div>
	</div>
{/snippet}

<style>
	._container {
		max-width: 1200px;
		width: 100%;
		/* aspect-ratio: 16 / 9; */
	}
	._container iframe {
		width: 100%;
		height: 100%;
		border: none;
		/* aspect-ratio: 16 / 9; */
	}
	:global([data-loaded='false'] + .spinner) {
		display: flex;
	}
	:global([data-loaded='true'] + .spinner) {
		display: none;
	}
</style>
