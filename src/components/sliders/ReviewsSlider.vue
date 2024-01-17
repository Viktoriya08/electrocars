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
	name: 'ReviewsSlider',
	components: {
		Swiper,
	},
	props: {
		id: {
			type: String,
			default: 'reviews-slider',
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
				520: {
					slidesPerView: 1.2,
					spaceBetween: 18,
				},
				1025: {
					slidesPerView: 1.2,
					spaceBetween: 24,
				},
				1280: {
					slidesPerView: 2,
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
		:space-between="14"
		rewind
		:breakpoints="breakpoints"
		:speed="500"
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
