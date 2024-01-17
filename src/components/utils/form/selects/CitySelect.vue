<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import InputSelect from '@components/utils/form/InputSelect.vue';
import Multiselect from '@vueform/multiselect';
import type { ErrorObject } from '@vuelidate/core';

export default defineComponent({
	name: 'CitySelect',
	components: { InputSelect, Multiselect },
	props: {
		modelValue: {
			type: [String, Number],
			default: () => null,
		},
		id: {
			type: String,
			default: () => 'city-select',
		},
		searchable: {
			type: Boolean,
			default: () => false,
		},
		label: {
			type: String,
			default: () => 'Город',
		},
		placeholder: {
			type: String,
			default: () => 'Выберите город',
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
			default: () => 'Выберите город из списка',
		},
		valueProp: {
			type: String,
			default: () => '',
		},
		labelProp: {
			type: String,
			default: () => '',
		},
		canClear: {
			type: Boolean,
			default: () => false,
		},
		canDeselect: {
			type: Boolean,
			default: () => false,
		},
		options: {
			type: Array as PropType<string[] | Array<Record<string, unknown>>>,
			default: () => ['Челябинск', 'Екатеринбург'],
		},
		errors: {
			type: Array as PropType<string[] | ErrorObject[]>,
			default: () => [],
		},
	},
	emits: ['update:modelValue'],
	computed: {
		value: {
			get(): string | number {
				return this.modelValue;
			},
			set(value: string | number): void {
				this.$emit('update:modelValue', value);
			},
		},
	},
});
</script>

<template>
	<InputSelect :id="id" :label="label" :errors="errors">
		<Multiselect
			v-model="value"
			class="input-select"
			:class="[{ 'is-error': errors.length }, { 'is-readonly': readOnly }]"
			:title="title"
			:placeholder="placeholder"
			:options="options"
			:hide-selected="false"
			:searchable="searchable"
			:disabled="disabled || readOnly"
			:label="labelProp"
			:value-prop="valueProp"
			:can-clear="canClear"
			:can-deselect="canDeselect"
			no-results-text="Ничего не найдено"
		/>
	</InputSelect>
</template>

<style scoped lang="sass"></style>
