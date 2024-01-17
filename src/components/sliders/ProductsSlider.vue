<script lang="ts">
import { defineComponent } from 'vue';
import { Swiper } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import type { NavigationOptions, PaginationOptions, SwiperOptions } from 'swiper/types';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import '@styles/libs/swiper.sass';

export default defineComponent({
	name: 'ProductsSlider',
	components: {
		Swiper,
	},
	props: {
		id: {
			type: String,
			default: 'products-slider',
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
					spaceBetween: 16,
				},
				1025: {
					slidesPerView: 3,
					spaceBetween: 24,
				},
				1280: {
					slidesPerView: 4,
					spaceBetween: 40,
				},
			} as SwiperOptions['breakpoints'],
			navigation: {
				prevEl: `.products-block#${this.id} .swiper-button-prev`,
				nextEl: `.products-block#${this.id} .swiper-button-next`,
			} as NavigationOptions,
			pagination: {
				el: `.products-block#${this.id} .swiper-pagination`,
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
		:navigation="navigation"
		:pagination="pagination"
		:speed="500"
	>
		<template #wrapper-start>
			<slot />
		</template>
	</Swiper>
</template>

<style scoped lang="sass">

</style>
