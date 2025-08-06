<script>
	import { onMount } from 'svelte';
	import { scrollTarget, headerObj } from '$lib/stores/scrollTarget.js';
	import { tick } from 'svelte';
	import { animate, text, stagger, createTimeline, onScroll, svg, engine } from 'animejs';
	import Header from '$lib/Components/Header.svelte';
	import { goto } from '$app/navigation';
	import { Lightbox } from 'svelte-lightbox';
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
	import AutoScroll from 'embla-carousel-auto-scroll';
	import Zoom from 'svelte-medium-image-zoom';
	import 'svelte-medium-image-zoom/dist/styles.css';
	let home;
	let about;
	let projects;
	let certifications;
	let contact;
	let heading1, heading2, heading3, heading4;
	let lightboxProgrammaticController;
	let schoolparagraph;
	let workparagraph;
	let esportsparagraph;
	let name = '';
	let email = '';
	let queries = '';
	let send = '';
	let isFormValid;
	let nameInput;
	let emailInput;
	let messageArea;
	let alertingS;
	let sendButton;

	const images = [
		'/img/champion.jpg',
		'/img/bois.jpg',
		'/img/cen.jpg',
		'/img/global.jpg',
		'/img/both.jpg',
		'/img/lancelot.jpg'
	];

	let options = { loop: true };
	let plugins = [AutoScroll({ stopOnInteraction: false, stopOnFocusIn: false, startDelay: 0 })];

	engine.defaults.frameRate = 120;

	function gotoAbout() {
		$scrollTarget.about.scrollIntoView({ behavior: 'smooth' });
	}
	function buoyLink() {
		window.location.href = 'https://buoy.theturingmachines.asia/';
	}

	function typerushLink() {
		window.location.href =
			'https://github.com/Quainwaltzer/TypeRush-Arena/releases/tag/v0.1.0-alpha';
	}

	function foliumLink() {
		window.location.href =
			'https://quainwaltzer.github.io/CPE-Electives-Data-Analytics-/map/Endigado-CPE13-Electives-Folium-Map.html';
	}

	function githubLink() {
		window.location.href = 'https://github.com/Quainwaltzer';
	}

	function linkedinLink() {
		window.location.href = 'https://www.linkedin.com/in/rovieendigado/';
	}

	function hackerrankLink() {
		window.location.href = 'https://www.hackerrank.com/profile/quainwaltzer';
	}

	async function sendEmail() {
		const res = await fetch('/api/send-email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				email,
				message: queries
			})
		});

		const data = await res.json();

		if (res.ok) {
			nameInput.value = '';
			emailInput.value = '';
			messageArea.value = '';

			showAlert('Email sent successfully!');
		} else {
			showAlert('Failed to send email: ' + data.message);
		}
	}

	function runMobileAnimations() {
		animateProjectBlock({
			leftSelector: '.buoy .left',
			rightSelector: '.buoy .right',
			targetSelector: '.buoy .left'
		});

		animateProjectBlock({
			leftSelector: '.tra .left',
			rightSelector: '.tra .right',
			targetSelector: '.tra .left'
		});

		animateProjectBlock({
			leftSelector: '.map .left',
			rightSelector: '.map .right',
			targetSelector: '.map .left'
		});

		animate($headerObj, {
			width: '100%',
			marginTop: '0px',
			borderRadius: '0px',
			background: 'rgba(255, 255, 255, 0.1)',
			backdropFilter: 'blur(10px)',
			ease: 'easeInOutExpo',
			autoplay: onScroll({
				target: '.about',
				enter: 'bottom top+=200',
				leave: 'bottom top+=300',
				sync: 0.5,
				debug: false
			})
		});
	}

	function animateProjectBlock({ leftSelector, rightSelector, targetSelector }) {
		const target = document.querySelector(targetSelector);
		if (!target) return;

		animate(leftSelector, {
			translateX: [-200, 0],
			translateY: [100, 0],
			duration: 1000,
			ease: 'cubicBezier(0.68, 0.32, 0.37, 0.98)',
			autoplay: onScroll({
				target,
				enter: 'bottom top',
				leave: 'bottom bottom',
				sync: 0.25,
				debug: false
			})
		});

		animate(rightSelector, {
			translateX: [200, 0],
			translateY: [100, 0],
			duration: 1000,
			ease: 'cubicBezier(0.68, 0.32, 0.37, 0.98)',
			autoplay: onScroll({
				target,
				enter: 'bottom-=0 top',
				leave: 'top+=700 bottom',
				sync: 0.25,
				debug: false
			})
		});

		animate(`${rightSelector} > *`, {
			translateY: [20, 0],
			opacity: [0, 1],
			duration: 1000,
			delay: stagger(300),
			ease: 'cubicBezier(0.68, 0.32, 0.37, 0.98)',
			autoplay: onScroll({
				target,
				enter: 'center top-=100',
				leave: 'center top-=50',
				sync: 0.3,
				debug: false
			})
		});
	}

	onMount(() => {
		const mq = window.matchMedia('(max-width: 767px)');

		// Initial check
		if (mq.matches) {
			runMobileAnimations();
		}

		// Watch for changes
		const listener = (e) => {
			if (e.matches) {
				runMobileAnimations();
			}
		};

		mq.addEventListener('change', listener);

		return () => mq.removeEventListener('change', listener);
	});

	$: if (alertingS) console.log('alertingS is ready!');

	$: {
		isFormValid = name.trim() !== '' && email.trim() !== '' && queries.trim() !== '';
		if (name.trim() !== '' && nameInput) {
			nameInput.style.boxShadow =
				'inset 1px 1px 4px 2px rgba(0,0,0,0.7), inset -2px -2px 3px -2px rgba(255,255,255,0.5)';
		} else if ((name == null || name == undefined || name.trim() === '') && nameInput) {
			nameInput.style.boxShadow = 'inset 0 0 4px red';
		}

		if (email.trim() !== '' && emailInput) {
			emailInput.style.boxShadow =
				'inset 1px 1px 4px 2px rgba(0,0,0,0.7), inset -2px -2px 3px -2px rgba(255,255,255,0.5)';
		} else if ((email == null || email == undefined || email.trim() === '') && emailInput) {
			emailInput.style.boxShadow = 'inset 0 0 4px red';
		}

		if (queries.trim() !== '' && messageArea) {
			messageArea.style.boxShadow =
				'inset 1px 1px 4px 2px rgba(0,0,0,0.7), inset -2px -2px 3px -2px rgba(255,255,255,0.5)';
		} else if ((queries == null || queries == undefined || queries.trim() === '') && messageArea) {
			messageArea.style.boxShadow = 'inset 0 0 4px red';
		}
	}

	async function showAlert(message) {
		await tick(); // ensures DOM is updated
		console.log('The method is called');

		alertingS.textContent = message;
		alertingS.style.opacity = '1';
		setTimeout(() => {
			alertingS.style.opacity = '0';
		}, 3000);
	}

	onMount(async () => {
		await tick(); // ensures DOM is updated

		scrollTarget.set({ home, about, projects, certifications, contact });
		await tick();

		const elements = [heading1, heading2, heading3, heading4];

		const allWords = elements.flatMap((el) => text.split(el, { words: { wrap: 'hidden' } }).words);

		animate(allWords, {
			y: [{ to: ['100%', '0%'] }],
			duration: 750,
			ease: 'cubicBezier(0.37, -0.09, 0.09, 0.84)',
			delay: stagger(200),
			loop: false
		});

		await tick();

		const layers = document.querySelectorAll('.layer');
		const tl = createTimeline({
			loop: true,
			ease: 'cubicBezier(0.175, 0.885, 0.32, 1.75)',
			defaults: {
				duration: 500
			}
		});

		layers.forEach((layer, i) => {
			const label = `wave${i}`;
			const delay = i * 200;

			tl.label(label, delay)
				.add(
					layer,
					{
						translateY: -20,
						translateX: 30
					},
					label
				)
				.add(
					layer,
					{
						translateY: 0,
						translateX: 0
					},
					`<+=0`
				);
		});

		await tick();

		animate('.image-position', {
			keyframes: {
				'0%': { x: 500, rotate: 0 },
				'50%': { x: -100, rotate: -15 },
				'100%': { x: 0, rotate: 0 }
			},
			duration: 2000,
			ease: 'cubicBezier(0.21, 0.75, 0.53, 1.4)',
			playbackEase: 'ouIn(3)',
			complete: () => {
				animate('.image-container img', {
					translateY: [30, 0],
					opacity: [0, 1],
					duration: 1200,
					delay: 2000,
					ease: 'cubicBezier(0.21, 0.75, 0.53, 1)'
				});
			}
		});

		await tick();

		animate('.socmed-list li', {
			translateX: [100, 0],
			duration: 1000,
			delay: stagger(200, { start: 600 }),
			ease: 'cubicBezier(0.21, 0.75, 0.53, 1)'
		});

		await tick();

		animateExamples({
			examples: '.about-examp',
			targets: '.about-examp',
			underline: '.about-bef'
		});

		animateExamples({
			examples: '.project-examp',
			targets: '.project-examp',
			underline: '.project-bef'
		});

		function animateExamples({ examples, targets, underline }) {
			animate(examples, {
				translateX: [-200, 0],
				opacity: [0, 1],
				duration: 1000,
				ease: 'inOut',
				autoplay: onScroll({
					target: targets,
					enter: 'center+=350 top',
					leave: 'center+=310 bottom',
					sync: 0.25,
					debug: false
				})
			});

			animate(underline, {
				width: '100%',
				duration: 2000,
				ease: 'inOut',
				autoplay: onScroll({
					target: targets,
					enter: 'center+=350 top',
					leave: 'center+=310 bottom',
					sync: 0.1,
					debug: false
				})
			});
		}

		await tick();

		const { words } = text.split(schoolparagraph, {
			words: { wrap: 'clip' }
		});

		await tick();

		animate(words, {
			y: [{ to: ['-100%', '0%'] }],
			duration: 750,
			ease: 'inOut',
			delay: stagger(50),
			autoplay: onScroll({
				target: '.school-info > p',
				enter: 'bottom top+=20',
				leave: 'top center+=20',
				sync: 'play play',
				debug: false
			})
		});

		const split = text.split(workparagraph, {
			words: { wrap: 'clip' }
		});

		const wordElements = split.words;

		animate(wordElements, {
			y: [{ to: ['-100%', '0%'] }],
			duration: 750,
			ease: 'inOut',
			delay: stagger(50),
			autoplay: onScroll({
				target: '.intern-info > p',
				enter: 'bottom top+=20',
				leave: 'top center+=20',
				sync: 'play play',
				debug: false
			})
		});

		const splitEsports = text.split(esportsparagraph, {
			words: { wrap: 'clip' }
		});

		const esportsElements = splitEsports.words;

		animate(esportsElements, {
			y: [{ to: ['-100%', '0%'] }],
			duration: 750,
			ease: 'inOut',
			delay: stagger(50),
			autoplay: onScroll({
				target: '.intern-info > p',
				enter: 'bottom top+=20',
				leave: 'top center+=20',
				sync: 'play play',
				debug: false
			})
		});

		animate('.logo1', {
			translateY: [-50, 0],
			opacity: [0, 1],
			duration: 1000,
			ease: 'cubicBezier(0.21, 0.75, 0.53, 1)',
			autoplay: onScroll({
				enter: 'center+=200 top',
				leave: 'center+=100 bottom',
				sync: 0.5,
				debug: false
			})
		});

		animate('.logo2', {
			translateY: [50, 0],
			opacity: [0, 1],
			duration: 1000,
			ease: 'cubicBezier(0.21, 0.75, 0.53, 1)',
			autoplay: onScroll({
				enter: 'center+=200 top',
				leave: 'center+=100 bottom',
				sync: 0.5,
				debug: false
			})
		});

		animate('.imaging-1', {
			translateY: [50, 0],
			scale: [1, 1.15, 1],
			opacity: [0, 1],
			rotate: '-2deg',
			duration: 2000,
			ease: 'cubicBezier(0.21, 0.75, 0.53, 1)',
			playbackEase: 'ouIn(3)',
			autoplay: onScroll({
				target: '.images',
				enter: 'bottom-=100 top',
				leave: 'bottom-=200 center',
				sync: 0.5,
				debug: false
			})
		});

		animate('.imaging-2', {
			translateY: [50, 0],
			scale: [1, 1.15, 1],
			opacity: [0, 1],
			rotate: '2deg',
			duration: 2000,
			delay: 1000,
			ease: 'cubicBezier(0.21, 0.75, 0.53, 1)',
			playbackEase: 'ouIn(3)',
			autoplay: onScroll({
				target: '.images',
				enter: 'bottom-=100 top',
				leave: 'bottom-=200 center',
				sync: 0.5,
				debug: false
			})
		});

		animateProjectBlock({
			leftSelector: '.buoy .left',
			rightSelector: '.buoy .right',
			targetSelector: '.buoy'
		});

		animateProjectBlock({
			leftSelector: '.tra .left',
			rightSelector: '.tra .right',
			targetSelector: '.tra'
		});

		animateProjectBlock({
			leftSelector: '.map .left',
			rightSelector: '.map .right',
			targetSelector: '.map'
		});

		function animateProjectBlock({ leftSelector, rightSelector, targetSelector }) {
			const target = document.querySelector(targetSelector);
			if (!target) return;

			animate(leftSelector, {
				translateX: [-200, 0],
				translateY: [100, 0],
				duration: 1000,
				ease: 'cubicBezier(0.68, 0.32, 0.37, 0.98)',
				autoplay: onScroll({
					target,
					enter: 'bottom-=0 top',
					leave: 'top+=700 bottom',
					sync: 0.25,
					debug: false
				})
			});

			animate(rightSelector, {
				translateX: [200, 0],
				translateY: [100, 0],
				duration: 1000,
				ease: 'cubicBezier(0.68, 0.32, 0.37, 0.98)',
				autoplay: onScroll({
					target,
					enter: 'bottom-=0 top',
					leave: 'top+=700 bottom',
					sync: 0.25,
					debug: false
				})
			});

			animate(`${rightSelector} > *`, {
				translateY: [20, 0],
				opacity: [0, 1],
				duration: 1000,
				delay: stagger(300),
				ease: 'cubicBezier(0.68, 0.32, 0.37, 0.98)',
				autoplay: onScroll({
					target,
					enter: 'center top-=100',
					leave: 'center top-=50',
					sync: 0.3,
					debug: false
				})
			});
		}

		await tick();

		animate($headerObj, {
			width: '100%',
			marginTop: '0px',
			borderRadius: '0px',
			background: 'rgba(255, 255, 255, 0.1)',
			backdropFilter: 'blur(10px)',
			ease: 'easeInOutExpo',
			autoplay: onScroll({
				target: '.about',
				enter: 'bottom top+=200',
				leave: 'bottom top+=300',
				sync: 0.5,
				debug: false,
				onEnterForward: () => {
					const labels = ['Home', 'About', 'Projects', 'Certifications', 'Contacts'];
					const icons = ['fa-home', 'fa-question', 'fa-cog', 'fa-file', 'fa-phone'];
					const buttons = $headerObj.querySelectorAll('li button');
					const forAspect = $headerObj.querySelectorAll('.header nav ul li');

					buttons.forEach((btn, i) => {
						btn.classList.remove('fa', icons[i]);
						btn.textContent = labels[i];
						btn.style.width = 'fit-content';
					});

					forAspect.forEach((w) => {
						w.style.aspectRatio = 'auto';
						w.style.borderRadius = '0 15px 0 15px';
					});
				},
				onLeaveBackward: () => {
					const labels = ['Home', 'About', 'Projects', 'Certifications', 'Contacts'];
					const icons = ['fa-home', 'fa-question', 'fa-cog', 'fa-file', 'fa-phone'];
					const buttons = $headerObj.querySelectorAll('li button');

					buttons.forEach((btn, i) => {
						btn.classList.add('fa', icons[i]);
						btn.textContent = '';
						btn.style.width = '35px';
					});
				}
			})
		});

		await tick();

		animateSectionHead({
			sectionhead: '.project-header',
			lines: '.project-line'
		});

		animateSectionHead({
			sectionhead: '.certi-header',
			lines: '.certi-line'
		});

		animateSectionHead({
			sectionhead: '.contact-header',
			lines: '.contact-line'
		});

		function animateSectionHead({ sectionhead, lines }) {
			animate(lines, {
				width: '100%',
				duration: 1000,
				ease: 'inExpo',
				autoplay: onScroll({
					target: lines,
					enter: 'bottom top',
					leave: 'bottom-=100 bottom',
					sync: 0.25,
					debug: false
				})
			});

			animate(sectionhead, {
				translateY: [100, 0],
				duration: 1000,
				opacity: [0, 1],
				autoplay: onScroll({
					target: sectionhead,
					enter: 'bottom top',
					leave: 'bottom-=100 bottom',
					sync: 0.25,
					debug: false
				})
			});
		}

		await tick();

		animateCertiImages({
			main: '.sololearn-images img:nth-child(2)',
			left: '.sololearn-images img:nth-child(1)',
			right: '.sololearn-images img:nth-child(3)',
			targets: '.sololearn .provider-container'
		});

		animateCertiImages({
			main: '.hackerrank-images img:nth-child(2)',
			left: '.hackerrank-images img:nth-child(1)',
			right: '.hackerrank-images img:nth-child(3)',
			targets: '.hackerrank .provider-container'
		});

		animateCertiImages({
			main: '.cc-images img:nth-child(2)',
			left: '.cc-images img:nth-child(1)',
			right: '.cc-images img:nth-child(3)',
			targets: '.cc .provider-container'
		});

		function animateCertiImages({ main, left, right, targets }) {
			let hasAnimated = false;
			let hasAnimatedMain = false;

			if (hasAnimatedMain) return;
			animate(main, {
				translateY: [100, 0],
				opacity: [0, 1],
				duration: 500,
				ease: 'in',
				autoplay: onScroll({
					target: targets,
					enter: 'bottom top-=50',
					leave: 'bottom top+=100',
					sync: 'play',
					debug: false,
					onEnterForward: () => {
						if (hasAnimated) return;
						hasAnimated = true;
						hasAnimatedMain = true;
						animate([left, right], {
							opacity: [0, 1],
							scale: [0.55, 0.9],
							duration: 1500,
							delay: 1000,
							ease: 'cubicBezier(0.58, 0.15, 0.15, 1)'
						});
					}
				})
			});
		}
	});
