<div class="container">
  <section bind:this={home} class="main">
    <div class="info">
      <h3 bind:this={heading1}>Hello, I'm</h3>
      <h1 bind:this={heading2}>Rovie Endigado</h1>
      <h2 bind:this={heading3}>Web Developer</h2>
      <p bind:this={heading4}>Welcome to my portfolio! Here you can find my projects and learn more about me</p>
    </div>
  </section>

 <section bind:this={about} class="about">
    <div class="intro"></div>
  </section>

  <section bind:this={projects} class="projects">
    <div class="intro"></div>
  </section>

  <section bind:this={contact} class="contact">
    <div class="intro"></div>
  </section>
</div>

<script>
  import { onMount } from 'svelte';
  import { scrollTarget } from '$lib/stores/scrollTarget.js';
  import { tick } from 'svelte';
  import { animate, text, stagger } from 'animejs';
  let home;
  let about;
  let projects;
  let contact;
  let heading1, heading2, heading3, heading4;
 
  onMount(async () => {
    await tick(); // ensures DOM is updated
    scrollTarget.set({ home, about, projects, contact });

        const elements = [heading1, heading2, heading3, heading4];

      const allWords = elements.flatMap(el => text.split(el, {
        words: { wrap: 'hidden' }
      }).words);
      animate(allWords, {
      y: [
        { to: ['100%', '0%'] }
      ],
      duration: 750,
      ease: 'out(3)',
      delay: stagger(100),
      loop: false
    });
  });
</script>

<style>
  .container{
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center;
  }
  .main, .about, .projects, .contact {
    width: 100%;
    height: 100dvh;
    padding: 5%;
  }

  .main{
    background: linear-gradient(to right, #ff7e5f, #feb47b);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-family: 'Inter', sans-serif;
  }

  .about{
    background: linear-gradient(to right, #6a11cb, #2575fc);
  }

  .projects{
    background: linear-gradient(to right, #00c6ff, #0072ff);
  }

  .contact{
    background: linear-gradient(to right, #ff416c, #ff4b2b);
  }

  .info h1{
    font-size: 3rem;
  }
</style>