<script lang="ts">
import { defineComponent } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default defineComponent({
	name: 'StickyHeader',
	data() {
		return {
			animation: null as GSAPTween | null,
			scrollTrigger: null as ScrollTrigger | null,
			target: null as HTMLElement | null,
		};
	},
	mounted() {
		this.createAnimation();
	},
	unmounted() {
		this.killAnimation();
	},
	methods: {
		createAnimation() {

			const rootTarget = this.$el.nextElementSibling;
			if (!rootTarget) return;

			gsap.registerPlugin(ScrollTrigger);

			this.target = rootTarget;

			const animation = gsap.to(rootTarget, {
				yPercent: -100,
				willChange: 'transform',
				paused: true,
				duration: 0.4,
			});

			let scrollTop = 0;

			ScrollTrigger.create({
				start: `${window.innerHeight} bottom`,
				end: 'max',
				id: 'sticky-header-trigger',
				onUpdate: (self) => {
					if (self.direction === -1) {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						const scrollV = self.scroll.v
						if (!scrollTop) scrollTop = scrollV
						else if (scrollTop - scrollV >= 100) animation.reverse();
					} else {
						if (scrollTop) scrollTop = 0;
						animation.play();
					}
				},
				onLeaveBack: () => {
					animation.reverse();
				},
			});

			this.scrollTrigger = ScrollTrigger.getById('sticky-header-trigger') || null;
			this.animation = animation;
		},
		killAnimation() {
			if (this.animation) {
				this.animation.kill();
				this.animation = null;
			}

			if (this.scrollTrigger) {
				this.scrollTrigger.kill();
				this.scrollTrigger = null;
				ScrollTrigger.refresh();
			}

			this.target?.remove();
		},
	},
});
</script>

<template>
	<slot></slot>
</template>
