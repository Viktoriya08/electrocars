<script lang="ts">
import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';
import type { MaskType } from '@scripts/consts/masks';
import { getMask } from '@scripts/mixins/getMask';
import type { ErrorObject } from '@vuelidate/core';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'InputText',
	components: { InputTemplate },
	mixins: [getMask],
	props: {
		modelValue: {
			type: [String, Number],
			default: () => null,
		},
		unmaskAsNumber: {
			type: Boolean,
			default: () => false,
		},
		type: {
			type: String as PropType<'text' | 'email' | 'tel' | 'numeric'>,
			default: () => 'text',
		},
		id: {
			type: String,
			default: () => '',
		},
		autocomplete: {
			type: String as PropType<
				'on' |
				'sex' |
				'honorific-prefix' |
				'given-name' |
				'additional-name' |
				'family-name' |
				'nickname' |
				'email' |
				'username' |
				'new-password' |
				'current-password' |
				'one-time-code' |
				'organization-title' |
				'organization' |
				'street-address' |
				'address-level4' |
				'address-level3' |
				'address-level2' |
				'address-level1' |
				'country' |
				'country-name' |
				'postal-code' |
				'cc-name' |
				'cc-given-name' |
				'cc-additional-name' |
				'cc-family-name' |
				'cc-number' |
				'cc-exp' |
				'cc-exp-month' |
				'cc-exp-year' |
				'cc-csc' |
				'cc-type' |
				'transaction-amount' |
				'tel' |
				'tel-local' |
				'url'
			>,
			default: () => 'on',
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
		title: {
			type: String,
			default: () => '',
		},
		name: {
			type: String,
			default: () => '',
		},
		maskType: {
			type: String as PropType<MaskType>,
			default: () => null,
		},
		errors: {
			type: Array as PropType<string[] | ErrorObject[]>,
			default: () => [],
		},
		autofocus: {
			type: Boolean,
			default: () => false,
		},
	},
	emits: ['update:modelValue'],
	computed: {
		value: {
			get(): string | number {
				return this.modelValue;
			},
			set(value: string) {
				if (this.unmaskAsNumber)
					this.$emit('update:modelValue', Number.parseFloat(value || '0'));
				else
					this.$emit('update:modelValue', value);
			},
		},
	},
});
</script>

<template>
	<InputTemplate :id="id" :label="label" :errors="errors" :disabled="disabled" :autofocus="autofocus" :read-only="readOnly" :is-empty="!value">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value="labelValue" />
		</template>

		<input
			:id="id"
			v-model="value"
			v-mask:[getMask(maskType)]
			:placeholder="placeholder"
			:disabled="disabled"
			:autofocus="autofocus"
			:readonly="readOnly"
			:required="required"
			:inputmode="type"
			:title="title"
			:name="name"
			:autocomplete="autocomplete"
			type="text"
			class="input-text"
		>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
	</InputTemplate>
</template>

<style lang="sass">
.input-text
	flex: 1 1 auto

	width: 100%
	min-height: calc(var(--di-border-width) + var(--di-font-size) * var(--di-line-height) + var(--di-py) * 2)
	padding: var(--di-py) var(--di-px)

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
</style>
