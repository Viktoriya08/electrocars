<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'IconSVG',
	props: {
		name: {
			type: String,
			required: true,
		},
	},
	setup() {
		const { BASE_URL, MODE } = import.meta.env;
		const IS_DEV = MODE === 'development';

		return { BASE_URL, IS_DEV };
	},
});
</script>

<template>
	<svg aria-hidden="true">
		<use :xlink:href="IS_DEV ? `#icon-${name}` : `${BASE_URL}img/icons.svg#icon-${name}`" />
	</svg>
</template>

<style scoped lang="sass"></style>
