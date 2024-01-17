<script lang="ts">
import IconSVG from '@components/utils/templates/ui/IconSVG.vue';
import { VIEWPORT_SIZES } from '@scripts/consts/utils';
import type { ViewportNames } from '@scripts/hooks/useViewportHandler/types';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'BaseAccordion',
	components: { IconSVG },
	props: {
		disabled: {
			type: Boolean,
			default: false,
		},
		mediaUntil: {
			type: String as PropType<'none' | ViewportNames>,
			default: 'none',
		},
		pointerSide: {
			type: String as PropType<'ltl' | 'rtl'>,
			default: 'rtl',
		},
		theme: {
			type: String as PropType<'default' | 'secondary' | 'backdrop' | 'simple'>,
			default: 'default',
		},
	},
	data() {
		return {
			isOpen: false,
			isMediaUntil: false,
			scrollHeight: '0px',
			transitionDuration: '0.3s',
		};
	},
	mounted() {
		if (this.mediaUntil !== 'none')
			this.handleMediaUntil() && window.addEventListener('resize', this.handleMediaUntil);
	},
	unmounted() {
		if (this.mediaUntil !== 'none')
			window.removeEventListener('resize', this.handleMediaUntil);
	},
	methods: {
		toggleDropdown() {
			if (this.disabled || this.isMediaUntil)
				return;

			if (this.isOpen)
				this.calculateSizes(this.$refs.dropdown as Element);

			this.isOpen = !this.isOpen;
		},
		calculateSizes(el: Element): void {
			this.scrollHeight = `${el.scrollHeight}px`;
			this.transitionDuration = `${Math.max(0.3, Math.min(1.5, el.scrollHeight / 1000))}s`;
		},
		handleMediaUntil() {
			if (this.mediaUntil === 'none')
				return;

			if (window.innerWidth <= VIEWPORT_SIZES[this.mediaUntil]) {
				this.isMediaUntil = true;
				return this.isOpen = true;
			}

			this.isMediaUntil = false;
			return this.isOpen = false;
		},
	},
});
</script>

<template>
	<div
		:class="[
			{ disabled },
			{ active: isOpen },
			`accordion--${theme}`,
			`accordion--${pointerSide}`,
		]"
		class="accordion"
	>
		<div class="accordion__header" @click="toggleDropdown">
			<p class="accordion__title">
				<slot name="title" />
			</p>
			<button v-show="!isMediaUntil" :disabled="disabled" class="accordion__icon">
				<slot name="icon">
					<IconSVG v-if="theme === 'simple'" class="accordion__icon-image" name="chevron-down" />
					<IconSVG v-else :name="isOpen ? 'minus' : 'plus'" class="accordion__icon-image" />
				</slot>
			</button>
		</div>
		<Transition name="accordion" @enter="calculateSizes">
			<div
				v-show="isOpen"
				ref="dropdown"
				:style="`--accordion-dropdown-height: ${scrollHeight}; --accordion-dropdown-transition-duration: ${transitionDuration}`"
				class="accordion__dropdown"
			>
				<div class="accordion__body">
					<slot name="body" />
				</div>
			</div>
		</Transition>
	</div>
</template>

