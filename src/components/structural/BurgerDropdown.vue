<script lang="ts">
import IconSVG from '@components/utils/templates/ui/IconSVG.vue';
import FadeTransition from '@components/utils/transitions/FadeTransition.vue';
import { useModalsStore } from '@scripts/hooks/stateHooks/useModalsStore';
import type { ViewportNames } from '@scripts/hooks/useViewportHandler/types';
import { defineComponent, inject } from 'vue';

export default defineComponent({
	name: 'BurgerDropdown',
	components: { IconSVG, FadeTransition },
	mixins: [useModalsStore],
	props: {
		id: {
			type: String,
			default: 'burger-menu',
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
		};
	},
	computed: {
		isOpened() {
			return this.isModalOpened(this.id);
		},
	},
	mounted() {
		try {
			this.registerModal(this.id);
		}
		catch (error) {
			console.error(error);
		}
	},
	unmounted() {
		try {
			this.unregisterModal(this.id);
		}
		catch (error) {
			console.error(error);
		}
	},
	methods: {
		showDropdown() {
			this.openModal(this.id);
		},
		hideDropdown() {
			this.closeModal(this.id);
		},
		toggleDropdown() {
			if (this.isOpened)
				this.hideDropdown();
			else
				this.showDropdown();
		},
	},
});
</script>

<template>
	<div class="burger-menu" :class="[{ active: isOpened }]">
		<teleport to="#modals-container">
			<FadeTransition appear>
				<div v-if="isOpened" class="burger-menu__blackout" @click="hideDropdown" />
			</FadeTransition>
		</teleport>

		<div ref="trigger" class="burger-menu__trigger">
			<button class="icon-btn icon-btn--color-primary" @click="toggleDropdown">
				<IconSVG :name="isOpened ? 'close' : `${viewportUntil('tablet') ? 'menu-mob' : 'menu'}`" class="icon-btn__icon" />
			</button>
		</div>

		<transition name="burger-menu" :duration="450" appear>
			<div v-if="isOpened" ref="dropdown" class="burger-menu__body" @click.self="toggleDropdown">
				<div class="burger-menu__content">
					<slot />

					<div v-if="viewportUntil('tablet')" class="burger-menu__bottom">
						<button class="icon-btn icon-btn--color-primary" @click="hideDropdown">
							<IconSVG name="close" class="icon-btn__icon" />
						</button>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<style lang="sass">
.burger-menu
	position: relative
	z-index: var(--z-index-dropdown)

	@include until-tablet
		position: static

	&__blackout
		position: fixed
		inset: 0
		z-index: calc(var(--z-index-header) - 1)
		background-color: var(--color-blackout)

	&__body
		position: absolute
		top: calc(100% + rem(26))
		right: 0
		width: 100vw

		max-width: rem(469)

		@include until-tablet
			top: unset
			bottom: 0
			width: 100%
			max-width: unset

	&__content
		padding: fluid(14, 24)
		border-radius: var(--radius-m)
		background: var(--color-neutral-100)

		@include until-tablet
			padding: fluid(14, 24) fluid(14, 24) fluid(2, 6)

	&__top
		display: flex
		align-items: center
		justify-content: space-between
		gap: fluid(14, 24)

	&__search
		width: 100%
		margin-bottom: rem(13)

	&__links
		display: flex
		flex-direction: column
		gap: fluid(12, 24)

		& .count
			margin-left: auto
			font-size: rem(16)

		&--sm
			gap: fluid(14, 12)

		&:not(:first-child)
			padding-top: fluid(14, 24)
			border-top: 1px solid var(--color-neutral-200)

		&:not(:last-child)
			margin-bottom: fluid(14, 24)

	&__bottom
		display: flex
		align-items: center
		justify-content: center
		gap: fluid(14, 24)
		padding-top: rem(2)
		border-top: 1px solid var(--color-neutral-200)

		@include from-tablet
			display: none

.burger-menu-enter-active,
.burger-menu-leave-active
	transition: opacity .3s ease, transform .3s ease

.burger-menu-enter-from,
.burger-menu-leave-to
	opacity: 0
	transform: translateY(-8px)

	@include until-tablet
		transform: translateY(8px)
</style>
