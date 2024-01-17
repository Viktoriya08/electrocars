<script lang="ts">
import { defineComponent } from 'vue';
import { Swiper } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import type { NavigationOptions, PaginationOptions } from 'swiper/types';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import '@styles/libs/swiper.sass';

export default defineComponent({
	name: 'ContentSlider',
	components: {
		Swiper,
	},
	setup() {
		return {
			modules: [Pagination, Navigation],
		};
	},
	data() {
		return {
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			} as NavigationOptions,
			pagination: {
				el: '.swiper-pagination',
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
		:space-between="0"
		:navigation="navigation"
		:pagination="pagination"
		:speed="500"
		:loop="true"
	>
		<template #wrapper-start>
			<slot />
		</template>

		<template #container-end>
			<div class="swiper-buttons">
				<div class="swiper-button swiper-button-prev" />
				<div class="swiper-button swiper-button-next" />
			</div>

			<div class="swiper-pagination" />
		</template>
	</Swiper>
</template>

<style scoped lang="sass">

</style>