<style lang="sass" scoped>
.accordion
	--accordion-px: 0
	--accordion-py: #{rem(14)}
	--accordion-bg: transparent
	--accordion-bg-hover: transparent
	--accordion-active-bg: transparent
	--accordion-bg-disabled: transparent
	--accordion-border: #D1D6DD
	--accordion-border-radius: 0
	--accordion-header-cursor: pointer
	--accordion-title-size: #{fluid(16, 24)}
	--accordion-title-line-height: var(--lineHeightH2)
	--accordion-title-color: inherit
	--accordion-title-color-hover: inherit
	--accordion-title-color-disabled: var(--color-neutral-400)
	--accordion-icon-size: #{fluid(32, 44)}
	--accordion-icon-gap: #{fluid(14, 24)}
	--accordion-icon-color: var(--color-white)
	--accordion-icon-color-hover: var(--color-white)
	--accordion-icon-color-disabled: var(--color-neutral-300)
	--accordion-icon-color-active: var(--color-primary-600)
	--accordion-icon-background: var(--color-primary-500)
	--accordion-icon-background-hover: var(--color-primary-600)
	--accordion-icon-background-active: var(--color-white)
	--accordion-icon-background-disabled: var(--color-neutral-200)
	--accordion-icon-line-color: var(--color-white)
	--accordion-icon-line-size: 1px
	--accordion-icon-line-offset: #{rem(2)}
	--accordion-dropdown-height: 0
	--accordion-dropdown-gap: #{fluid(14, 40)}
	--accordion-dropdown-px: 0
	--accordion-dropdown-py: 0
	--accordion-dropdown-transition-duration: 0.3s

	padding: var(--accordion-py) var(--accordion-px) fluid(14,60)
	border-top: 1px solid var(--accordion-border)
	border-bottom: 1px solid var(--accordion-border)
	border-radius: var(--accordion-border-radius)
	background-color: var(--accordion-bg)
	transition: background-color .3s ease

	&.disabled
		--accordion-bg: var(--accordion-bg-disabled)
		--accordion-header-cursor: not-allowed
		--accordion-title-color: var(--accordion-title-color-disabled)
		--accordion-icon-color: var(--accordion-icon-color-disabled)
		--accordion-icon-background: var(--accordion-icon-background-disabled)

	&.active
		--accordion-bg: var(--accordion-active-bg)
		--accordion-icon-color: var(--accordion-icon-color-active)
		--accordion-icon-background: var(--accordion-icon-background-active)

		.accordion__icon
			&:focus-within
				background-color: var(--color-white)
				color: var(--color-primary-600)

	&__header
		display: flex
		justify-content: space-between
		gap: var(--accordion-icon-gap)
		cursor: var(--accordion-header-cursor)

		&:focus-within
			--accordion-icon-background: var(--accordion-icon-background-hover)

	&__title
		flex: 1 1 auto
		align-self: center
		color: var(--accordion-title-color)
		font-size: var(--accordion-title-size)
		font-weight: 500
		line-height: var(--accordion-title-line-height)

	&__icon
		display: flex
		flex-shrink: 0
		align-items: center
		justify-content: center

		size: var(--accordion-icon-size)

		border: 0
		border-radius: 50%

		background-color: var(--accordion-icon-background)

		color: var(--accordion-icon-color)

		transition: color .3s ease, background-color .3s ease, transform .3s ease

		&:focus-visible
			outline: none

		@include hover
			background-color: var(--accordion-icon-background-hover)
			color: var(--accordion-icon-color-hover)

		&:disabled
			pointer-events: none

		&-image
			size: 60%

	&__body
		padding-top: var(--accordion-dropdown-gap)

	&__dropdown
		will-change: height

	&--secondary
		--accordion-px: #{rem(16)}
		--accordion-py: #{rem(24)}
		--accordion-active-bg: var(--color-primary-300)
		--accordion-border-radius: var(--radius-xl)
		--accordion-dropdown-py: #{rem(16)}

	&--backdrop
		--accordion-px: #{rem(24)}
		--accordion-py: #{rem(24)}
		--accordion-bg: var(--color-neutral-100)
		--accordion-bg-hover: var(--color-primary-trans-100)
		--accordion-bg-disabled: var(--color-transparent-30)
		--accordion-active-bg: var(--color-primary-300)
		--accordion-border-radius: var(--radius-xl)
		--accordion-icon-background: var(--color-neutral-200)
		--accordion-dropdown-py: #{rem(16)}

		&:focus-within
			--accordion-bg: var(--accordion-bg-hover)
			--accordion-icon-background: var(--accordion-icon-background-hover)

	&--simple
		--accordion-py: #{fluid(24, 40)}
		--accordion-px: #{rem(0)}
		--accordion-dropdown-gap: #{fluid(14, 24)}
		--accordion-title-size: var(--fontSizeP2)
		--accordion-title-line-height: var(--lineHeightP2)
		--accordion-title-color: var(--color-neutral-300)
		--accordion-icon-size: #{fluid(12, 14)}
		--accordion-icon-background: transparent
		--accordion-icon-background-hover: transparent
		--accordion-icon-background-active: transparent
		--accordion-icon-background-disabled: transparent
		--accordion-icon-color: var(--color-primary-500)
		--accordion-icon-color-hover: var(--color-primary-500)
		--accordion-icon-color-disabled: var(--color-neutral-300)
		--accordion-icon-color-active: var(--color-primary-500)

		padding: 0 var(--accordion-px) var(--accordion-py)
		border-top: none

		&.active
			& .accordion
				&__icon
					transform: rotate(180deg)

		& .accordion
			&__title
				text-transform: uppercase

			&__icon
				&-image
					size: 100%

	&--ltl
		& .accordion
			&__header
				flex-direction: row-reverse

			&__body
				padding: var(--accordion-dropdown-gap, var(--accordion-dropdown-py)) var(--accordion-dropdown-px) var(--accordion-dropdown-py) calc(var(--accordion-dropdown-px) + var(--accordion-icon-size) + var(--accordion-icon-gap))

	&:not(:last-child)
		margin-bottom: -1px

	&:not(.active)
		&:not(.accordion--simple)
			.accordion__icon
				&:focus-within
					background-color: var(--color-primary-500)
					color: var(--color-white)

.accordion-enter-active,
.accordion-leave-active
	overflow: hidden
	transition: height var(--accordion-dropdown-transition-duration) ease

.accordion-enter-to,
.accordion-leave-from
	height: var(--accordion-dropdown-height)

.accordion-enter-from,
.accordion-leave-to
	height: 0
</style>
