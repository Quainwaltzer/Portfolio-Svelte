<!-- src/routes/+layout.svelte -->
<script>
    import Header from '$lib/components/Header.svelte';
</script>

<div class="app">
    <Header />
    <main class="page-content">
        <slot />
    </main>
</div>



