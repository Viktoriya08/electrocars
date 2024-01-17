<script lang="ts">
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import '@styles/libs/swiper.sass';

import type { NavigationOptions, PaginationOptions, SwiperOptions } from 'swiper/types';
import { Swiper } from 'swiper/vue';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'MediaSlider',
	components: {
		Swiper,
	},
	props: {
		id: {
			type: String,
			default: 'media-slider',
		},
	},
	setup() {
		return {
			modules: [Pagination, Navigation],
		};
	},
	data() {
		return {
			breakpoints: {
				480: {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				520: {
					slidesPerView: 2,
					slidesPerGroup: 2,
					spaceBetween: 16,
				},
				1025: {
					slidesPerView: 3,
					slidesPerGroup: 3,
					spaceBetween: 24,
				},
				1280: {
					slidesPerView: 3,
					slidesPerGroup: 3,
					spaceBetween: 40,
				},
			} as SwiperOptions['breakpoints'],
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
});
</script>

<template>
	<Swiper
		:modules="modules"
		:slides-per-view="1"
		:space-between="15"
		:breakpoints="breakpoints"
		:slides-per-group="1"
		:speed="500"
		loop
		:navigation="navigation"
		:pagination="pagination"
	>
		<template #wrapper-start>
			<slot />
		</template>
	</Swiper>
</template>

<style scoped lang="sass">

</style>
