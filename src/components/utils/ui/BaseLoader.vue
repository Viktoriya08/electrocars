<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

type LoaderColorScheme = 'default' | 'dark';

export default defineComponent({
	name: 'BaseLoader',
	props: {
		colorScheme: {
			type: String as PropType<LoaderColorScheme>,
			default: () => 'default',
		},
	},
});
</script>

<template>
	<div class="loader" :class="`loader--${colorScheme}`" />
</template>

<style scoped lang="sass">
.loader
	position: fixed
	top: 0
	left: 0
	z-index: 999

	display: flex
	align-items: center
	justify-content: center

	width: 100%
	height: 100%

	&::before
		content: ""
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%
		background: var(--color-transparent-50)

	&::after
		content: ''
		size: fluid(48, 124)
		border-width: 4px
		border-style: solid
		border-radius: 50%
		animation: spin360 .7s linear infinite

		@include media('max', 'laptop')
			border-width: 2px

	&--default
		&::after
			border-color: var(--color-primary-500) var(--color-primary-500) var(--color-neutral-300)

	&--dark
		&::after
			border-color: var(--color-neutral-100) var(--color-neutral-100) var(--color-primary-400)
</style>
