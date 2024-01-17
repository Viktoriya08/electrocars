<script lang="ts">
import type { ErrorObject } from '@vuelidate/core';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'InputTemplate',
	props: {
		label: {
			type: String,
			default: () => '',
		},
		isEmpty: {
			type: Boolean,
			default: true,
		},
		tag: {
			type: String as PropType<'label' | 'span'>,
			default: () => 'label',
		},
		id: {
			type: String,
			default: '',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		autofocus: {
			type: Boolean,
			default: false,
		},
		readOnly: {
			type: Boolean,
			default: false,
		},
		errors: {
			type: Array as PropType<string[] | ErrorObject[]>,
			default: () => [],
		},
		requiredText: {
			type: String,
			default: () => '',
		},
	},
});
</script>

<template>
	<div class="default-input" :class="[{ error: errors.length }, { disabled }, { autofocus }, { 'read-only': readOnly }, { active: !isEmpty }]">
		<Component :is="tag" v-if="label" :for="id" class="default-input__label">
			<slot name="label" :label-value="label">
				<span class="default-input__label-text">{{ label }}</span>
				<span v-if="requiredText" class="default-input__label-required">{{ requiredText }}</span>
			</slot>
		</Component>
		<div class="default-input__input">
			<slot />
			<slot name="action" />
		</div>
		<ul v-if="errors.length" class="default-input__errors">
			<li class="default-input__error">
				{{ typeof errors[0] === 'string' ? errors[0] : errors[0].$message }}
			</li>
		</ul>
	</div>
</template>

<style scoped lang="sass">
.default-input
	display: flex
	flex-direction: column

	&.disabled
		--di-label-color: var(--di-label-color-disabled)
		--di-border-color: var(--di-border-color-disabled)
		--di-color: var(--di-color-disabled)
		--di-bg: var(--di-bg-disabled)
		--di-placeholder-color: var(--di-placeholder-color-disabled)
		--di-marker-color: var(--di-marker-color-disabled)
		--di-marker-bg: var(--di-marker-bg-disabled)

		cursor: not-allowed

		& .default-input
			&__label,
			&__input
				pointer-events: none

	&.read-only:not(.disabled)
		cursor: help

		& .default-input
			&__label,
			&__input
				pointer-events: none

	&.error
		--di-color: var(--di-color-error)
		--di-bg: var(--di-bg-error)
		--di-placeholder-color: var(--di-placeholder-color-error)
		--di-label-color: var(--di-label-color-error)
		--di-border-color: var(--di-border-color-error)
		--di-marker-color: var(--di-marker-color-error)
		--di-marker-bg: var(--di-marker-bg-error)

	&.active
		--di-marker-bg: var(--di-marker-bg-active)
		--di-marker-color: var(--di-marker-color-active)

		&:focus-within
			--di-marker-bg: var(--di-marker-bg-active)

		@include hover
			--di-marker-bg: var(--di-marker-bg-active)
			--di-marker-color: var(--di-marker-color-active)

	&__label
		display: flex
		flex: 0 0 min-content
		align-items: center
		justify-content: space-between
		gap: rem(2)

		padding-bottom: fluid(5, 2)

		overflow: hidden

		color: var(--di-label-color)

		font-size: var(--di-label-font-size)
		font-weight: var(--di-label-font-weight)
		letter-spacing: var(--di-label-letter-spacing)
		line-height: var(--di-label-line-height)

		transition: color .3s ease, opacity .3s ease

		&-text
			overflow: hidden
			text-overflow: ellipsis
			white-space: nowrap

		&-required
			color: var(--color-neutral-300)
			font-size: var(--fontSizeP4)
			line-height: var(--lineHeightP2)

	&__input
		position: relative
		display: flex
		align-items: center
		gap: rem(8)
		min-width: rem(220)

		@include while-mob-xl
			min-width: rem(200)

	&__errors
		display: flex
		flex-direction: column
		gap: rem(6)

		max-width: 100%
		margin-top: rem(6)

		color: var(--di-error-color)

		font-size: var(--di-error-font-size)
		font-weight: var(--di-error-font-weight)
		letter-spacing: var(--di-error-letter-spacing)
		line-height: var(--di-error-line-height)

		animation: error-appear .2s ease forwards

	&__error
		color: var(--color-negative)
		font-size: var(--fontSizeP3)
		font-weight: 400
		line-height: var(--lineHeightP1)

	&:not(.read-only, .disabled, .active)

		&:focus-within
			// --di-color: var(--di-color-focus)
			// --di-bg: var(--di-bg-focus)
			// --di-placeholder-color: var(--di-placeholder-color-focus)
			// --di-label-color: var(--di-label-color-focus)
			// --di-border-color: var(--di-border-color-focus)
			// --di-marker-color: var(--color-primary-500)
			// --di-marker-bg: var(--color-primary-500)

			& .default-input
				&__label
					opacity: 1

		@include hover
			--di-color: var(--di-color-hover)
			--di-bg: var(--di-bg-hover)
			--di-placeholder-color: var(--di-placeholder-color-hover)
			--di-label-color: var(--di-label-color-hover)
			--di-border-color: var(--di-border-color-hover)
			--di-marker-color: var(--di-marker-color-hover)
			--di-marker-bg: var(--di-marker-bg-hover)

			& .default-input
				&__label
					opacity: 1

@keyframes error-appear
	0%
		opacity: 0
		font-size: rem(0)

	100%
		opacity: 1
		font-size: var(--di-error-font-size)
</style>
