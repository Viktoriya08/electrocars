<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import type { ErrorObject } from '@vuelidate/core';
import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';

export default defineComponent({
	name: 'InputTextarea',
	components: { InputTemplate },
	props: {
		modelValue: {
			type: String,
			default: () => null,
		},
		id: {
			type: String,
			default: () => '',
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
		errors: {
			type: Array as PropType<string[] | ErrorObject[]>,
			default: () => [],
		},
	},
	emits: ['update:modelValue'],
	computed: {
		value: {
			get(): string {
				return this.modelValue;
			},
			set(value: string) {
				this.$emit('update:modelValue', value);
			},
		},
	},
});
</script>

<template>
	<InputTemplate :id="id" :label="label" :errors="errors">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value="labelValue" />
		</template>

		<textarea
			:id="id"
			v-model="value"
			:placeholder="placeholder"
			:disabled="disabled"
			:readonly="readOnly"
			:required="required"
			:title="title"
			:name="name"
			class="input-textarea"
			:class="{ error: errors.length }"
		/>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
	</InputTemplate>
</template>

<style lang="sass">
.input-textarea
		flex: 1 1 auto

		width: 100%
		min-height: calc(var(--di-border-width) + var(--di-font-size) * var(--di-line-height) + var(--di-py) * 2 + rem(56))
		max-height: rem(500)
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

		transition: border-color .3s ease, background-color .3s ease, color .3s ease

		resize: vertical

		@include placeholder
				color: var(--di-placeholder-color)
				transition: color .3s ease
</style>
