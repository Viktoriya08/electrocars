<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import BaseModal from '@components/utils/modals/BaseModal.vue';
import IconSVG from '@components/utils/templates/ui/IconSVG.vue';
import InputCheckbox from '@components/utils/form/InputCheckbox.vue';
import type { ProductOffer } from '@components/catalog/ProductActions.vue';
import BaseTooltip from '@components/utils/ui/BaseTooltip.vue';

export default defineComponent({
	name: 'AddCompareModal',
	components: { BaseTooltip, InputCheckbox, IconSVG, BaseModal },
	props: {
		modalId: {
			type: String,
			required: true,
			default: '',
		},
		offers: {
			type: Array as PropType<ProductOffer[]>,
			required: true,
			default: () => [],
		},
	},
	data() {
		return {
			formData: {
				selectedItems: [] as number[],
			},
		};
	},
	computed: {
		isChecked() {
			return (id: number) => this.formData.selectedItems.includes(id);
		},
		isDisabled() {
			return (id: number) => this.formData.selectedItems.length >= 3 && !this.isChecked(id);
		},
	},
	methods: {
		setValue(val: boolean, offerId: number) {
			if (val)
				this.formData.selectedItems.push(offerId);
			else
				this.formData.selectedItems = this.formData.selectedItems.filter(id => id !== offerId);
		},
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
						Выберите комплектацию<br>
						для сравнения
					</h3>
				</div>

				<form class="modal__form form">
					<div class="form__items">
						<div v-for="offer in offers" :key="offer.id" class="form__item form__item--checkbox">
							<BaseTooltip v-if="isDisabled(offer.id)" placement="bottom">
								<InputCheckbox
									:id="`offer-${offer.id}`"
									:model-value="isChecked(offer.id)"
									:text="offer.name"
									:disabled="true"
									@update:model-value="setValue($event, offer.id)"
								/>
								<template #tooltip>
									<span>Добавлено максимальное кол-во электрокаров для сравнения</span>
								</template>
							</BaseTooltip>
							<InputCheckbox
								v-else
								:id="`offer-${offer.id}`"
								:model-value="isChecked(offer.id)"
								:text="offer.name"
								:disabled="isDisabled(offer.id)"
								@update:model-value="setValue($event, offer.id)"
							/>
						</div>
					</div>

					<div class="form__bottom">
						<div class="form__submit">
							<button class="btn btn--color-primary" type="submit">
								Выбрать
							</button>
						</div>
					</div>
				</form>
			</div>
		</section>
	</BaseModal>
</template>

<style scoped lang="sass">

</style>
