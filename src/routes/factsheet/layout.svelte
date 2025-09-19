<script>
	let { data, children } = $props();
</script>

<section class="page-container p-12" class:has-nav={data?.navigator}>
	<div class="mb-12">
		<h1 class="text-primary-100 text-right text-2xl"></h1>
	</div>
	<article class="prose">
		{@render children()}
	</article>
</section>

<style>
	/* @import 'tailwindcss'; */
	.has-nav {
		@apply px-12;
		@apply py-8;
	}
	.page-container {
		background-color: red;
		article {
			transition: all 0.4s;
			opacity: 1;
			max-width: 100%;
			width: 100%;
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
