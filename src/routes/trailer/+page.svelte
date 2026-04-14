<script lang="ts">
	import { type Content, snippets } from '$lib/components/snippets.svelte';
	const media: Content[] = [
		{ id: '1cn3s5SgAvqPk17I1Y3lrcCbHaAUJ31A1', heading: 'ORuggin Trail Trailer' },
		{ id: '1dr6scflI3tWOCqbRp6j0tM5ks-L8IMcs', heading: 'ORuggin Trail Walkthrough' },
		{ id: '1A_D8UEAjTBM6Xssoa8ONTN9ytqvpAnqo', heading: 'ORuggin Trail Showcase' }
	];
	// { heading: '', description: '', id: '1W_ZyJPR1uU_c30gzGCFI0WCOT757GW_N' }
</script>

<section class="my-24 flex min-h-screen flex-col items-center gap-24">
	{#each media as nfo}
		{@render snippets.iframe(nfo)}
	{/each}
</section>