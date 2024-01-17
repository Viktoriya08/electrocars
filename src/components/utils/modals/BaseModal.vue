<script lang="ts">
import { useModalsStore } from '@scripts/hooks/stateHooks/useModalsStore';
import '@styles/modals/_index.sass';
import { defineComponent } from 'vue';
import { checkDialogSupport } from '@scripts/mixins/checkDialogSupport';
import {PropType} from "vue/dist/vue";

export default defineComponent({
	name: 'BaseModal',
	mixins: [useModalsStore, checkDialogSupport],
	props: {
		id: {
			type: String,
			required: true,
		},
		theme: {
			type: String as PropType<'default' | 'filter'>,
			default: 'default',
		},
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

		this.checkDialogSupport(this.$refs.modal as unknown as HTMLDialogElement);
	},
	methods: {
		showModal() {
			this.openModal(this.id);
		},
		hideModal() {
			this.closeModal(this.id);
		},
	},
});
</script>

<template>
	<teleport to="#modals-container">
		<Transition name="modal" :duration="450" appear>
			<dialog
				v-if="isOpened"
				ref="modal"
				class="modal-window"
				:open="isOpened"
				@keydown.esc="hideModal"
			>
				<div class="modal-window__bg" />

				<div class="modal-window__body wrapper" :class="[`modal-window__body--${theme}`]" @click.self="hideModal">
					<slot :close="hideModal" />
				</div>
			</dialog>
		</Transition>
	</teleport>
</template>

<style scoped lang="sass">
.modal-window
	position: fixed
	top: 0
	left: 0
	z-index: 1000

	width: 100%
	height: 100%

	border: none

	background: transparent

	&__body
		position: relative
		z-index: 1

		display: flex
		flex-direction: column
		align-items: center

		width: 100%
		height: 100%

		padding-top: rem(20)
		padding-bottom: rem(20)

		overflow-x: hidden
		overflow-y: auto

		@include hide-scroll

		@include while-mob-xl
			align-items: flex-end
			padding: rem(40) 0 0

		&--filter
			padding: 0

			@include while-mob-xl
				padding: 0

	&__bg
		position: absolute
		inset: 0
		z-index: -1
		width: 100%
		height: 100%
		background: var(--color-blackout)
		pointer-events: none

.modal-enter-active
	& .modal-window
		&__bg
			transition: opacity .3s ease

		&__body
			transition: transform .3s ease .15s, opacity .3s ease .15s

.modal-leave-active
	& .modal-window
		&__bg
			transition: opacity .3s ease .15s

		&__body
			transition: transform .3s ease, opacity .3s ease

.modal-enter-from, .modal-leave-to
	& .modal-window
		&__bg
			opacity: 0

		&__body
			opacity: 0
			transform: translateY(25px)
</style>
