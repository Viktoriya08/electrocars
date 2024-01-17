<script lang="ts">
import '@styles/libs/swiper.sass';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/effect-fade';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

// import type { NavigationOptions, PaginationOptions } from 'swiper/types';
import type { NavigationOptions, PaginationOptions, Swiper as SwiperInstance } from 'swiper/types';
import { Swiper } from 'swiper/vue';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'StorySlider',
	components: {
		Swiper,
	},
	props: {
		id: {
			type: String,
			default: 'story-slider',
		},
	},
	setup() {
		return {
			modules: [Pagination, Navigation, EffectFade],
		};
	},
	data() {
		return {
			slider: null as SwiperInstance | null,
			navigation: {
				prevEl: `#${this.id} .swiper-button-prev`,
				nextEl: `#${this.id} .swiper-button-next`,
			} as NavigationOptions,
			pagination: {
				el: `#${this.id} .swiper-pagination`,
				type: 'fraction',
			} as PaginationOptions,
		};
	},
	methods: {
		onSliderNext(swiper: SwiperInstance) {
			const width = window.innerWidth;
			if (width <= 768)
				return;
			const circleAnimat = document.querySelector(`.story__bg`) as HTMLElement;

			if (!circleAnimat)
				return;

			circleAnimat.classList.remove('circle-right', 'circle-left');
			setTimeout(() => {
				circleAnimat.classList.add('circle-left');
			}, 100);
		},
		onSliderPrev(swiper: SwiperInstance) {
			const width = window.innerWidth;
			if (width <= 768)
				return;
			const circleAnimat = document.querySelector(`.story__bg`) as HTMLElement;

			if (!circleAnimat)
				return;

			circleAnimat.classList.remove('circle-right', 'circle-left');
			setTimeout(() => {
				circleAnimat.classList.add('circle-right');
			}, 100);
		},
	},
});
</script>

<template>
	<slot name="controls" />

	<Swiper
		class="story__slider"
		:modules="modules"
		:slides-per-view="1"
		:space-between="10"
		:speed="500"
		:navigation="navigation"
		:pagination="pagination"
		effect="fade"
		@slide-next-transition-start="onSliderNext"
		@slide-prev-transition-start="onSliderPrev"
	>
		<template #wrapper-start>
			<slot />
		</template>
	</Swiper>
</template>

<style scoped lang="sass">

</style>
