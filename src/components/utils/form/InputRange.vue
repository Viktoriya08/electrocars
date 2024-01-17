<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import type { MaskType } from '@scripts/consts/masks';
import { getMask } from '@scripts/mixins/getMask';
import type { ErrorObject } from '@vuelidate/core';
import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';
import Slider from '@vueform/slider';

interface FormatTooltipsObject {
	prefix?: string
	suffix?: string
	decimals?: number
	thousands?: string
}
export default defineComponent({
	name: 'InputRange',
	components: { InputTemplate, Slider },
	mixins: [getMask],
	props: {
		modelValue: {
			type: [Number, Array] as PropType<number | [number, number]>,
			default: () => null,
		},
		min: {
			type: Number,
			default: () => 0,
		},
		max: {
			type: Number,
			default: () => 100,
		},
		lazy: {
			type: Boolean,
			default: () => true,
		},
		sliderOnly: {
			type: Boolean,
			default: () => false,
		},
		step: {
			type: Number,
			default: () => 1,
		},
		tooltips: {
			type: Boolean,
			default: () => false,
		},
		tooltipMerge: {
			type: Number,
			default: () => -1,
		},
		tooltipFormat: {
			type: [Function, Object] as PropType<
				((value: number) => string | number) | FormatTooltipsObject
			>,
			default: null,
		},
		tooltipPosition: {
			type: String as PropType<'top' | 'bottom' | 'left' | 'right'>,
			default: () => 'bottom',
		},
		id: {
			type: String,
			default: () => '',
		},
		label: {
			type: String,
			default: () => '',
		},
		readOnly: {
			type: Boolean,
			default: () => false,
		},
		disabled: {
			type: Boolean,
			default: () => false,
		},
		required: {
			type: Boolean,
			default: () => false,
		},
		title: {
			type: String,
			default: () => '',
		},
		name: {
			type: String,
			default: () => '',
		},
		leftPrefix: {
			type: String,
			default: () => '',
		},
		rightPrefix: {
			type: String,
			default: () => '',
		},
		suffix: {
			type: String,
			default: () => '',
		},
		maskType: {
			type: String as PropType<Extract<MaskType, 'integerMask' | 'decimalMask'>>,
			default: () => 'integerMask',
		},
		errors: {
			type: Array as PropType<string[] | ErrorObject[]>,
			default: () => [],
		},
		theme: {
			type: String as PropType<'default' | 'mini'>,
			default: 'default',
		},
	},
	emits: ['update:modelValue'],
	data() {
		return {
			currentVal: 0 as number | [number, number],
		};
	},
	computed: {
		value: {
			get(): number | [number, number] {
				return this.modelValue ?? this.currentVal;
			},
			set(value: number | [number, number]) {
				this.currentVal = value;
				this.$emit('update:modelValue', value);
			},
		},
		inputMask() {
			return {
				...this.getMask(this.maskType),
				postProcess: (rawValue: string) => {
					const value = Number.parseFloat(rawValue);
					if (Number.isNaN(value))
						return 0;

					if (value < this.min)
						return this.min;

					if (value > this.max)
						return this.max;

					return value;
				},
			};
		},
	},
});
</script>

<template>
	<InputTemplate :id="id" :label="label" tag="span" :errors="errors"  :disabled="disabled" :read-only="readOnly" :is-empty="!value">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value="labelValue" />
		</template>

		<div
			class="input-range"
			:title="title"
			:class="[{ error: errors.length }, { disabled }, { readonly: readOnly }, `input-range--${theme}`]"
		>
			<div v-if="!sliderOnly" class="input-range__wrapper">
				<template v-if="Array.isArray(value)">
					<label class="input-range__input-wrapper">
						<span v-if="leftPrefix" class="input-range__prefix">{{ leftPrefix }}</span>
						<input
							:id="`${id}-1`"
							v-model="value[0]"
							v-mask:[inputMask]
							:disabled="disabled"
							:readonly="readOnly"
							:required="required"
							inputmode="numeric"
							:name="name"
							type="text"
							class="input-range__input input-range__input--left"
						>
					</label>
					<label class="input-range__input-wrapper">
						<span v-if="rightPrefix" class="input-range__prefix">{{ rightPrefix }}</span>
						<input
							:id="`${id}-2`"
							v-model="value[1]"
							v-mask:[inputMask]
							:disabled="disabled"
							:readonly="readOnly"
							:required="required"
							inputmode="numeric"
							:name="name"
							type="text"
							class="input-range__input input-range__input--right"
						>
						<span v-if="suffix" class="input-range__suffix">{{ suffix }}</span>
					</label>
				</template>
				<label v-else class="input-range__input-wrapper">
					<span v-if="leftPrefix" class="input-range__prefix">{{ leftPrefix }}</span>
					<input
						:id="id"
						v-model="value"
						v-mask:[inputMask]
						:disabled="disabled"
						:readonly="readOnly"
						:required="required"
						inputmode="numeric"
						:name="name"
						type="text"
						class="input-range__input input-range__input--single"
					>
					<span v-if="suffix" class="input-range__suffix">{{ suffix }}</span>
				</label>
			</div>
			<div class="input-range__slider-wrapper">
				<Slider
						v-model="value"
						:min="min"
						:max="max"
						:lazy="lazy"
						:tooltips="disabled ? false : tooltips"
						:step="step"
						:format="tooltipFormat"
						:merge="tooltipMerge"
						:tooltip-position="tooltipPosition"
						:disabled="disabled || readOnly"
						class="input-range__slider"
				/>
			</div>
		</div>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
	</InputTemplate>
