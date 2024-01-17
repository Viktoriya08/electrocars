<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, inject } from 'vue';
import type { ViewportNames } from '@scripts/hooks/useViewportHandler/types';
import IconSVG from '@components/utils/templates/ui/IconSVG.vue';

export default defineComponent({
	name: 'BaseDropdown',
	components: { IconSVG },
	props: {
		showOnClick: {
			type: Boolean,
			default: false,
		},
		rtl: {
			type: Boolean,
			default: false,
		},
		colorScheme: {
			type: String as PropType<'default' | 'bordered'>,
			default: () => 'default',
		},
		isFixed: {
			type: Boolean,
			default: false,
		},
	},
	setup() {
		const viewportUntil = inject('viewportUntil') as (viewportName: ViewportNames) => boolean;
		return {
			viewportUntil,
		};
	},
	data() {
		return {
			dropdownWillHide: false,
			dropdownHideTimeout: null as number | null,
			dropdownShown: false,
			position: {},
		};
	},
	computed: {
		showEvents() {
			if (this.showOnClick)
				return 'click';

			return 'mouseenter';
		},
		hideEvents() {
			if (this.showOnClick)
				return '';

			return 'mouseleave';
		},
	},
	methods: {
		showDropdown() {
			if (this.dropdownShown) {
				this.dropdownWillHide = false;
				return;
			}

			this.getPosition();

			if (this.isFixed)
				window.addEventListener('scroll', this.getPosition);

			this.dropdownShown = true;
		},
		startHidingDropdown() {
			this.dropdownWillHide = true;

			if (this.dropdownHideTimeout)
				clearTimeout(this.dropdownHideTimeout);

			this.dropdownHideTimeout = setTimeout(() => {
				if (this.dropdownWillHide)
					this.hideDropdown();
			}, 500);
		},
		getPosition() {
			if (!this.isFixed)
				this.position = {};

			const bodyRect = this.$refs.element as HTMLElement;

			if (!bodyRect)
				this.position = {};

			const bodyRectCoords = bodyRect.getBoundingClientRect();

			const top = this.isFixed ? bodyRectCoords.top + bodyRectCoords.height + 8 : bodyRectCoords.height + 8;

			const left = this.isFixed ? bodyRectCoords.left : 0;
			const right = this.isFixed ? window.innerWidth - bodyRectCoords.right : 0;

			this.position = this.viewportUntil('mobile-xl')
				? {}
				: {
						top: `${top}px`,
						position: this.isFixed ? `fixed` : 'absolute',
						...(bodyRectCoords.left > window.innerWidth / 2 ? { right: `${right}px` } : { left: `${left}px` }),
					};
		},
		hideDropdown() {
			this.dropdownWillHide = false;
			this.dropdownShown = false;

			if (this.isFixed)
				window.removeEventListener('scroll', this.getPosition);
		},
		mobileClickHandler() {
			if (this.viewportUntil('mobile-xl'))
				this.hideDropdown();
		},
	},
});
</script>

<template>
	<div
		ref="element"
		v-click-outside="hideDropdown"
		class="dropdown"
		:class="[{ active: dropdownShown }, `dropdown--${colorScheme}`, { 'dropdown--rtl': rtl }]"
		@[showEvents]="showDropdown"
		@[hideEvents]="startHidingDropdown"
	>
		<div class="dropdown__trigger">
			<slot :dropdown-shown="dropdownShown">
				<span class="dropdown__trigger-text">
					<slot name="trigger-text" />
				</span>
				<IconSVG name="chevron-down" class="dropdown__icon" />
			</slot>
		</div>
		<transition name="dropdown">
			<div v-show="dropdownShown" class="dropdown__body" :style="position" @click.self.stop="mobileClickHandler">
				<div class="dropdown__content">
					<slot name="dropdown" />
				</div>
			</div>
		</transition>
	</div>
</template>

<style lang="sass">
.dropdown
	position: relative

	&.active
		& .dropdown
			&__icon
				transform: rotate(180deg)

			&__trigger
				@include while-mob-xl
					z-index: var(--z-index-below)

	&__body
		position: absolute
		top: calc(100% + rem(8))
		z-index: var(--z-index-dropdown)

		width: 100vw
		max-width: rem(286)

		padding: rem(8) rem(4) rem(8) rem(8)

		border: 1px solid var(--color-neutral-200)
		border-radius: var(--radius-m)

		background: var(--color-neutral-100)

		&::before
			content: ''

			position: fixed
			top: 0
			left: 0
			z-index: var(--z-index-below)

			width: 100%
			height: 100%

			background-color: var(--color-blackout)

			@include from-mob-xl
				content: unset

		@include while-mob-xl
			position: fixed
			top: auto
			bottom: 0
			left: 0
			z-index: var(--z-index-modal)

			display: flex
			flex-direction: column
			justify-content: flex-end

			width: 100%
			max-width: unset
			height: 100%

			padding: 0

			border: none

			border-radius: 0
			background: none

	&__trigger
		display: flex
		align-items: center
		gap: fluid(2, 4)
		cursor: pointer

		&-text
			font-size: var(--fontSizeP2)
			font-weight: 400
			line-height: 1

	&__content
		max-height: rem(320)
		overflow-y: auto

		@include tiny-v-scroll

		@include while-mob-xl
			max-height: 80%
			padding: rem(8) rem(8) rem(14)
			border-radius: var(--radius-m) var(--radius-m) 0 0
			background: var(--color-neutral-100)

	&__items
		display: flex
		flex-direction: column
		gap: 0

	&__item
		display: flex
		align-items: center
		justify-content: flex-start

		padding: rem(6) rem(8)

		border-radius: var(--radius-m)
		background-color: transparent

		color: var(--color-primary-500)

		text-decoration: none

		@include hover
			background-color: var(--color-primary-300)

		&.active
			background-color: var(--color-primary-300)

		&.disabled
			pointer-events: none

	&__icon
		size: fluid(12, 14)
		transition: transform .3s ease

	&--rtl
		& .dropdown
			&__body
				right: 0
				left: unset

.dropdown-enter-active,
.dropdown-leave-active
	transition: opacity .3s ease, transform .3s ease

	@include while-mob-xl
		&::before
			transition: opacity .3s ease

.dropdown-enter-from,
.dropdown-leave-to
	opacity: 0
	transform: translateY(-8px)

	@include while-mob-xl
		transform: translateY(8px)

		&::before
			opacity: 0
</style>
