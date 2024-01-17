<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Swiper } from 'swiper/vue';
import { EffectFade, Thumbs } from 'swiper/modules';
import {Swiper as SwiperInstance} from "swiper/types";
import 'swiper/scss';
import 'swiper/scss/thumbs';
import 'swiper/scss/effect-fade';
import '@styles/libs/swiper.sass';

export default defineComponent({
	name: 'ProductColorSlider',
	components: {
		Swiper,
	},
	setup() {
		const thumbsSwiper = ref<SwiperInstance | null>(null);

		const setThumbsSwiper = (swiper: SwiperInstance) => {
			thumbsSwiper.value = swiper;
		};
		return {
			EffectFade,
			Thumbs,
			setThumbsSwiper,
			thumbsSwiper,
		};
	},
});
</script>

<template>

	<article class="color-slider">
		<swiper
				class="color-slider__photo"
				:modules="[Thumbs, EffectFade]"
				:thumbs="{swiper: thumbsSwiper}"
				:space-between="0"
				:slides-per-view="1"
				effect="fade"
				:fade-effect="{ crossFade: true }"
				:speed="500"

		>
			<template #wrapper-start>
				<slot></slot>
			</template>

		</swiper>

		<swiper
				class="color-slider__thumbs"
				:modules="[Thumbs]"
				:space-between="0"
				:slides-per-view="'auto'"
				:speed="500"
				:watchSlidesProgress="true"
				@swiper="setThumbsSwiper"
		>
			<template #wrapper-start>
				<slot name="thumbs"></slot>
			</template>
		</swiper>
	</article>

</template>

<style scoped lang="sass">

</style>
