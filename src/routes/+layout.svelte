<!-- src/routes/+layout.svelte -->
<script>
	import Header from '$lib/Components/Header.svelte';
	import '../lib/app.css';
</script>

<div class="app">
	<Header />
	<main class="page-content">
		<slot />
	</main>
</div>

<style>
	.app {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
</style>
