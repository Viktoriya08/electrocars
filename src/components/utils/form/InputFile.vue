<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import type { ErrorObject } from '@vuelidate/core';
import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';
import type { IFileData } from '@scripts/mixins/getFileData';
import { getFileData } from '@scripts/mixins/getFileData';

export default defineComponent({
	name: 'InputFile',
	components: { InputTemplate },
	mixins: [getFileData],
	props: {
		modelValue: {
			type: [Array, FileList] as PropType<string[] | FileList>,
			default: () => null,
		},
		accept: {
			type: String,
			default: () => 'image/*',
		},
		id: {
			type: String,
			default: () => '',
		},
		multiple: {
			type: Boolean,
			default: false,
		},
		label: {
			type: String,
			default: () => '',
		},
		placeholder: {
			type: String,
			default: () => 'Прикрепить фото',
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
		name: {
			type: String,
			default: () => '',
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
	computed: {
		value: {
			get(): FileList | string[] {
				return this.modelValue;
			},
			set(value: FileList | string[]) {
				this.$emit('update:modelValue', value);
			},
		},
		valueWithData(): IFileData[] {
			if (!this.value)
				return [];

			if (this.value instanceof FileList) {
				return Array.from(this.value).map(file => ({
					...this.getFileData(file),
				}));
			}

			return this.value.map(file => ({
				...this.getFileData(file as File | string),
			}));
		},
	},
	methods: {
		changeHandler(e: Event) {
			const target: HTMLInputElement = e.target as HTMLInputElement;

			const files: File[] = target.files ? Array.from(target.files) : [];
			if (files.length === 0)
				return;

			const dt = new DataTransfer();
			files.forEach(file => dt.items.add(file));

			this.value = dt.files;
			target.value = '';
		},
		deleteFile(deletingFile: IFileData) {
			if (deletingFile.type === 'url') {
				this.value = (this.value as string[]).filter(item => item !== deletingFile.url);
				return;
			}

			const { name } = deletingFile;
			const files = Array.from(this.value as FileList).filter(file => file.name !== name);
			const dt = new DataTransfer();
			files.forEach(file => dt.items.add(file));

			this.value = dt.files;
		},
		simulateClick(): void {
			if (this.$refs.inputFile)
				(this.$refs.inputFile as HTMLInputElement).click();
		},
	},
});
</script>

<template>
	<InputTemplate :id="id" :label="label" tag="span" :errors="errors">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value="labelValue" />
		</template>

		<label
			tabindex="0"
			class="input-file"
			:class="[{ error: errors.length }, { disabled }, { readonly: readOnly }]"
			@keydown.enter="simulateClick"
		>
			<input
				:id="id"
				ref="inputFile"
				:multiple="multiple"
				:disabled="disabled || readOnly"
				:required="required"
				:title="title"
				:accept="accept"
				:name="name"
				type="file"
				class="input-file__input"
				@change="changeHandler"
			>
			<span class="input-file__placeholder">{{ placeholder }}</span>
		</label>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>

		<template #underInput>
			<div class="files-preview">
				<div
					v-for="file in valueWithData"
					:key="file.name"
					:title="file.name"
					class="files-preview__item file-preview"
				>
					<img v-if="file.isImage" class="file-preview__img" :src="file.url" :alt="file.name">
					<span v-if="file.ext" class="file-preview__ext">.{{ file.ext }}</span>
					<span
						v-if="!readOnly"
						aria-hidden="true"
						tabindex="0"
						role="button"
						class="file-preview__del"
						@click="deleteFile(file)"
						@keydown.enter="deleteFile(file)"
					>
						<span class="file-preview__del-icon" />
					</span>
				</div>
			</div>
		</template>
	</InputTemplate>
</template>

<style lang="sass">
.input-file
	--clip-icon-size: #{rem(20)}

	position: relative

	flex: 1 1 auto

	width: 100%
	min-height: calc(2 * var(--di-border-width) + var(--di-font-size) * var(--di-line-height) + 2 * var(--di-py))
	padding: var(--di-py) calc(var(--di-px) + var(--clip-icon-size) + var(--di-px) / 2) var(--di-py) var(--di-px)

	overflow: hidden

	border-width: var(--di-border-width)
	border-style: solid
	border-radius: var(--di-border-radius)
	border-color: var(--di-border-color)

	background-color: var(--color-neutral-100)

	color: var(--di-color)

	font-size: var(--di-font-size)
	line-height: var(--di-line-height)

	text-overflow: ellipsis
	white-space: nowrap

	transition: border-color .3s ease, background-color .3s ease

	&::after
		content: ''
		position: absolute
		top: 50%
		right: var(--di-px)

		display: inline-block

		size: var(--clip-icon-size)

		background-color: var(--di-border-color)
		mask-size: contain

		transform: translateY(-50%)
		transition: color .3s ease

		pointer-events: none

		@include icon('clip')

	&:focus
		outline: none

	&:focus-visible
		border-color: var(--di-border-color-active)

	@include hover
		border-color: var(--di-border-color-hover)

	&.disabled
		border-color: var(--di-border-color-disabled)
		background-color: var(--di-bg-disabled)
		color: var(--di-color-disabled)
		cursor: not-allowed

		&::after
			background-color: var(--di-border-color-disabled)

	&.readonly:not(.disabled)
		cursor: help

	&.error
		border-color: var(--di-border-color-error)
		color: var(--di-color-error)

		&::after
			background-color: var(--di-border-color-error)

	&__input
		position: absolute
		top: 0
		left: 0
		width: 0
		height: 0
		opacity: 0
		appearance: none

.files-preview
	display: grid
	grid-auto-rows: rem(80)
	grid-template-columns: repeat(auto-fill, rem(80))
	gap: rem(8)
	width: 100%

.file-preview
	position: relative
	z-index: 0

	display: flex
	align-items: flex-end
	justify-content: flex-end

	padding: rem(8)

	overflow: hidden

	border-radius: var(--radius-m)

	background-color: var(--color-neutral-200)

	&::before
		content: ''
		position: absolute
		top: 0
		left: 0
		z-index: -1

		display: block

		width: 100%
		height: 100%

		background-color: var(--color-transparent-50)

	&__img
		position: absolute
		top: 0
		left: 0
		z-index: -2
		width: 100%
		height: 100%
		object-fit: cover

	&__ext
		color: var(--color-neutral-900)
		font-size: var(--fontSizeP3)
		font-weight: 700
		line-height: 1
		text-transform: uppercase
		user-select: none

	&__del
		position: absolute
		top: 50%
		right: 50%

		display: flex
		align-items: center
		justify-content: center

		size: rem(28)

		border-radius: var(--radius-m)

		background-color: var(--color-neutral-100)

		color: var(--color-primary-500)

		transform: translate(50%, -50%)
		transition: color .3s ease, background-color .3s ease

		cursor: pointer

		&:focus
			outline: none
			background-color: var(--color-primary-500)
			color: var(--color-neutral-100)

		@include hover
			background-color: var(--color-primary-500)
			color: var(--color-neutral-100)

		&-icon
			display: inline-block
			size: 75%
			background-color: currentcolor
			mask-position: center
			mask-size: contain

			@include icon('close')
</style>
