<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';
import type { ErrorObject } from '@vuelidate/core';

export default defineComponent({
	name: 'InputSelect',
	components: { InputTemplate },
	props: {
		id: {
			type: String,
			default: () => '',
		},
		label: {
			type: String,
			default: () => '',
		},
		errors: {
			type: Array as PropType<string[] | ErrorObject[]>,
			default: () => [],
		},
		disabled: {
			type: Boolean,
			default: () => false,
		},
		readOnly: {
			type: Boolean,
			default: () => false,
		},
		isEmpty: {
			type: Boolean,
			default: () => true,
		},
	},
});
</script>

<template>
	<InputTemplate :id="id" :label="label" :errors="errors" :disabled="disabled" :read-only="readOnly" :is-empty="isEmpty">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value="labelValue" />
		</template>

		<slot />

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
	</InputTemplate>
</template>

<style lang="sass">
@import '@vueform/multiselect/themes/default'

.input-select
	flex: 1 1 auto
	width: 100%

	&.multiselect
		--ms-font-size: var(--di-font-size)
		--ms-line-height: var(--di-line-height)
		--ms-bg: var(--di-bg)
		--ms-bg-disabled: var(--di-bg-disabled)
		--ms-border-color: var(--di-border-color)
		--ms-border-width: var(--di-border-width)
		--ms-border-color-active: var(--di-border-color-active)
		--ms-border-width-active: var(--di-border-width)
		--ms-radius: var(--di-border-radius)
		--ms-py: var(--di-py)
		--ms-px: var(--di-px)
		--ms-ring-width: 0
		--ms-ring-color: none
		--ms-placeholder-color: var(--di-placeholder-color)
		--ms-max-height: #{rem(205)}
		--ms-spinner-color: var(--di-border-color-active)
		--ms-caret-color: var(--di-border-color-active)
		--ms-clear-color: var(--di-border-color-active)
		--ms-clear-color-hover: var(--di-border-color-active)
		--ms-tag-font-size: var(--fontSizeP3)
		--ms-tag-line-height: var(--lineHeightP3)
		--ms-tag-font-weight: 500
		--ms-tag-bg: var(--color-primary-300)
		--ms-tag-bg-disabled: var(--color-neutral-200)
		--ms-tag-color: var(--color-primary-500)
		--ms-tag-color-disabled: var(--color-neutral-300)
		--ms-tag-radius: var(--radius-m)
		--ms-tag-py: #{rem(2)}
		--ms-tag-px: #{rem(8)}
		--ms-tag-my: #{rem(4)}
		--ms-tag-mx: #{rem(4)}
		--ms-tag-remove-radius: var(--radius-m)
		--ms-tag-remove-py: #{rem(4)}
		--ms-tag-remove-px: #{rem(4)}
		--ms-tag-remove-my: 0
		--ms-tag-remove-mx: #{rem(2)}
		--ms-dropdown-bg: var(--color-neutral-100)
		--ms-dropdown-border-color: var(--color-neutral-200)
		--ms-dropdown-border-width: 1px
		--ms-dropdown-radius: var(--radius-m)
		--ms-group-label-py: #{fluid(8, 10)}
		--ms-group-label-px: #{fluid(12, 16)}
		--ms-group-label-line-height: var(--di-line-height)
		--ms-group-label-bg: transparent
		--ms-group-label-color: var(--di-color)
		--ms-group-label-bg-pointed: var(--color-primary-300)
		--ms-group-label-color-pointed: var(--color-primary-500)
		--ms-group-label-bg-disabled: var(--color-neutral-200)
		--ms-group-label-color-disabled: var(--color-neutral-300)
		--ms-group-label-bg-selected: var(--color-primary-400)
		--ms-group-label-color-selected: var(--color-neutral-100)
		--ms-group-label-bg-selected-pointed: var(--color-primary-500)
		--ms-group-label-color-selected-pointed: var(--color-neutral-100)
		--ms-group-label-bg-selected-disabled: var(--color-neutral-300)
		--ms-group-label-color-selected-disabled: var(--color-neutral-100)
		--ms-option-font-size: var(--di-font-size)
		--ms-option-line-height: var(--di-line-height)
		--ms-option-bg-pointed: var(--color-primary-300)
		--ms-option-color-pointed: var(--color-primary-500)
		--ms-option-bg-selected: var(--color-primary-400)
		--ms-option-color-selected: var(--color-neutral-100)
		--ms-option-bg-disabled: var(--color-neutral-200)
		--ms-option-color-disabled: var(--color-neutral-300)
		--ms-option-bg-selected-pointed: var(--color-primary-500)
		--ms-option-color-selected-pointed: var(--color-neutral-100)
		--ms-option-bg-selected-disabled: var(--color-neutral-300)
		--ms-option-color-selected-disabled: var(--color-neutral-100)
		--ms-option-py: #{fluid(8, 10)}
		--ms-option-px: #{fluid(12, 16)}
		--ms-empty-color: var(--di-color)

		min-height: calc(var(--ms-font-size) * var(--ms-line-height) + var(--ms-py) + var(--ms-border-width))
		padding-bottom: var(--ms-py)
		border-width: 0 0 1px
		color: var(--di-color)
		transition: border-color .3s ease

		& .multiselect
			&-wrapper
				min-height: calc(var(--ms-font-size) * var(--ms-line-height))

			&-caret
				size: var(--di-icon-size)

				@include icon('caret')

			&-clear
				size: var(--di-icon-size)
				margin: 0 calc(var(--ms-py) / 2) 0 0
				padding: 0

				&-icon
					size: 100%

					@include icon('close')

			&-spinner
				size: var(--di-icon-size)

				@include icon('spinner')

			&-dropdown
				padding: fluid(4, 8) rem(4) fluid(4, 8) fluid(4, 8)
				overflow: initial
				border-radius: var(--ms-dropdown-radius)
				transform: translateY(calc(100% + rem(6)))

			&-options
				gap: rem(2)
				max-height: 100%
				padding-right: rem(4)
				overflow-y: auto

				@include tiny-v-scroll

			&-option
				border-radius: var(--radius-m)

			&-tag
				white-space: initial

			&-group
				display: flex
				flex-direction: column
				gap: rem(2)

				&-label
					border-radius: var(--radius-m)
					font-size: var(--ms-font-size)
					font-weight: 400

				&-options
					display: flex
					flex-direction: column
					gap: rem(2)

					& .multiselect-option
						&::before
							content: '—'
							margin-right: rem(8)
</style>