</script>

<div class="container">
	<section bind:this={home} class="main">
		<div class="info-container">
			<div class="info">
				<h3 bind:this={heading1}>Hello, I'm</h3>
				<h1 bind:this={heading2}>Rovie Endigado</h1>
				<h2 bind:this={heading3}>Student Software Developer</h2>
				<p bind:this={heading4}>
					Welcome to my portfolio! Here you can find my projects and learn more about me
				</p>
			</div>

			<div class="image-position">
				<div class="image-container">
					<img src="/img/profile.jpg" alt="" />
				</div>
			</div>
		</div>

		<svg viewBox="0 0 884 551" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g class="layer" filter="url(#filter0_d_1_154)">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M841.775 364.827C842.603 374.987 832.678 385.246 812 393L556 489C516.236 503.911 451.764 503.911 412 489L156 393C136.913 385.842 126.988 376.55 126.224 367.172V417.172C126.988 426.55 136.913 435.842 156 443L412 539C451.764 553.911 516.236 553.911 556 539L812 443C832.678 435.246 842.603 424.987 841.775 414.827V364.827Z"
					fill="#FF0000"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M126.225 367.172C125.397 357.013 135.323 346.754 156 339L412 243C451.765 228.088 516.235 228.088 556 243L812 339C831.087 346.158 841.012 355.45 841.776 364.827V414.827C841.012 405.45 831.087 396.158 812 389L556 293C516.235 278.088 451.765 278.088 412 293L156 389C135.323 396.754 125.397 407.013 126.225 417.172V367.172Z"
					fill="#FF0000"
				/>
				<g filter="url(#filter1_d_1_154)">
					<path
						d="M412 243C451.764 228.088 516.236 228.088 556 243L812 339C851.764 353.912 851.764 378.088 812 393L556 489C516.235 503.912 451.765 503.912 412 489L156 393C116.236 378.088 116.236 353.912 156 339L412 243Z"
						fill="#FF0000"
					/>
				</g>
			</g>
			<g class="layer" filter="url(#filter2_d_1_154)">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M799.775 256.827C800.603 266.987 790.678 277.246 770 285L514 381C474.236 395.911 409.764 395.911 370 381L114 285C94.913 277.842 84.9879 268.55 84.2245 259.172V309.172C84.9879 318.55 94.913 327.842 114 335L370 431C409.764 445.911 474.236 445.911 514 431L770 335C790.678 327.246 800.603 316.987 799.775 306.827V256.827Z"
					fill="#FF6600"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M84.2245 259.172C83.3975 249.013 93.3227 238.754 114 231L370 135C409.765 120.088 474.235 120.088 514 135L770 231C789.087 238.158 799.012 247.45 799.776 256.827V306.827C799.012 297.45 789.087 288.158 770 281L514 185C474.235 170.088 409.765 170.088 370 185L114 281C93.3227 288.754 83.3975 299.013 84.2245 309.172V259.172Z"
					fill="#FF6600"
				/>
				<g filter="url(#filter3_d_1_154)">
					<path
						d="M370 135C409.764 120.088 474.236 120.088 514 135L770 231C809.764 245.912 809.764 270.088 770 285L514 381C474.235 395.912 409.765 395.912 370 381L114 285C74.2355 270.088 74.2355 245.912 114 231L370 135Z"
						fill="#FF6600"
					/>
				</g>
			</g>
			<g class="layer" filter="url(#filter4_d_1_154)">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M757.775 148.827C758.603 158.987 748.678 169.246 728 177L472 273C432.236 287.911 367.764 287.911 328 273L72 177C52.913 169.842 42.9879 160.55 42.2245 151.172V201.172C42.9879 210.55 52.913 219.842 72 227L328 323C367.764 337.911 432.236 337.911 472 323L728 227C748.678 219.246 758.603 208.987 757.775 198.827V148.827Z"
					fill="#6580E1"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M42.2245 151.172C41.3975 141.013 51.3227 130.754 72 123L328 27C367.765 12.0883 432.235 12.0883 472 27L728 123C747.087 130.158 757.012 139.45 757.776 148.827V198.827C757.012 189.45 747.087 180.158 728 173L472 77C432.235 62.0883 367.765 62.0883 328 77L72 173C51.3227 180.754 41.3975 191.013 42.2245 201.172V151.172Z"
					fill="#6580E1"
				/>
				<g filter="url(#filter5_d_1_154)">
					<path
						d="M328 27C367.764 12.0883 432.236 12.0883 472 27L728 123C767.764 137.912 767.764 162.088 728 177L472 273C432.235 287.912 367.765 287.912 328 273L72 177C32.2355 162.088 32.2355 137.912 72 123L328 27Z"
						fill="#6580E1"
					/>
				</g>
			</g>
			<defs>
				<filter
					id="filter0_d_1_154"
					x="126.177"
					y="231.816"
					width="715.647"
					height="318.367"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_154" />
					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_154" result="shape" />
				</filter>
				<filter
					id="filter1_d_1_154"
					x="122.177"
					y="231.816"
					width="723.647"
					height="276.367"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_154" />
					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_154" result="shape" />
				</filter>
				<filter
					id="filter2_d_1_154"
					x="84.1767"
					y="123.816"
					width="715.647"
					height="318.367"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_154" />
					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_154" result="shape" />
				</filter>
				<filter
					id="filter3_d_1_154"
					x="80.1767"
					y="123.816"
					width="723.647"
					height="276.367"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_154" />
					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_154" result="shape" />
				</filter>
				<filter
					id="filter4_d_1_154"
					x="42.1767"
					y="15.8162"
					width="715.647"
					height="318.367"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_154" />
					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_154" result="shape" />
				</filter>
				<filter
					id="filter5_d_1_154"
					x="38.1767"
					y="15.8162"
					width="723.647"
					height="276.367"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_154" />
					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_154" result="shape" />
				</filter>
			</defs>
		</svg>

		<div class="social-container">
			<ul class="socmed-list">
				<li on:click={githubLink}><i class="fab fa-github"></i></li>
				<li on:click={linkedinLink}><i class="fab fa-linkedin"></i></li>
				<li on:click={hackerrankLink}><i class="fab fa-hackerrank"></i></li>
			</ul>
		</div>

		<div class="more">
			<button on:click={gotoAbout} class="goto-about"
				>GO TO ABOUT <span><i class="fas fa-arrow-down" style="color: #fffff0;"></i></span></button
			>
		</div>
	</section>

	<section bind:this={about} class="about">
		<h1 class="example about-examp"><span class="before about-bef"></span>ABOUT ME</h1>
		<div class="about-container">
			<h1 style="text-align: center;">School</h1>
			<div class="school-info">
				<p bind:this={schoolparagraph}>
					Hi! I'm Rovie Endigado, a passionate third-year Computer Engineering student at Southern
					Luzon State University (SLSU). I’m currently focused on expanding my skills in Software
					Engineering, Web Development, Data Science, Data Analytics, and UI/UX Design. With a
					strong foundation in both hardware and software, I enjoy building user-centered digital
					experiences and working with data to create meaningful insights. Whether it's designing
					clean interfaces or writing efficient code, I'm driven by curiosity and a love for
					problem-solving.
				</p>

				<hr />

				<div class="logos">
					<img src="/img/slsu-logo.png" alt="" class="school-logo logo1" />
					<img src="/img/slsu-cen.png" alt="" class="school-logo logo2" />
				</div>
			</div>

			<h1 style="text-align: center;">Work Experience</h1>
			<div class="intern-info">
				<div class="images">
					<Zoom>
						<img src="/img/open-it-chatbot.jpeg" alt="" class="imaging-1" />
					</Zoom>

					<Zoom>
						<img src="/img/open-it-visit.jpg" alt="" class="imaging-2" />
					</Zoom>
				</div>

				<hr style="margin-left: 10px;" class="second-hr" />

				<p bind:this={workparagraph}>
					I worked as a Hybrid Data Science and Software Development Intern at Open IT, where I
					contribute across the stack—supporting both data analysis and application development. On
					the data science side, I assist in reviewing and verifying Python scripts used for
					statistical computations, ensuring the accuracy and reliability of results. On the
					software side, I’m actively involved in developing a chatbot system using <strong
						>C#, Blazor, and ASP.NET Core</strong
					>, where I handle both the front-end UI and backend logic, along with managing SQL-based
					database operations. I also integrate Azure OpenAI for advanced function calling,
					connecting CLI-based Python tools with C#, and enhancing the chatbot's intelligence with
					AI-generated outputs. This role allows me to blend cloud services, AI integration, and
					full-stack development in a real-world setting.
				</p>
			</div>

			<h1 style="text-align: center;">Esports Life!!!</h1>
			<div class="esports-info">
				<div class="embla" use:emblaCarouselSvelte={{ options, plugins }}>
					<div class="embla__container">
						{#each images as img}
							<div class="embla__slide">
								<Zoom>
									<img src={img} alt="Esports Images" />
								</Zoom>
							</div>
						{/each}
					</div>
				</div>

				<hr style="height: 3px; width: 50%; margin: 10px auto;" />

				<p bind:this={esportsparagraph}>
					Outside the world of code and circuits, I’ve also thrived in the competitive esports
					scene. As a varsity Mobile Legends player for SLSU, I had the incredible opportunity to
					represent our university in the Philippine Collegiate Championship, where our team fought
					hard and proudly secured Top 3 in Luzon and placed among the Top 16 nationwide. I played
					the role of Jungler, leading strategic plays and adapting on the fly in high-pressure
					matches. I also helped bring home the gold for the College of Engineering in the
					Inter-Collegiate & Campuses Athletics Competition (ICCAC), where we claimed the
					championship title. These experiences sharpened my decision-making, strategic thinking,
					and communication under pressure—skills I proudly carry into every project and team I work
					with.
					<br /><br />
					I also climbed the Mobile Legends national and global leaderboards, peaking as
					<strong>Top 2 Gusion (PH)</strong>
					and <strong>Top 23 Gusion (Global)</strong>, along with
					<strong>Top 24 Lancelot (PH)</strong>, Top 9 Ling (PH),
					<strong>Top 10 Kimmy (PH)</strong>, and <strong>Top 48 Fredrinn (PH)</strong>. Competing
					at this level taught me focus, consistency, and how to stay calm under pressure—all
					valuable traits in both esports and engineering.
				</p>
			</div>
		</div>
	</section>

	<section bind:this={projects} class="projects">
		<div class="project-title section-title-container">
			<h1 class="project-header section-head">PROJECTS</h1>
			<div class="project-line liners"></div>
		</div>

		<div class="buoy project-holder">
			<img
				class="left"
				on:click={buoyLink}
				src="/img/buoy-snapshot.jpeg"
				alt="Buoy Snapshot"
				style="width: 40%; height: auto;"
			/>

			<div class="right project-info">
				<h1>Buoy</h1>
				<h5>A Project by SLSU Turing Machines (BSCpE III - GF)</h5>
				<p>
					Buoy is a mobile phishing detection app designed to identify and flag suspicious links
					using a machine learning-powered backend. Built with FlutterFlow for rapid UI development
					and integrated with a custom ML model via API, Buoy analyzes URLs in real time to protect
					users from phishing threats. The app was submitted by OTIs Philippines to AppCon 2024,
					where it earned a spot in the Top 100 projects nationwide.
				</p>
			</div>
		</div>

		<div class="tra project-holder">
			<img
				class="left"
				on:click={typerushLink}
				src="/img/title.png"
				alt="TypeRush Snapshot"
				style="width: 40%; height: auto;"
			/>

			<div class="right project-info">
				<h1>TypeRush Arena</h1>
				<h5>A Mobile Development (Android Studio) Project.</h5>
				<p>
					TypeRush Arena is a mobile development project built in Android Studio that delivers a
					fast-paced, skill-based typing experience on mobile devices. The game features three
					distinct modes: Time Attack, where players must complete three full sentences within 30
					seconds; Racing Mode, which pits players against AI or other users in a race to type the
					fastest; and Combat Mode, a competitive battle where players deal and receive damage
					through typing accuracy and speed — with the first to reach 0 HP losing. TypeRush Arena
					challenges reflexes, speed, and precision in an engaging and competitive environment.
				</p>
			</div>
		</div>

		<div class="map project-holder">
			<img
				class="left"
				on:click={foliumLink}
				src="/img/map-snapshot.jpeg"
				alt="TypeRush Snapshot"
				style="width: 40%; height: auto;"
			/>

			<div class="right project-info">
				<h1>Regional Analysis of Internet Connectivity, Literacy Rates, and Teenage Pregnancy</h1>
				<h5>A Python Data Visualization School Project</h5>
				<p>
					This project explores the relationship between internet connectivity, literacy rates, and
					teenage pregnancy across various regions in the Philippines. Using publicly available
					datasets, we performed exploratory data analysis (EDA) and built interactive
					geo-visualizations to uncover regional patterns and correlations. The analysis aimed to
					determine whether low internet access and literacy levels are associated with higher rates
					of teenage pregnancy. The project utilized a range of Python-based visualization tools
					including GeoPandas and Folium for mapping, as well as Matplotlib and Seaborn for
					statistical plotting. Results were presented through interactive maps and dashboards to
					enhance interpretability for both technical and non-technical audiences. This project
					highlights the power of data science in addressing social issues through meaningful
					insights and visual storytelling.
				</p>
			</div>
		</div>
	</section>

	<section bind:this={certifications} class="certifications">
		<div class="certi-title section-title-container">
			<div class="certi-line liners"></div>
			<h1 class="certi-header section-head">CERTIFICATIONS</h1>
			<div class="certi-line liners"></div>
		</div>

		<div class="certi-list">
			<div class="sololearn certi-container">
				<div class="provider-container">
					<img src="/img/sololearn.png" />
					<h1>Sololearn</h1>
					<div class="certi-line liners"></div>
				</div>

				<div class="sololearn-images certi-images">
					<img src="/img/solo-cs.jpg" alt="" />
					<img src="/img/solo-cpp.jpg" alt="" />
					<img src="/img/solo-java.jpg" alt="" />
				</div>

				<ul class="sololearn-list certi-list">
					<li>
						<p>C# Intermediate</p>
						<button
							on:click={(window.location.href =
								'https://www.sololearn.com/en/certificates/CC-IIYNEHMI')}>View Here &gt;</button
						>
					</li>
					<li>
						<p>C++ Intermediate</p>
						<button
							on:click={(window.location.href =
								'https://www.sololearn.com/en/certificates/CC-AKCAHQKF')}>View Here &gt;</button
						>
					</li>
					<li>
						<p>Introduction to Java</p>
						<button
							on:click={(window.location.href =
								'https://www.sololearn.com/en/certificates/CC-G9GEHZ0D')}>View Here &gt;</button
						>
					</li>
					<li>
						<p>Coding Foundations</p>
						<button
							on:click={(window.location.href =
								'https://www.sololearn.com/en/certificates/CC-5B5YELNB')}>View Here &gt;</button
						>
					</li>
					<li>
						<p>Web Development</p>
						<button
							on:click={(window.location.href =
								'https://www.sololearn.com/certificates/CC-FRTIAXVV')}>View Here &gt;</button
						>
					</li>
				</ul>
			</div>

			<div class="hackerrank certi-container">
				<div class="provider-container">
					<img src="/img/hackerrank.png" />
					<h1>HackerRank</h1>
					<div class="certi-line liners"></div>
				</div>

				<div class="hackerrank-images certi-images">
					<img src="/img/hacker-py.png" alt="" />
					<img src="/img/hacker-cs.png" alt="" />
					<img src="/img/hacker-java.png" alt="" />
				</div>

				<ul class="hackerrank-list certi-list">
					<li>
						<p>C# (Basic)</p>
						<button
							on:click={(window.location.href =
								'https://www.hackerrank.com/certificates/f2b3fb98d5e0')}>View Here &gt;</button
						>
					</li>
					<li>
						<p>Python (Basic)</p>
						<button
							on:click={(window.location.href =
								'https://www.hackerrank.com/certificates/6b001ddfb067')}>View Here &gt;</button
						>
					</li>
					<li>
						<p>Java (Basic)</p>
						<button
							on:click={(window.location.href =
								'https://www.hackerrank.com/certificates/19d2d26a673b')}>View Here &gt;</button
						>
					</li>
					<li>
						<p>Problem Solving (Basic)</p>
						<button
							on:click={(window.location.href =
								'https://www.hackerrank.com/certificates/879da98b6a32')}>View Here &gt;</button
						>
					</li>
					<li>
						<p>Software Engineer Intern Certification</p>
						<button
							on:click={(window.location.href =
								'https://www.hackerrank.com/certificates/4c8f13495a63')}>View Here &gt;</button
						>
					</li>
				</ul>
			</div>

			<div class="fcc certi-container">
				<div class="provider-container">
					<img src="/img/fcc.png" />
					<h1>FreeCodeCamp</h1>
					<div class="certi-line liners"></div>
				</div>

				<div class="fcc-images certi-images">
					<img src="/img/fcc-web.jpg" alt="" />
					<img src="/img/fcc-cs.jpg" alt="" />
				</div>

				<ul class="fcc-list certi-list">
					<li>
						<p>Foundational C# with Microsoft</p>
						<button
							on:click={(window.location.href =
								'https://freecodecamp.org/certification/Quainwaltzer/foundational-c-sharp-with-microsoft')}
							>View Here &gt;</button
						>
					</li>
					<li>
						<p>Responsive Web Design</p>
						<button
							on:click={(window.location.href =
								'https://freecodecamp.org/certification/Quainwaltzer/responsive-web-design')}
							>View Here &gt;</button
						>
					</li>
				</ul>
			</div>

			<div class="cc certi-container">
				<div class="provider-container">
					<img src="/img/cognitiveclass.png" />
					<h1>Cognitive Class / IBM</h1>
					<div class="certi-line liners"></div>
				</div>

				<div class="cc-images certi-images">
					<img src="/img/cc-data.png" alt="" />
					<img src="/img/cc-sql.png" alt="" />
					<img src="/img/cc-machine.png" alt="" />
				</div>

				<ul class="cc-list certi-list">
					<li>
						<p>SQL and Relational Databases 101</p>
						<button
							on:click={(window.location.href =
								'https://courses.cognitiveclass.ai/certificates/54f81c4472e14146ba9debf3bd4e558a')}
							>View Here &gt;</button
						>
					</li>
					<li>
						<p>Data Visualization with Python</p>
						<button
							on:click={(window.location.href =
								'https://courses.cognitiveclass.ai/certificates/121bf1b17d27457abd9d2047834db315')}
							>View Here &gt;</button
						>
					</li>
					<li>
						<p>Machine Learning with Python</p>
						<button
							on:click={(window.location.href =
								'https://courses.cognitiveclass.ai/certificates/692b6b7c5df1454d85a3e1b2b60654e9')}
							>View Here &gt;</button
						>
					</li>
					<li>
						<p>Python 101 for Data Science</p>
						<button
							on:click={(window.location.href =
								'https://courses.cognitiveclass.ai/certificates/4c20e40a7dbb4e0fbb7e154fdbd3fdd7')}
							>View Here &gt;</button
						>
					</li>
				</ul>
			</div>

			<div class="certi-others">
				<div class="other-title">
					<div class="certi-line liners"></div>
					<h1 class="certi-header section-head">Other Certificates</h1>
					<div class="certi-line liners"></div>
				</div>

				<div class="provider-container">
					<img src="/img/gfg.png" />
					<h1>Geeks for Geeks</h1>
					<div class="certi-line liners"></div>

					<ul class="gfg-list certi-list">
						<li>
							<p>Java Fundamentals</p>
							<button
								on:click={(window.location.href =
									'https://media.geeksforgeeks.org/courses/certificates/b374579a33ad770375257d8ca10fd932.pdf')}
								>View Here &gt;</button
							>
						</li>
						<li>
							<p>Python Fundamentals</p>
							<button
								on:click={(window.location.href =
									'https://media.geeksforgeeks.org/courses/certificates/005a338c0e1f895f4229c91f48044562.pdf')}
								>View Here &gt;</button
							>
						</li>
					</ul>
				</div>

				<div class="provider-container">
					<img src="/img/futurelearn.png" />
					<h1>Future Learn</h1>
					<div class="certi-line liners"></div>

					<ul class="futurelearn-list certi-list">
						<li>
							<p>Digital Skills: Web Analytics</p>
							<button
								on:click={(window.location.href =
									'https://www.futurelearn.com/certificates/6y5yxf7')}>View Here &gt;</button
							>
						</li>
					</ul>
				</div>

				<div class="provider-container">
					<img src="/img/saylor.png" />
					<h1>Saylor Academy</h1>
					<div class="certi-line liners"></div>

					<ul class="saylor-list certi-list">
						<li>
							<p>Discrete Structures</p>
							<button
								on:click={(window.location.href =
									'https://learn.saylor.org/pluginfile.php/1/tool_certificate/issues/1746266480/0050238102RE.pdf')}
								>View Here &gt;</button
							>
						</li>
					</ul>
				</div>

				<div class="provider-container">
					<img src="/img/aws.png" />
					<h1>Amazon Web Services</h1>
					<div class="certi-line liners"></div>

					<ul class="aws-list certi-list">
						<li>
							<p>Foundations of Prompt Engineering</p>
							<button
								on:click={(window.location.href =
									'https://www.linkedin.com/in/rovieendigado/details/certifications/1746332511387/single-media-viewer/?profileId=ACoAAFGOJjoBgjQBpnhYeyHxAYwCtmsXCxb3Gfs')}
								>View Here &gt;</button
							>
						</li>
						<li>
							<p>Cloud Security Essential for Executives</p>
							<button
								on:click={(window.location.href =
									'https://www.linkedin.com/in/rovieendigado/details/certifications/1746462744730/single-media-viewer/?profileId=ACoAAFGOJjoBgjQBpnhYeyHxAYwCtmsXCxb3Gfs')}
								>View Here &gt;</button
							>
						</li>
					</ul>
				</div>

				<div class="provider-container">
					<img src="/img/tou.png" />
					<h1>The Open University</h1>
					<div class="certi-line liners"></div>

					<ul class="tou-list certi-list">
						<li>
							<p>An introduction to electronics</p>
							<button
								on:click={(window.location.href =
									'https://www.open.edu/openlearn/blocks/ocwstatement/statement.php?id=4197&user=4425423&f=1')}
								>View Here &gt;</button
							>
						</li>
					</ul>
				</div>

				<div class="provider-container">
					<img src="/img/codingame.png" />
					<h1>CodinGame</h1>
					<div class="certi-line liners"></div>

					<ul class="codingame-list certi-list">
						<li>
							<p>C# Problem Solving</p>
							<button
								on:click={(window.location.href =
									'https://www.codingame.com/certification/D3jGsAX3FRpf_Z0JTTGeJQ')}
								>View Here &gt;</button
							>
						</li>
					</ul>
				</div>

				<div class="provider-container kaggle">
					<img src="/img/kaggle.png" />
					<h1>Kaggle</h1>
					<div class="certi-line liners"></div>

					<ul class="kaggle-list certi-list">
						<li>
							<p>Data Visualization</p>
							<button
								on:click={(window.location.href =
									'https://www.kaggle.com/learn/certification/rovieendigado/data-visualization')}
								>View Here &gt;</button
							>
						</li>
						<li>
							<p>Pandas</p>
							<button
								on:click={(window.location.href =
									'https://www.kaggle.com/learn/certification/rovieendigado/pandas')}
								>View Here &gt;</button
							>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<section bind:this={contact} class="contact">
		<div class="contact-title section-title-container">
			<div class="contact-line liners"></div>
			<h1 class="contact-header section-head">CONTACT ME</h1>
		</div>

		<div class="contact-container">
			<h1 class="email-header">The inputs below sends to my email directly!</h1>

			<div class="send-container">
				<div class="name-wrapper inputs-wrapper">
					<input
						type="text"
						placeholder=""
						class="send-name"
						bind:value={name}
						bind:this={nameInput}
					/>
					<p class="placeholder">Enter name here</p>
				</div>

				<div class="email-wrapper inputs-wrapper">
					<input
						type="text"
						placeholder=""
						class="send-email"
						bind:value={email}
						bind:this={emailInput}
					/>
					<p class="placeholder">Enter email here</p>
				</div>

				<div class="email-wrapper inputs-wrapper">
					<textarea
						type="text"
						placeholder=""
						class="send-message"
						bind:value={queries}
						bind:this={messageArea}
					></textarea>
					<p class="placeholder">Enter queries here</p>
				</div>

				<button
					class="send-to-email"
					on:click={sendEmail}
					disabled={!isFormValid}
					bind:this={sendButton}>Send</button
				>
				<div id="custom-alert" class="alert" bind:this={alertingS}>Email sent successfully!</div>
			</div>
		</div>
	</section>
</div>

<style>
	button {
		cursor: pointer !important;
	}

	.example {
		display: block;
		width: fit-content;
		margin: 0 auto;
		font-family: 'Outfit', sans-serif;
		font-optical-sizing: auto;
		font-size: 50px;
		color: #fffff0;
		margin-bottom: 50px;
	}

	.example .before {
		content: '';
		display: block;
		width: 0%;
		height: 5px;
		position: absolute;
		bottom: 0%;
		background-color: rgb(252, 105, 0);
	}

	.project-holder {
		display: flex;
		width: 80%;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto;
		margin-bottom: 40px;
		gap: 5rem;
	}

	.project-holder p {
		font-size: clamp(0.75rem, 1vw, 1rem);
		text-align: justify;
		margin-top: 10px;
	}

	.project-info {
		color: #fffff0;
		font-family: 'Inter', sans-serif;
		text-align: end;
		width: 40%;
	}

	.project-line {
		background-color: #9d1d1d !important;
	}

	.left {
		background-color: black;
		border-radius: 0 20px 0 20px;
		display: inline-block;
		box-shadow: 20px 20px 10px -10px rgba(0, 0, 0, 0.5);
		transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		cursor: pointer;
	}

	.left:hover {
		transform: scale(1.1) !important;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.main,
	.about,
	.projects,
	.certifications,
	.contact {
		width: 100%;
		height: 100dvh;
		padding: 5%;
		overflow: hidden;
		position: relative;
		/* box-shadow: inset 0 -10px 30px -5px rgba(0, 0, 0, 0.5); */
	}

	.main {
		background: #151515;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-family: 'Inter', sans-serif;
		padding-right: 15%;
		color: #fffff0;
	}

	.more {
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
	}

	.goto-about {
		width: 200px;
		height: 50px;
		font-family: 'Outfit', sans-serif;
		background-color: #151515;
		border: none;
		border-radius: 10px;
		color: #fffff0;
		box-shadow:
			inset 2px 2px 5px -2px rgba(0, 0, 0, 0.5),
			inset -2px -2px 4px -2px rgba(255, 255, 255, 0.3);
		transition:
			box-shadow 0.5s ease,
			transform 0.5s ease;
	}

	.goto-about:hover {
		box-shadow:
			inset 2px 2px 5px 2px rgba(255, 115, 0, 0.3),
			inset -2px -2px 5px 2px rgba(255, 115, 0, 0.3);
	}

	i {
		color: black;
	}
	svg {
		position: absolute;
		width: 30%;
		left: -10%;
		bottom: 0;
		height: auto;
		overflow: visible;
		z-index: 99;
	}

	.about {
		background: linear-gradient(to bottom, #151515, #ff5f1f);
		font-family: 'Inter', sans-serif;
		color: #fffff0;
		height: fit-content;
	}

	.projects {
		background: linear-gradient(to bottom, #ff5f1f, #9d1d1d);
		height: fit-content;
	}

	.certifications {
		background: linear-gradient(to bottom, #9d1d1d, #ff5f1f, #151515);
		height: fit-content;
	}

	@keyframes scroll-left {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(-50%);
		}
	}

	.contact {
		background: #151515;
	}

	.info h1 {
		font-size: clamp(1.5rem, 5vw, 3rem);
	}

	.info h2 {
		font-size: clamp(1.25rem, 4vw, 2rem);
	}

	.info h3 {
		font-size: clamp(1rem, 3vw, 1.5rem);
	}

	.info p {
		font-size: clamp(0.75rem, 2vw, 1rem);
	}

	.info-container {
		display: flex;
		justify-content: space-between;
		gap: 2rem;
		align-items: center;
		width: 100%;
	}

	.image-position {
		width: 20vw;
		height: auto;
		aspect-ratio: 1 / 1;
	}

	.image-container {
		width: 100%;
		height: 100%;
		background-color: #f8fbf8;
		border: 2px solid black;
		border-radius: 20px 0 20px 0;
		overflow: hidden;
	}

	.image-container::before {
		content: '';
		display: block;
		height: 100%;
		width: 100%;
		background: none;
		border: 3px solid transparent;
		border-image: linear-gradient(to right, #ff7e5f, #ff4b2b);
		border-image-slice: 3;
		position: absolute;
		z-index: -1;
		bottom: -5%;
		right: -5%;
		border-radius: 0 0 20px 0;
	}

	.image-container::after {
		content: '';
		display: block;
		height: 100%;
		width: 100%;
		background: none;
		border: 3px solid transparent;
		border-image: linear-gradient(to right, #ff7e5f, #ff4b2b);
		border-image-slice: 3;
		position: absolute;
		z-index: -1;
		bottom: -10%;
		right: -10%;
		border-radius: 0 0 20px 0;
	}

	.image-container img {
		width: 100%;
		height: 100%;
		display: block;
	}

	.about-container {
		display: flex;
		flex-direction: column;
	}

	.about-container > * {
		margin-bottom: 20px;
	}

	.school-info,
	.intern-info {
		display: flex;
		align-items: center;
		height: 100%;
	}

	.school-info > p,
	.school-info > div,
	.intern-info > p,
	.intern-info > div {
		padding: 20px;
		text-align: justify;
		font-size: clamp(0.75rem, 2vw, 1rem);
	}

	.esports-info > p {
		font-size: clamp(0.75rem, 2vw, 1rem);
	}

	.school-logo {
		width: 100px;
		height: auto;
		aspect-ratio: 1 / 1;
	}
	.images {
		height: 270px;
		width: 800px;
		position: relative;
	}

	.intern-info > p {
		flex-shrink: 2;
	}

	.imaging-1 {
		position: absolute;
		filter: grayscale(1);
		transition:
			transform 2s cubic-bezier(0.21, 0.75, 0.53, 1),
			filter 0.5s cubic-bezier(0.21, 0.75, 0.53, 1);
		width: 90%;
		max-width: 100%;
		height: auto;
		background-color: rgba(255, 255, 255, 0.9);
		padding: 10px;
		border-radius: 10px;
	}

	.imaging-1:hover {
		transform: rotate(0deg) scale(1.05) !important;
		filter: grayscale(0);
	}

	.imaging-2 {
		position: absolute;
		width: 40%;
		max-width: 100%;
		height: auto;
		bottom: 10px;
		left: -10px;
		filter: grayscale(1);
		transition:
			transform 2s cubic-bezier(0.21, 0.75, 0.53, 1),
			filter 0.5s cubic-bezier(0.21, 0.75, 0.53, 1);
		background-color: rgba(255, 255, 255, 0.9);
		padding: 10px;
		border-radius: 10px;
	}

	.imaging-2:hover {
		transform: rotate(0deg) scale(1.05) !important;
		filter: grayscale(0);
	}

	hr {
		width: 5px;
		height: 200px;
		background-color: #fffff0;
	}

	.project-info h1 {
		margin-bottom: 10px;
		font-size: 30px;
	}

	.social-container {
		position: absolute;
		right: 20px;
	}

	.socmed-list {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.socmed-list li {
		list-style: none;
		background-color: #fffff0;
		margin-bottom: 20px;
		padding: 10px;
		border-radius: 50%;
		box-shadow: 3px 3px 30px 1px black;
		cursor: pointer;
		transform: scale(1);
		transition: transform 0.5s cubic-bezier(0.21, 0.75, 0.53, 1);
	}

	.socmed-list li:hover {
		transform: scale(1.2) !important;
	}

	.embla {
		overflow: hidden;
		width: 100%;
	}

	.embla__container {
		display: flex;
		flex-wrap: nowrap;
	}

	.embla__slide {
		box-sizing: border-box;
		flex: 0 0 50%;
		min-width: 0;
		padding: 10px;
	}

	.embla__slide img {
		width: 100%;
		height: 300px;
		object-fit: cover;
		border-radius: 10px 0 10px 0;
		background: linear-gradient(to right, #ffffff, #d8d2d1);
		padding: 10px;
		display: block;
	}

	.section-title-container {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		margin-bottom: 30px;
		height: fit-content;
	}

	.section-head {
		font-family: 'Outfit', sans-serif;
		color: #fffff0;
		font-size: clamp(1.5rem, 5vw, 3rem);
	}

	.liners {
		content: '';
		display: block;
		width: 0%;
		height: 5px;
		background-color: rgb(252, 105, 0);
	}

	.provider-container {
		display: flex;
		gap: 1rem;
		align-items: center;
		margin-bottom: 20px;
	}

	.provider-container h1 {
		color: #fffff0;
		text-wrap: nowrap;
	}

	.provider-container img {
		width: 60px;
		height: 60px;
		aspect-ratio: 1/1;
	}

	p {
		font-family: 'DM Sans', sans-serif !important;
	}

	h1 {
		font-family: 'Outfit', sans-serif;
	}

	.certi-container {
		margin-bottom: 40px;
	}

	.certi-images img {
		width: 30vw;
		height: auto;
		border-radius: 20px;
		background-color: #fffff0;
		padding: 10px;
		box-shadow: 20px 20px 10px -10px rgba(0, 0, 0, 0.5);
	}

	.certi-images {
		display: flex;
		justify-content: center;
		position: relative;
		width: 100%;
		height: auto;
		margin-bottom: 30px;
	}

	.certi-images img:nth-child(2) {
		transform: scale(1);
	}

	.certi-images img:nth-child(1),
	.certi-images img:nth-child(3) {
		transform: scale(0.9);
	}

	.certi-list {
		list-style: none;
		color: #fffff0;
	}

	.certi-list li {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}

	.certi-list button {
		background: linear-gradient(to bottom right, #ff0051, #f65885);
		padding: 10px;
		width: fit-content;
		height: 40px;
		outline: none;
		border: none;
		border-radius: 20px 0 20px 0;
		color: #fffff0;
		font-family: 'Outfit', sans-serif;
		font-size: clamp(0.75rem, 2vw, 0.8rem);
		text-wrap: nowrap;
	}

	.certi-list p {
		font-size: clamp(0.75rem, 2vw, 1rem);
	}
	.fcc-images img:nth-child(1) {
		transform: scale(1);
		margin-right: 20px;
	}

	.certi-others {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		max-width: 1000px;
		margin: 0 auto;
		width: 100%;
		grid-template-rows: repeat(4, auto);
		gap: 20px 100px;
	}

	.certi-others .provider-container img {
		border-radius: 50px;
		object-fit: cover;
		aspect-ratio: 1/1;
	}

	.fcc .liners,
	.cc .liners {
		background-color: #9d1d1d !important;
	}

	.other-title {
		grid-column: 1/-1;
		display: flex;
		justify-content: center;
		align-items: center;
		text-wrap: nowrap;
		gap: 1.5rem;
	}

	.certi-others .provider-container {
		display: flex;
		flex-direction: column;
	}

	.certi-others .provider-container > .certi-list {
		width: 100%;
	}

	.certi-others .provider-container > .certi-list li {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.kaggle {
		grid-column: 1/-1;
	}

	.contact-header {
		text-wrap: nowrap;
	}

	.contact-container {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.contact-container h1 {
		color: #fffff0;
		margin-bottom: 10px;
		text-align: center;
	}

	.contact-container textarea {
		width: 100%;
		height: 100px;
		resize: none;
		background: #151515;
		outline: none;
		border: none;
		font-family: 'Outfit', sans-serif;
		color: #fffff0;
		font-size: clamp(0.75rem, 2vw, 1rem);
		border-radius: 20px;
		box-shadow:
			inset -1px -1px 4px -1px rgba(255, 255, 255, 0.5),
			inset 1px 1px 4px 1px rgba(0, 0, 0, 0.5);
		padding: 20px;
		scrollbar-color: transparent transparent; /* thumb color, track color */
		scrollbar-width: thin;
		scrollbar-arrow-color: transparent;
	}

	.send-container {
		display: flex;
		flex-direction: column;
		gap: 30px;
	}

	.send-name,
	.send-email {
		background: #151515;
		outline: none;
		border: none;
		font-family: 'Outfit', sans-serif;
		color: #fffff0;
		font-size: clamp(0.75rem, 2vw, 1rem);
		border-radius: 20px;
		box-shadow: inset 0 0 4px red;
		padding: 20px;
		scrollbar-color: transparent transparent; /* thumb color, track color */
		scrollbar-width: thin;
		scrollbar-arrow-color: transparent;
		width: 100%;
	}

	.inputs-wrapper {
		position: relative;
	}

	.placeholder {
		color: rgba(255, 255, 255, 0.3);
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 10px;
		background: #151515;
		width: fit-content;
		text-wrap: nowrap;
		padding: 10px 5px;
		border-radius: 100px;
		transition:
			transform 0.5s ease,
			color 0.5s ease;
		user-select: none;
		pointer-events: none;
	}

	.send-name:focus ~ p,
	.send-name:not(:placeholder-shown) ~ p,
	.send-email:focus ~ p,
	.send-email:not(:placeholder-shown) ~ p {
		transform: translateY(-120%);
		color: #fffff0;
	}

	.send-message:focus ~ p,
	.send-message:not(:placeholder-shown) ~ p {
		transform: translateY(-180%);
		color: #fffff0;
	}

	.alert {
		position: fixed;
		top: 20px;
		left: 50%;
		transform: translateX(-50%);
		background: #333;
		color: #fffff0;
		padding: 12px 24px;
		border-radius: 6px;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.3s ease;
		z-index: 9999;
	}

	.send-to-email {
		background: #fffff0;
		color: #151515;
		border-radius: 10px;
		padding: 10px;
		width: 10rem;
		margin: 0 auto;
		opacity: 1;
		font-family: 'Outfit', sans-serif;
		font-size: 20px;
		font-weight: bold;
		box-shadow:
			0 4px 8px rgba(255, 255, 255, 0.5),
			0 1px 2px rgba(255, 255, 255, 0.5);
		border: none;
		outline: none;
		transition: transform 0.5s ease;
	}

	.send-to-email:hover {
		transform: scale(1.1);
	}

	.send-to-email:disabled {
		opacity: 0.3;
	}

	/* Media Queries */

	@media (max-width: 767px) {
		* {
			box-sizing: border-box;
		}

		.project-info h1 {
			font-size: 20px;
		}

		.intern-info {
			flex-direction: column;
		}

		.second-hr {
			height: 3px;
			width: 100%;
			background-color: #fffff0;
		}

		.main {
			padding-right: 5%;
		}

		.info-container {
			width: 100vw;
		}

		.image-position {
			width: 200px;
			height: 200px;
			aspect-ratio: 1/1;
		}

		.image-container::before,
		.image-container::after {
			display: none;
		}

		.images {
			width: 100%;
			display: flex;
			gap: 1rem;
			justify-content: center;
			align-items: center;
		}

		.imaging-1 {
			position: static;
			transform: rotate(0deg);
			width: 250px;
			height: auto;
			aspect-ratio: 1 / 1;
			object-fit: cover;
		}

		.imaging-2 {
			position: static;
			transform: rotate(0deg);
			width: 250px;
			height: auto;
			aspect-ratio: 1 / 1;
			object-fit: cover;
		}

		.info-container {
			flex-direction: column-reverse;
		}

		.project-holder {
			flex-direction: column;
		}

		.project-info {
			width: 100%;
		}
	}

	@media (max-width: 631px) {
		svg {
			display: none;
		}
	}

	@media (max-width: 450px) {
		.embla__slide {
			flex: 0 0 100%;
		}

		.left {
			width: 100% !important;
			height: auto !important;
		}
		.project-holder {
			gap: 30px;
		}
	}
</style>
