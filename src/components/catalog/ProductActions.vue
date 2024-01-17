<script lang="ts">
import OrderModal from '@components/modals/OrderModal.vue';
import IconSVG from '@components/utils/templates/ui/IconSVG.vue';
import BaseTooltip from '@components/utils/ui/BaseTooltip.vue';
import { useBaseStore } from '@scripts/hooks/stateHooks/useBaseStore';
import { useModalsStore } from '@scripts/hooks/stateHooks/useModalsStore';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import AddCompareModal from '@components/modals/AddCompareModal.vue';

export interface ProductOffer {
	[x: string]: any
	id: number
	name: string
};

interface Product {
	id: number
	name: string
	disabled: boolean
	offers?: ProductOffer[]
};

// Логики в компоненте нет, сейчас это просто заглушки для показа состояний!

export default defineComponent({
	name: 'ProductActions',
	components: { AddCompareModal, BaseTooltip, OrderModal, IconSVG },
	mixins: [useModalsStore, useBaseStore],
	props: {
		productData: {
			type: Object as PropType<Product>,
			default: () => ({
				id: Math.round(Math.random() * 1000),
				name: '',
			}),
		},
	},
	methods: {
		addToCompare() {
			this.showCustomMessage('Электрокар добавлен\nк сравнению', { icon: {
				iconClass: 'toast__icon toast__icon--compare',
				iconTag: 'span',
			} });
		},
	},
});
</script>

<template>
	<div class="product-card__actions">
		<button v-if="productData.offers && productData.offers.length" class="icon-btn icon-btn--color-secondary product-card__action" @click="openModal(`compare-modal-${productData.id}`)">
			<IconSVG class="icon-btn__icon" name="compare" />
		</button>
		<BaseTooltip v-else-if="productData.offers && !productData.offers.length" class="product-card__action" show-on-click placement="bottom">
			<button class="icon-btn icon-btn--color-secondary">
				<IconSVG class="icon-btn__icon" name="compare" />
			</button>
			<template #tooltip>
				<span>Добавлено максимальное кол-во электрокаров для сравнения</span>
			</template>
		</BaseTooltip>
		<button v-else class="icon-btn icon-btn--color-secondary product-card__action" @click="addToCompare">
			<IconSVG class="icon-btn__icon" name="compare" />
		</button>

		<button class="product-card__action btn btn--size-medium btn--color-primary" @click="openModal(`order-modal-${productData.id}`)">
			<span class="btn__text">Отправить заявку</span>
		</button>

		<OrderModal :modal-id="`order-modal-${productData.id}`" :car-id="productData.id" />
		<AddCompareModal v-if="productData.offers && productData.offers.length" :offers="productData.offers" :modal-id="`compare-modal-${productData.id}`" />
	</div>
</template>

<style scoped lang="sass">

</style>
