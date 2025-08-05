<script>
	import { animate, stagger, createTimeline } from 'animejs';
	import { onMount } from 'svelte';

	onMount(async () => {
		animate('.bars li', {
			keyframes: [
				{ translateY: 0, opacity: 1 },
				{ translateY: -20, opacity: 0.7 },
				{ translateY: 0, opacity: 1 }
			],
			duration: 1000,
			easing: 'easeInOutSine',
			delay: stagger(100),
			loop: true
		});
	});
</script>

<div class="loading">
	<ul class="bars">
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
	</ul>

	<h1>Hello</h1>
</div>

<style>
	.loading {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.loading h1 {
		font-family: 'Outfit', sans-serif;
		font-size: clamp(7rem, 10vw, 10rem);
	}

	.bars {
		display: flex;
		gap: 20px;
	}
	li {
		display: block;
		height: 5vh;
		width: 5vh;
        border-radius: 50%;
		background: violet;
	}
</style>