</template>

<style lang="sass">
@import '@vueform/slider/themes/default.css'

.input-range
	position: relative
	flex: 1 1 auto

	&__wrapper
		display: flex
		align-items: center
		justify-content: stretch
		gap: fluid(12, 14)

		width: 100%
		min-height: calc(var(--di-font-size) * var(--di-line-height))

		overflow: hidden

		background-color: transparent

		color: var(--di-color)

		font-size: var(--di-font-size)
		font-weight: var(--di-font-weight)
		letter-spacing: var(--di-letter-spacing)
		line-height: var(--di-line-height)

		text-overflow: ellipsis
		white-space: nowrap

		transition: color .3s ease

	&__input-wrapper
		display: flex
		flex: 1 1 auto
		align-items: center
		justify-content: flex-start
		gap: fluid(12, 14)
		cursor: inherit

	&__input
		flex: 1 1 75%

		width: 100%
		min-width: rem(30)
		max-width: rem(75)
		margin: 0
		padding: 0

		overflow: hidden

		border: none
		border-radius: 0

		background-color: transparent

		text-align: center
		text-overflow: ellipsis
		white-space: nowrap

		cursor: inherit

		@include placeholder
			color: var(--di-placeholder-color)
			transition: color .3s ease

		&--single
			max-width: rem(125)

	&__prefix
		flex: 1 0 25%

		max-width: max-content

		overflow: hidden

		color: var(--di-border-color)

		font-size: var(--di-font-size)
		line-height: var(--di-line-height)

		text-overflow: ellipsis
		white-space: nowrap

		transition: color .3s ease

	&__suffix
		flex-shrink: 0
		color: var(--di-border-color)
		font-size: var(--di-font-size)
		line-height: var(--di-line-height)
		white-space: nowrap
		transition: color .3s ease

	&__slider-wrapper
		--slider-bg: var(--color-primary-400)
		--slider-connect-bg: var(--color-primary-500)
		--slider-connect-bg-disabled: var(--color-neutral-200)
		--slider-height: 2px
		--slider-vertical-height: #{rem(300)}
		--slider-radius: var(--radius-l)
		--slider-handle-bg: var(--color-neutral-100)
		--slider-handle-border: #{rem(12)} solid var(--di-color)
		--slider-handle-width: #{rem(32)}
		--slider-handle-height: #{rem(32)}
		--slider-handle-radius: 50%
		--slider-handle-shadow: none
		--slider-handle-shadow-active: none
		--slider-handle-ring-width: 0
		--slider-handle-ring-color: transparent
		--slider-tooltip-font-size: var(--fontSizeP3)
		--slider-tooltip-line-height: var(--lineHeightP2)
		--slider-tooltip-font-weight: 700
		--slider-tooltip-min-width: #{rem(20)}
		--slider-tooltip-bg: var(--color-primary-500)
		--slider-tooltip-bg-disabled: var(--di-border-color-disabled)
		--slider-tooltip-color: var(--color-neutral-100)
		--slider-tooltip-radius: var(--radius-m)
		--slider-tooltip-py: #{rem(2)}
		--slider-tooltip-px: #{rem(6)}
		--slider-tooltip-arrow-size: #{rem(6)}
		--slider-tooltip-distance: #{rem(2)}
		display: flex
		align-items: center
		width: 100%
		height: var(--slider-handle-height)
		padding: 0 calc(var(--slider-handle-width) / 2)


		&:not(:first-child)
			margin-top: fluid(14, 24)

	&__slider
		width: 100%

	&--mini
		.input-range
			&__slider-wrapper
				--slider-handle-border: #{rem(6)} solid var(--di-color)
				--slider-handle-width: #{rem(20)}
				--slider-handle-height: #{rem(20)}

				margin-top: fluid(6,12)
</style>
