<script lang="ts">
import CatalogFilter from "@components/catalog/CatalogFilter.vue";
import BaseModal from '@components/utils/modals/BaseModal.vue';
import { defineComponent, provide } from 'vue';

export default defineComponent({
	name: 'FilterModal',
	components: { CatalogFilter, BaseModal },
	setup() {
		provide('modalId', 'filter-modal');

		return {};
	},
});
</script>

<template>
	<BaseModal id="filter-modal" v-slot="{ close }" theme="filter">
		<section class="modal modal--filter">

			<div class="modal__wrapper">
				<button class="modal__back" @click="close">Назад</button>
				<div class="modal__top">
					<h3 class="modal__title">
						Параметры поиска
					</h3>
				</div>

				<CatalogFilter class="modal__form" />
			</div>
		</section>
	</BaseModal>
</template>

<style scoped lang="sass">


</style>
