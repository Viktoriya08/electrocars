<script lang="ts">
import { defineComponent } from 'vue';
import BaseAccordion from '@components/utils/ui/BaseAccordion.vue';
import InputRange from '@components/utils/form/InputRange.vue';
import InputCheckbox from '@components/utils/form/InputCheckbox.vue';

export default defineComponent({
	name: 'CatalogFilter',
	components: { InputCheckbox, InputRange, BaseAccordion },
	// data() {
	// 	return {
	// 		price: [0, 100000000]
	// 	}
	// }
});
</script>

<template>
	<div class="catalog-filter">
		<div class="catalog-filter__items">
			<BaseAccordion class="catalog-filter__item" theme="simple">
				<template #title>
					Стоимость
				</template>
				<template #body>
					<InputRange :model-value="[2300000, 7000000]" :min="2000000" :max="10000000"  theme="mini"/>
				</template>
			</BaseAccordion>
			<BaseAccordion class="catalog-filter__item" theme="simple">
				<template #title>
					Марка
				</template>
				<template #body>
					<div class="catalog-filter__checkboxes">
						<InputCheckbox text="HiPhiX" />
						<InputCheckbox text="Li9" />
						<InputCheckbox text="Neta S" />
					</div>
				</template>
			</BaseAccordion>
			<BaseAccordion class="catalog-filter__item selected" theme="simple">
				<template #title>
					Кузов
				</template>
				<template #body>
					<div class="catalog-filter__checkboxes">
						<InputCheckbox :model-value="true" text="HiPhiX" />
						<InputCheckbox text="Li9" />
						<InputCheckbox text="Neta S" />
					</div>
				</template>
			</BaseAccordion>
			<BaseAccordion class="catalog-filter__item selected" theme="simple">
				<template #title>
					Мощность двигателя, л.с.
				</template>
				<template #body>
					<div class="catalog-filter__checkboxes">
						<InputCheckbox :model-value="true" text="HiPhiX" />
						<InputCheckbox text="Li9" />
						<InputCheckbox text="Neta S" />
					</div>
				</template>
			</BaseAccordion>
			<BaseAccordion class="catalog-filter__item selected" theme="simple">
				<template #title>
					Емкость батареи, кВт
				</template>
				<template #body>
					<div class="catalog-filter__checkboxes">
						<InputCheckbox :model-value="true" text="HiPhiX" />
						<InputCheckbox text="Li9" />
						<InputCheckbox text="Neta S" />
					</div>
				</template>
			</BaseAccordion>
			<BaseAccordion class="catalog-filter__item selected" theme="simple">
				<template #title>
					Запас хода, км
				</template>
				<template #body>
					<div class="catalog-filter__checkboxes">
						<InputCheckbox :model-value="true" text="HiPhiX" />
						<InputCheckbox text="Li9" />
						<InputCheckbox text="Neta S" />
					</div>
				</template>
			</BaseAccordion>
			<BaseAccordion class="catalog-filter__item selected" theme="simple">
				<template #title>
					Привод
				</template>
				<template #body>
					<div class="catalog-filter__checkboxes">
						<InputCheckbox :model-value="true" text="HiPhiX" />
						<InputCheckbox text="Li9" />
						<InputCheckbox text="Neta S" />
					</div>
				</template>
			</BaseAccordion>
			<BaseAccordion class="catalog-filter__item selected" theme="simple">
				<template #title>
					Разгон 0—100 км/ч
				</template>
				<template #body>
					<div class="catalog-filter__checkboxes">
						<InputCheckbox :model-value="true" text="HiPhiX" />
						<InputCheckbox text="Li9" />
						<InputCheckbox text="Neta S" />
					</div>
				</template>
			</BaseAccordion>
			<BaseAccordion class="catalog-filter__item selected" theme="simple">
				<template #title>
					Модельный год
				</template>
				<template #body>
					<div class="catalog-filter__checkboxes">
						<InputCheckbox :model-value="true" text="HiPhiX" />
						<InputCheckbox text="Li9" />
						<InputCheckbox text="Neta S" />
					</div>
				</template>
			</BaseAccordion>
			<BaseAccordion class="catalog-filter__item selected" theme="simple">
				<template #title>
					Цвет кузова
				</template>
				<template #body>
					<div class="catalog-filter__checkboxes">
						<InputCheckbox :model-value="true" text="HiPhiX" />
						<InputCheckbox text="Li9" />
						<InputCheckbox text="Neta S" />
					</div>
				</template>
			</BaseAccordion>
			<BaseAccordion class="catalog-filter__item selected" theme="simple">
				<template #title>
					Цвет салона
				</template>
				<template #body>
					<div class="catalog-filter__checkboxes">
						<InputCheckbox :model-value="true" text="HiPhiX" />
						<InputCheckbox text="Li9" />
						<InputCheckbox text="Neta S" />
					</div>
				</template>
			</BaseAccordion>
			<BaseAccordion class="catalog-filter__item selected" theme="simple">
				<template #title>
					Тип обивки салона
				</template>
				<template #body>
					<div class="catalog-filter__checkboxes">
						<InputCheckbox :model-value="true" text="HiPhiX" />
						<InputCheckbox text="Li9" />
						<InputCheckbox text="Neta S" />
					</div>
				</template>
			</BaseAccordion>
			<BaseAccordion class="catalog-filter__item selected" theme="simple">
				<template #title>
					Дополнительные опции
				</template>
				<template #body>
					<div class="catalog-filter__checkboxes">
						<InputCheckbox :model-value="true" text="HiPhiX" />
						<InputCheckbox text="Li9" />
						<InputCheckbox text="Neta S" />
					</div>
				</template>
			</BaseAccordion>
		</div>
		<div class="catalog-filter__bottom">
			<button class="btn btn--color-primary">
				<span class="btn__text">Меньше параметров</span>
			</button>
			<button class="btn btn--color-fourth">
				<span class="btn__text">Сбросить</span>
			</button>
		</div>
	</div>
</template>

<style scoped lang="sass">

</style>
