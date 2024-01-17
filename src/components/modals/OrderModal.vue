<script lang="ts">
import { defineComponent, provide } from 'vue';
import BaseModal from '@components/utils/modals/BaseModal.vue';
import IconSVG from '@components/utils/templates/ui/IconSVG.vue';
import OrderForm from '@components/forms/OrderForm.vue';

export default defineComponent({
	name: 'OrderModal',
	components: { OrderForm, IconSVG, BaseModal },
	props: {
		modalId: {
			type: String,
			required: true,
			default: '',
		},
		carId: {
			type: Number,
			required: true,
			default: null,
		},
	},
	setup(props) {
		provide('modalId', props.modalId);

		return {};
	},
});
</script>

<template>
	<BaseModal :id="modalId" v-slot="{ close }">
		<section class="modal">
			<button class="modal__close" @click="close">
				<IconSVG class="modal__close-icon" name="close" />
			</button>

			<div class="modal__wrapper">
				<div class="modal__top">
					<h3 class="modal__title">
						Отправьте заявку на&nbsp;покупку
						электромобиля. Мы свяжемся
						с&nbsp;вами в&nbsp;ближайшее время.
					</h3>
				</div>

				<OrderForm :car-id="carId" class="modal__form" />
			</div>
		</section>
	</BaseModal>
</template>

<style scoped lang="sass">

</style>
