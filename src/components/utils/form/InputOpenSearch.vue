<script lang="ts">
import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';
import type { ErrorObject } from '@vuelidate/core';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'InputOpenSearch',
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
		tooltips: {
			type: Array as PropType<string[]>,
			default: () => [],
		},
		showTooltips: {
			type: Boolean,
			default: () => false,
		},
		name: {
			type: String,
			default: () => '',
		},
		readOnly: {
			type: Boolean,
			default: () => false,
		},
		placeholder: {
			type: String,
			default: () => 'Поиск',
		},
		disabled: {
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
	emits: ['update:modelValue', 'search', 'clear'],
	data() {
		return {
			isFocus: false,
			currentVal: '',
		};
	},
	computed: {
		value: {
			get(): string {
				return this.modelValue ?? this.currentVal;
			},
			set(value: string) {
				this.$emit('update:modelValue', value);
				this.currentVal = value;
			},
		},
	},
	mounted() {
		if (!this.disabled) {
			(this.$refs.search as HTMLInputElement).focus();
			this.isFocus = true;
		}
	},
	methods: {
		setValue(value: string): void {
			this.value = value;
		},
		// handleFocusOut(): void {
		// 	this.isFocus = false;
		// },
		// handleFocusIn(): void {
		// 	if (this.disabled)
		// 		return;
		// 	this.isFocus = true;
		// },
		handleSearch(): void {
			if (this.disabled)
				return;
			this.$emit('search', this.value);
		},
		handleClear(event: Event): void {
			this.setValue('');
			this.$emit('clear');
			event.stopPropagation();
		},

	},
});
</script>

<template>
	<InputTemplate :id="id" :label="label" :errors="errors" :disabled="disabled" :read-only="readOnly" :is-empty="!value">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value="labelValue" />
		</template>

		<div class="input-search">
			<div class="input-search__wrapper">
				<input
					:id="id"
					ref="search"
					v-model="value"
					:placeholder="placeholder"
					:disabled="disabled"
					inputmode="text"
					:title="title"
					:name="name"
					type="text"
					class="input-search__input"
				>

				<div v-if="isFocus" class="input-search__icons">
					<span
						aria-hidden="true"
						tabindex="0"
						role="button"
						class="input-search__clear"
						:class="{ disabled }"
						@click="handleClear"
						@keydown.enter="handleClear"
					>
						<span class="input-search__clear-icon" />
					</span>
					<span
						aria-hidden="true"
						tabindex="0"
						role="button"
						class="input-search__arrow"
						@click="handleSearch"
						@keydown.enter="handleSearch"
					>
						<span class="input-search__arrow-icon" />
					</span>
				</div>
				<div v-else class="input-search__icons">
					<span
						aria-hidden="true"
						tabindex="0"
						role="button"
						class="input-search__lens"
						@click="handleSearch"
						@keydown.enter="handleSearch"
					>
						<span class="input-search__lens-icon" />
					</span>
					<span
						aria-hidden="true"
						tabindex="0"
						role="button"
						class="input-search__clear"
						:class="{ disabled }"
						@click="handleClear"
						@keydown.enter="handleClear"
					>
						<span class="input-search__clear-icon" />
					</span>
				</div>
			</div>
			<div v-show="tooltips.length && showTooltips && isFocus" class="input-search__dropdown">
				<ul class="input-search__tooltips">
					<li
						v-for="tooltip in tooltips"
						:key="tooltip"
						tabindex="0"
						role="button"
						class="input-search__tooltip"
						@click="setValue(tooltip)"
						@keydown.enter="setValue(tooltip)"
					>
						{{ tooltip }}
					</li>
				</ul>
			</div>
		</div>
	</InputTemplate>
</template>

<style lang="sass">
.input-search
	position: relative
	flex: 1 1 auto

	&__wrapper
		position: relative
		display: flex
		min-width: rem(250)

	&__input
		flex: 1 1 auto

		width: 100%
		min-height: calc(var(--di-border-width) + var(--di-font-size) * var(--di-line-height) + var(--di-py))
		padding: var(--di-py) calc(var(--di-px) + var(--di-icon-size) + fluid(8, 12))

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

		&:focus
			+ .input-search__icons
				.input-search__lens
					color: var(--color-primary-500)

		@include placeholder
			color: var(--di-placeholder-color)
			transition: color .3s ease

	&__icons
		position: absolute
		top: 50%
		left: 0

		display: flex
		align-items: center
		justify-content: space-between

		width: 100%
		padding: fluid(0, 2) 0

		transform: translate(0, -50%)

		pointer-events: none

	&__lens,
	&__clear,
	&__arrow
		display: flex
		flex-grow: 0
		flex-shrink: 0
		align-items: center
		justify-content: center

		size: var(--di-icon-size)

		transition: color .3s ease

		cursor: pointer

		pointer-events: all

		&-icon
			display: inline-block
			size: 100%
			mask-repeat: no-repeat
			mask-size: contain

	&__lens
		color: var(--color-neutral-300)

		@include hover
			color: var(--color-primary-400)

		&.disabled
			color: var(--di-color-disabled)
			cursor: not-allowed

		&-icon
			background-color: currentcolor

			@include icon('search')

	&__arrow
		color: var(--color-primary-500)

		@include hover
			color: var(--color-primary-400)

		&.disabled
			color: var(--di-color-disabled)
			cursor: not-allowed

		&-icon
			background-color: currentcolor

			@include icon('arrow-right')

	&__clear
		color: var(--color-primary-500)

		@include hover
			color: var(--color-primary-400)

		&-icon
			background-color: currentcolor

			@include icon('close')

	&__dropdown
		position: absolute
		top: calc(100% + rem(8))
		right: 0
		left: 0
		z-index: var(--z-index-dropdown)

		display: flex
		flex-direction: column

		max-height: rem(225)
		padding: fluid(4, 8) fluid(2, 4) fluid(4, 8) fluid(4, 8)

		border-radius: var(--radius-m)
		outline: none

		background: var(--color-neutral-100)

	&__tooltips
		display: flex
		flex-direction: column
		max-height: 100%
		padding-right: fluid(2, 4)
		overflow-y: scroll
		-webkit-overflow-scrolling: touch

		@include tiny-v-scroll

	&__tooltip
		display: flex
		align-items: center
		justify-content: flex-start
		padding: rem(6)
		border-radius: var(--radius-m)
		background-color: transparent
		cursor: pointer

		@include hover
			background-color: var(--color-primary-300)

		&.active
			background-color: var(--color-primary-300)

		&.disabled
			pointer-events: none
</style>
