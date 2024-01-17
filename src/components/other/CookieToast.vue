<script lang="ts">
import { defineComponent } from 'vue';
import { checkDialogSupport } from '@scripts/mixins/checkDialogSupport';
import { useBaseStore } from '@scripts/hooks/stateHooks/useBaseStore';
import { setCookie } from '@scripts/utils/cookie';

export default defineComponent({
	name: 'CookieToast',
	mixins: [checkDialogSupport, useBaseStore],
	setup() {
		return {
			setCookie,
		};
	},
	data() {
		return {
			isOpened: false,
		};
	},
	mounted() {
		this.checkDialogSupport(this.$refs.modal as unknown as HTMLDialogElement);
		this.checkCookie();
	},
	methods: {
		checkCookie() {
			if (!this.isCookieConfirmed) {
				setTimeout(() => {
					this.showCookie();
				}, 2000);
			}
		},
		confirmCookie() {
			this.setCookie('cookieConfirmed', true, {
				path: '/',
				expires: new Date(Date.now() + 2592000000),
			});
			this.hideCookie();
		},
		showCookie() {
			this.isOpened = true;
		},
		hideCookie() {
			this.isOpened = false;
		},
	},
});
</script>

<template>
	<teleport to="#modals-container">
		<dialog class="cookie-toast-wrapper wrapper">
			<transition name="cookie" :duration="450" appear>
				<div
					v-if="isOpened"
					ref="modal"
					class="cookie-toast"
					:open="isOpened"
				>
					<div class="cookie-toast__body">
						<span class="cookie-toast__text">Мы используем куки, чтобы сделать сайт удобнее для вас</span>
						<button class="cookie-toast__btn btn btn--color-primary btn--size-medium" @click="confirmCookie">
							<span class="btn__text">Хорошо</span>
						</button>
					</div>
				</div>
			</transition>
		</dialog>
	</teleport>
</template>

<style scoped lang="sass">
.cookie-toast-wrapper
	position: fixed
	right: 0
	bottom: rem(40)
	left: 0
	z-index: calc(var(--z-index-modal) - 1)

	display: flex
	justify-content: center

	border: none
	background: none

	@include until-tablet
		bottom: rem(70)

	@include while-mob-xl
		width: 100%

.cookie-toast
	padding: rem(14)
	border: none
	border-radius: var(--radius-m)

	background-color: var(--color-neutral-100)

	@include while-mob-xl
		width: 100%

	&__body
		display: flex
		align-items: center
		justify-content: space-between
		gap: rem(14)

	&__text
		font-size: var(--fontSizeP2)
		line-height: var(--lineHeightP1)

		@include while-mob-xl
			max-width: rem(165)
			line-height: var(--lineHeightP2)

.cookie-enter-active,
.cookie-leave-active
	transition: opacity .3s ease, transform .3s ease

.cookie-enter-from,
.cookie-leave-to
	opacity: 0
	transform: translateY(8px)
</style>
