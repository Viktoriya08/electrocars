<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import Toggle from '@vueform/toggle';
import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';
import type { ErrorObject } from '@vuelidate/core';

export default defineComponent({
	name: 'InputSwitch',
	components: { InputTemplate, Toggle },
	props: {
		modelValue: {
			type: [String, Number, Boolean],
			default: () => null,
		},
		id: {
			type: String,
			default: () => '',
		},
		disabled: {
			type: Boolean,
			default: () => false,
		},
		label: {
			type: String,
			default: () => '',
		},
		name: {
			type: String,
			default: () => '',
		},
		trueValue: {
			type: [String, Number, Boolean],
			default: () => true,
		},
		falseValue: {
			type: [String, Number, Boolean],
			default: () => false,
		},
		offLabel: {
			type: String,
			default: () => '',
		},
		onLabel: {
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
			switchValue: false as string | number | boolean,
		};
	},
	computed: {
		value: {
			get(): string | number | boolean {
				return this.modelValue ?? this.switchValue;
			},
			set(value: string | number | boolean) {
				this.switchValue = value;
				this.$emit('update:modelValue', value);
			},
		},
	},
	methods: {
		setValue(value: string | number | boolean) {
			if (this.disabled)
				return;
			this.value = value;
		},
	},
});
</script>

<template>
	<InputTemplate :label="label" :errors="errors" tag="span">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value="labelValue" />
		</template>

		<div
			class="input-switch"
			:class="[{ disabled }, { error: errors.length }, { active: value === trueValue }]"
		>
			<span
				v-if="offLabel"
				class="input-switch__label input-switch__label--off"
				@click="setValue(falseValue)"
			>{{ offLabel }}</span>
			<Toggle
				v-model="value"
				:disabled="disabled"
				:name="name"
				:true-value="trueValue"
				:false-value="falseValue"
				class="input-switch__switch"
			/>
			<span
				v-if="onLabel"
				class="input-switch__label input-switch__label--on"
				@click="setValue(trueValue)"
			>{{ onLabel }}</span>
		</div>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
	</InputTemplate>
</template>

<style lang="sass">
@import '@vueform/toggle/themes/default'

.input-switch
	display: flex
	align-items: center
	gap: rem(16)
	cursor: pointer

	&.error
		& .input-switch
			&__switch
				--toggle-ring-color: var(--di-border-color-error)

				& .toggle
					outline-width: 2px

	&.active
		& .input-switch
			&__switch

				&:focus-visible
					--toggle-ring-color: var(--color-primary-300)

				@include hover
					--toggle-ring-color: var(--color-primary-300)

	&.disabled
		cursor: not-allowed

		& .input-switch
			&__switch
				pointer-events: none

			&__label
				color: var(--di-color-disabled)
				pointer-events: none

	&__label
		color: var(--di-color)
		font-size: var(--di-font-size)
		line-height: var(--di-line-height)

	&__switch
		--toggle-width: #{rem(58)}
		--toggle-height: #{rem(28)}
		--toggle-border: #{rem(4)}
		--toggle-font-size: var(--di-font-size)
		--toggle-duration: 150ms
		--toggle-bg-on: var(--color-primary-500)
		--toggle-bg-off: var(--color-neutral-300)
		--toggle-bg-on-disabled: var(--color-primary-300)
		--toggle-bg-off-disabled: var(--color-neutral-200)
		--toggle-border-on: transparent
		--toggle-border-off: transparent
		--toggle-border-on-disabled: transparent
		--toggle-border-off-disabled: transparent
		--toggle-ring-width: 0
		--toggle-ring-color: var(--color-neutral-200)
		--toggle-text-on: var(--di-color)
		--toggle-text-off: var(--di-color)
		--toggle-text-on-disabled: var(--color-neutral-500)
		--toggle-text-off-disabled: var(--color-neutral-500)
		--toggle-handle-enabled: var(--color-neutral-100)
		--toggle-handle-disabled: var(--color-neutral-100)

		&:focus
			box-shadow: none

		&:focus-visible
			& .toggle
				outline-width: var(--toggle-ring-width)


		& .toggle
			outline-color: var(--toggle-ring-color)
			outline-style: solid
			outline-width: 0
			transition: background-color .3s ease, border-color .3s ease
</style>
