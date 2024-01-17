<script lang="ts">
import { defineComponent, provide } from 'vue';
import BaseModal from '@components/utils/modals/BaseModal.vue';
import IconSVG from '@components/utils/templates/ui/IconSVG.vue';
import ReviewForm from '@components/forms/ReviewForm.vue';

export default defineComponent({
	name: 'ReviewModal',
	components: { ReviewForm, IconSVG, BaseModal },
	setup() {
		provide('modalId', 'review-modal');

		return {};
	},
});
</script>

<template>
	<BaseModal id="review-modal" v-slot="{ close }">
		<section class="modal modal--wide">
			<button class="modal__close" @click="close">
				<IconSVG class="modal__close-icon" name="close" />
			</button>

			<div class="modal__wrapper">
				<div class="modal__top">
					<h3 class="modal__title">
						Поделитесь впечатлением<br>и&nbsp;опытом использования электрокара
					</h3>
					<p class="modal__subtitle">
						Мы свяжемся с вами для  уточнения, что отзыв оставили именно вы. Это займет не более 1 минуты.
					</p>
				</div>

				<ReviewForm class="modal__form" />
			</div>
		</section>
	</BaseModal>
</template>

<style scoped lang="sass">

</style>
