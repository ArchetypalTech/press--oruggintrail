<script>
	import logoUrl from '../../icons/logo.svg';
</script>

<section class="flex min-h-[80vh] flex-col items-center justify-center px-4">
	<div class="flex flex-col items-center">
		<img src={logoUrl} alt="O'RUGGIN logo" class="logo" />
	</div>
	<div class="flex flex-col items-end justify-center gap-2">
		<h1 class="font-bold">O'Ruggin Trail</h1>
		<h2 class="bg-black text-right font-bold text-white">PRESSKIT</h2>
		<em>Every Hero needs a Story</em>
	</div>
</section>

<style>
	h1,
	h2 {
		font-size: 10vw;
		line-height: 8vw;
		margin: 0;
	}
	@media (max-width: 768px) {
		.logo {
			width: 10rem;
		}
		h1,
		h2 {
			font-size: 10vh;
			line-height: 8vh;
		}
	}
	.logo {
		width: 15rem;
		height: auto;
	}
	
</style>
