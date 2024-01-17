<script lang="ts">
import { defineComponent } from 'vue';
import { Swiper } from 'swiper/vue';
import { EffectFade, Pagination } from 'swiper/modules';
import type { PaginationOptions } from 'swiper/types';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/effect-fade';
import '@styles/libs/swiper.sass';

export default defineComponent({
	name: 'MainBanner',
	components: {
		Swiper,
	},
	setup() {
		return {
			modules: [Pagination, EffectFade],
		};
	},
	data() {
		return {
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
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
		effect="fade"
		:pagination="pagination"
		:speed="500"
		:loop="true"
	>
		<template #wrapper-start>
			<slot />
		</template>

		<template #container-end>
			<slot name="pagination">
				<div class="swiper-pagination" />
			</slot>
		</template>
	</Swiper>
</template>

<style scoped lang="sass">

</style>
