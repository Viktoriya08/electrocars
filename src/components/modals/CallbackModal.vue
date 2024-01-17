<script lang="ts">
import CallbackForm from '@components/forms/CallbackForm.vue';
import BaseModal from '@components/utils/modals/BaseModal.vue';
import IconSVG from '@components/utils/templates/ui/IconSVG.vue';
import { defineComponent, provide } from 'vue';

export default defineComponent({
	name: 'CallbackModal',
	components: { CallbackForm, IconSVG, BaseModal },
	setup() {
		provide('modalId', 'callback-modal');

		return {};
	},
});
</script>

<template>
	<BaseModal id="callback-modal" v-slot="{ close }">
		<section class="modal">
			<button class="modal__close" @click="close">
				<IconSVG class="modal__close-icon" name="close" />
			</button>

			<div class="modal__wrapper">
				<div class="modal__top">
					<h3 class="modal__title">
						Отправьте заявку, и&nbsp;мы&nbsp;свяжемся с&nbsp;вами в&nbsp;ближайшее время
					</h3>
				</div>

				<CallbackForm class="modal__form" />
			</div>
		</section>
	</BaseModal>
</template>

<style scoped lang="sass">

</style>
