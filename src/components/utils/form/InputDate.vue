<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import { DatePicker } from 'v-calendar';
import type { ErrorObject } from '@vuelidate/core';
import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';

export default defineComponent({
	name: 'InputDate',
	components: {
		InputTemplate,
		DatePicker,
	},
	props: {
		modelValue: {
			type: [String, Date],
			default: () => null,
		},
		id: {
			type: String,
			default: () => '',
		},
		dateMask: {
			type: String,
			default: () => 'DD.MM.YYYY',
		},
		label: {
			type: String,
			default: () => '',
		},
		placeholder: {
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
		maxDate: {
			type: Object as PropType<Date>,
			default: () => null,
		},
		minDate: {
			type: Object as PropType<Date>,
			default: () => null,
		},
		title: {
			type: String,
			default: () => '',
		},
		errors: {
			type: Array as PropType<string[] | ErrorObject[]>,
			default: () => [],
		},
	},
	emits: ['update:modelValue'],
	data() {
		return {
			date: null as Date | string | null,
		};
	},
	computed: {
		getInputMask() {
			return {
				mask: this.dateMask.replaceAll(/\w/gi, '#'),
			};
		},
		getDatePickerMasks() {
			return {
				input: this.dateMask,
			};
		},
		value: {
			get(): Date | string {
				return this.modelValue ?? this.date;
			},
			set(value: Date) {
				this.date = value;
				this.$emit('update:modelValue', value);
			},
		},
	},
});
</script>

<template>
	<InputTemplate :id="id" :label="label" :errors="errors" :disabled="disabled" :read-only="readOnly" :is-empty="!value">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value="labelValue" />
		</template>

		<DatePicker
			v-model="value"
			:masks="getDatePickerMasks"
			:max-date="maxDate"
			:min-date="minDate"
		>
			<template #default="{ inputValue, inputEvents }">
				<div class="input-date" :class="[{ error: errors.length }, { disabled }]">
					<input
						:id="id"
						v-mask:[getInputMask]
						:value="inputValue"
						:placeholder="placeholder"
						:disabled="disabled"
						:readonly="readOnly"
						:required="required"
						:title="title"
						type="text"
						class="input-date__input"
						v-on="(!readOnly && !disabled && inputEvents) || {}"
					>
					<span aria-hidden="true" class="input-date__icon">
						<span class="input-date__icon-image" />
					</span>
				</div>
			</template>
		</DatePicker>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
	</InputTemplate>
</template>

<style lang="sass">
@import 'v-calendar/dist/style.css'

.input-date
	position: relative

	&__input
		flex: 1 1 auto

		width: 100%
		min-height: calc(var(--di-border-width) + var(--di-font-size) * var(--di-line-height) + var(--di-py))
		padding: 0 calc(var(--di-px) + var(--di-icon-size) + var(--di-icon-size) / 2) var(--di-py) var(--di-px)

		overflow: hidden

		border-width: 0 0 var(--di-border-width)
		border-style: solid
		border-radius: var(--di-border-radius)
		border-color: var(--di-border-color)

		background-color: var(--di-bg)

		color: var(--di-color)

		font-size: var(--di-font-size)
		font-weight: var(--di-font-weight)
		letter-spacing: var(--di-letter-spacing)
		line-height: var(--di-line-height)

		text-overflow: ellipsis
		white-space: nowrap

		transition: border-color .3s ease, background-color .3s ease, color .3s ease

		@include placeholder
			color: var(--di-placeholder-color)
			transition: color .3s ease

	&__icon
		position: absolute
		top: 0
		right: var(--di-px)

		display: inline-block

		size: var(--di-icon-size)

		color: var(--di-border-color)

		transition: color .3s ease

		pointer-events: none

		&-image
			display: inline-block
			size: 100%
			background-color: currentcolor
			mask-position: center

			mask-size: contain

			@include icon('calendar')
</style>
