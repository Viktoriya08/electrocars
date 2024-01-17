<script lang="ts">
import IconSVG from '@components/utils/templates/ui/IconSVG.vue';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import { VueAwesomePaginate } from 'vue-awesome-paginate';

export default defineComponent({
	name: 'BasePagination',
	components: { IconSVG, VueAwesomePaginate },
	props: {
		modelValue: {
			type: Number,
			default: () => null,
		},
		total: {
			type: Number,
			required: true,
		},
		limit: {
			type: Number,
			default: () => 10,
		},
		maxButtons: {
			type: Number,
			default: () => 5,
		},
		type: {
			type: String as PropType<'button' | 'link'>,
			default: () => 'button',
		},
		hideButtons: {
			type: Boolean,
			default: () => false,
		},
		arrowsStyle: {
			type: String as PropType<'default' | 'simple' | 'small'>,
			default: () => 'default',
		},
		colorScheme: {
			type: String as PropType<'default' | 'light'>,
			default: () => 'default',
		},
	},
	emits: ['update:modelValue', 'change'],
	data() {
		return {
			activePage: 1,
		};
	},
	computed: {
		value: {
			get(): number {
				return this.modelValue ?? this.activePage;
			},
			set(value: number) {
				this.activePage = value;
				this.$emit('update:modelValue', value);
				this.$emit('change', value);
			},
		},
		getArrowIcons() {
			return (direction: 'left' | 'right') => {
				switch (this.arrowsStyle) {
					case 'default':
						return direction === 'left' ? 'arrow-left' : 'arrow-right';
					case 'simple':
						return direction === 'left' ? 'chevron-left' : 'chevron-right';
					case 'small':
						return direction === 'left' ? 'chevron-left-sm' : 'chevron-right-sm';
					default:
						return direction === 'left' ? 'arrow-left' : 'arrow-right';
				}
			};
		},
	},
});
</script>

<template>
	<VueAwesomePaginate
		v-model="value"
		:total-items="total"
		:items-per-page="limit"
		:show-ending-buttons="false"
		:max-pages-shown="maxButtons"
		:type="type"
		:hide-prev-next="hideButtons"
		pagination-container-class="pagination"
		:paginate-buttons-class="`pagination__button pagination__button--color-${colorScheme}`"
		disabled-paginate-buttons-class="disabled"
		number-buttons-class="pagination__button--number"
		active-page-class="active"
		back-button-class="pagination__button--back"
		next-button-class="pagination__button--next"
		last-button-class="pagination__button--number"
		first-button-class="pagination__button--number"
	>
		<template #prev-button>
			<IconSVG class="pagination__button-icon" :name="getArrowIcons('left')" />
		</template>
		<template #next-button>
			<IconSVG class="pagination__button-icon" :name="getArrowIcons('right')" />
		</template>
	</VueAwesomePaginate>
</template>

<style lang="sass">
@import 'vue-awesome-paginate/dist/style.css'

.pagination
	display: flex
	align-items: center
	justify-content: center

	&__button
		display: inline-flex
		align-items: center
		justify-content: center

		size: rem(44)

		border: 1px solid transparent
		border-radius: var(--radius-m)

		background-color: transparent

		transition: color .3s ease, background-color .3s ease, border-color .3s

		&:focus
			outline: none

		&:focus-visible
			outline-offset: 0
			outline-style: solid
			outline-width: 2px

		&.disabled,
		&:disabled
			pointer-events: none

		@include while-mob-xl
			gap: rem(6)
			size: rem(35)

		&--number
			font-size: var(--fontSizeP2)
			font-weight: 400
			line-height: var(--lineHeightP1)

			&.active
				&:focus-visible
					outline-width: 5px

		&--back,
		&--next
			padding: rem(4)

			&:focus-visible
				outline-offset: -4px

		&--color
			&-default

				&:focus-visible
					outline-color: var(--color-primary-trans-100)

				&.pagination__button
					&--number
						color: var(--color-neutral-900)

						@include hover
							border-color: var(--color-neutral-200)
							background-color: var(--color-primary-trans-100)

						&:active
							background-color: var(--color-primary-500)
							color: var(--color-neutral-100)

						&.disabled,
						&:disabled
							color: var(--color-neutral-500)

						&.active
							background-color: var(--color-neutral-200)
							cursor: auto

							&.disabled,
							&:disabled
								background-color: var(--color-neutral-300)

					&--back,
					&--next
						color: var(--color-primary-500)

						@include hover
							color: var(--color-primary-400)

						&:active
							color: var(--color-primary-600)

						&.disabled,
						&:disabled
							color: var(--color-neutral-500)

			&-light

				&:focus-visible
					outline-color: var(--color-transparent-20)

				&.pagination__button
					&--number
						color: var(--color-neutral-100)

						@include hover
							background-color: var(--color-transparent-10)

						&:active
							background-color: var(--color-neutral-100)
							color: var(--color-primary-500)

						&.disabled,
						&:disabled
							color: var(--color-transparent-50)

						&.active
							background-color: var(--color-neutral-100)
							color: var(--color-primary-500)

							@include hover
								background-color: var(--color-transparent-80)

							&.disabled,
							&:disabled
								background-color: var(--color-transparent-30)
								color: var(--color-primary-500)

					&--back,
					&--next
						color: var(--color-neutral-100)

						@include hover
							color: var(--color-transparent-50)

						&:active
							color: var(--color-transparent-80)

						&.disabled,
						&:disabled
							color: var(--color-transparent-30)

	&__button-icon
		display: block
		width: rem(12)
		height: rem(16)
</style>
