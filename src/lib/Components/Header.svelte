

<div bind:this={header} class="header">
    <nav>
        <ul>
            <li><button on:click={() => {scrollTo('home')}}>Home</button></li>
            <li><button on:click={() => {scrollTo('about')}}>About</button></li>
            <li><button on:click={() => {scrollTo('projects')}}>Projects</button></li>
            <li><button on:click={() => {scrollTo('contact')}}>Contact</button></li>
        </ul>
    </nav>
</div>

<script>
    import { onMount } from 'svelte';
    import { animate, stagger, onScroll } from 'animejs';
    import { tick } from 'svelte';
    import { scrollTarget, headerObj } from '$lib/stores/scrollTarget.js';
    import { get } from 'svelte/store';
    let li;
    let header;

    $: headerObj.set(header);
    async function scrollTo(section) {
        $scrollTarget?.[section]?.scrollIntoView({ behavior: 'smooth' });
        
    }

    onMount(async () => {
        li = document.querySelectorAll('.header nav ul li');

        await tick();

         animate(li,{
            opacity: [0, 1],
            translateY: [-20, 0],
            delay: stagger(500),
            duration: 1000,
            ease: 'cubicBezier(0.175, 0.885, 0.32, 1.75)'
        });
        
        
    });
</script>
<style>
    .header{
        background-color: rgba(0, 0, 0, 1); /* semi-transparent */
  backdrop-filter: blur(0px); /* actual blur effect */
        position: fixed;
        top: 0;
        right: 50%;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        margin-top: 10px;
        border-radius: 20px;
        z-index: 100;
    }

    .header nav ul {
        display: flex;
        justify-content: space-around;
        list-style: none;
        padding: 10px 10px;
    }

    .header nav ul li {
        background-color: transparent;
        transition: background-color 0.3s ease;
        border-radius: 10px;
    }

    .header nav ul li:hover {
        background-color: #555;
        
    }
    .header nav ul li button {
       color: white;
        text-decoration: none;
        font-weight: bold;
        background: none;
        border: none;
        width: fit-content;
        padding: 15px;
    }
</style>