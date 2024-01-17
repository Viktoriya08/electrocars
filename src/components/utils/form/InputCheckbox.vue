<script lang="ts">
import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';
import type { ErrorObject } from '@vuelidate/core';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'InputCheckbox',
	components: { InputTemplate },
	props: {
		modelValue: {
			type: Boolean,
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
		text: {
			type: String,
			default: () => null,
		},
		readOnly: {
			type: Boolean,
			default: () => false,
		},
		disabled: {
			type: Boolean,
			default: () => false,
		},
		name: {
			type: String,
			default: () => '',
		},
		required: {
			type: Boolean,
			default: () => false,
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
			isChecked: false,
		};
	},
	computed: {
		value: {
			get(): boolean {
				return this.modelValue ?? this.isChecked;
			},
			set(value: boolean): void {
				this.isChecked = value;
				this.$emit('update:modelValue', value);
			},
		},
	},
});
</script>

<template>
	<InputTemplate :label="label" :errors="errors" tag="span" :disabled="disabled" :read-only="readOnly" :is-empty="!value">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value="labelValue" />
		</template>

		<label
			class="input-checkbox"
			:title="title"
			:class="[
				{ active: value },
				{ error: errors.length },
				{ disabled },
				{ readonly: readOnly },
			]"
		>
			<input
				:id="id"
				v-model="value"
				type="checkbox"
				:disabled="disabled || readOnly"
				:required="required"
				:name="name"
				:readonly="readOnly"
				class="input-checkbox__input"
			>
			<span class="input-checkbox__checkmark" />
			<span class="input-checkbox__value">
				{{ text }}
			</span>
		</label>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
	</InputTemplate>
</template>

<style scoped lang="sass">
.input-checkbox
	position: relative
	isolation: isolate
	display: flex
	flex: 1 1 auto
	align-items: center
	width: 100%

	&__checkmark
		display: flex
		flex-shrink: 0
		align-items: center
		justify-content: center

		size: rem(24)
		margin-right: rem(14)

		border-width: 2px
		border-style: solid
		border-radius: var(--radius-s)
		border-color: var(--di-marker-color)

		background-color: var(--di-marker-bg)

		color: var(--color-neutral-100)

		transition: border-color .3s ease, background-color .3s ease

		&::before
			content: ''
			position: relative
			z-index: 10

			display: block
			flex-grow: 0
			flex-shrink: 0

			size: 66.6%

			background-color: currentcolor
			mask-position: center
			mask-size: contain

			pointer-events: none

			@include icon("checkmark")

	&__value
		color: var(--di-color)
		font-size: var(--fontSizeP2)
		line-height: var(--lineHeightP1)

	&__input
		position: absolute
		top: 0
		left: 0
		width: 0
		height: 0
		opacity: 0
		appearance: none
</style>
