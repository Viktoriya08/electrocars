import RootComponent from '@components/RootComponent.vue';
import registerPlugins from '@scripts/plugins/app';
import type { Component } from 'vue';
import { createApp, defineAsyncComponent, provide } from 'vue';

import { useBaseStore } from '@scripts/hooks/stateHooks/useBaseStore';
import { useModalsStore } from '@scripts/hooks/stateHooks/useModalsStore';
import { useTransitions } from '@scripts/hooks/useTransitions';
import { useViewportHandler } from '@scripts/hooks/useViewportHandler';

const APP_DATA: Component = {
	mixins: [useBaseStore, useTransitions, useModalsStore, useViewportHandler],
	setup() {
		const { isViewport, viewportUntil } = useViewportHandler();

		provide('isViewport', isViewport);
		provide('viewportUntil', viewportUntil);

		return {
			isViewport,
			viewportUntil,
		};
	},
};

const APP = createApp(APP_DATA);

APP.component('RootComponent', RootComponent)

	// BASE COMPONENTS
	.component(
		'BaseLoader',
		defineAsyncComponent(() => import('@components/utils/ui/BaseLoader.vue')),
	)
	.component(
		'BaseTabs',
		defineAsyncComponent(() => import('@components/utils/ui/BaseTabs.vue')),
	)
	.component(
		'BasePagination',
		defineAsyncComponent(() => import('@components/utils/ui/BasePagination.vue')),
	)
	.component(
		'BaseTooltip',
		defineAsyncComponent(() => import('@components/utils/ui/BaseTooltip.vue')),
	)
	.component(
		'BaseAccordion',
		defineAsyncComponent(() => import('@components/utils/ui/BaseAccordion.vue')),
	)
	.component(
		'BaseModal',
		defineAsyncComponent(() => import('@components/utils/modals/BaseModal.vue')),
	)
	.component(
		'BaseGallery',
		defineAsyncComponent(() => import('@components/utils/ui/BaseGallery.vue')),
	)
	.component(
		'BaseDropdown',
		defineAsyncComponent(() => import('@components/utils/ui/BaseDropdown.vue')),
	)

	// Form components
	.component(
		'InputText',
		defineAsyncComponent(() => import('@components/utils/form/InputText.vue')),
	)
	.component(
		'InputTextarea',
		defineAsyncComponent(() => import('@components/utils/form/InputTextarea.vue')),
	)
	.component(
		'InputCheckbox',
		defineAsyncComponent(() => import('@components/utils/form/InputCheckbox.vue')),
	)
	.component(
		'InputRadio',
		defineAsyncComponent(() => import('@components/utils/form/InputRadio.vue')),
	)
	.component(
		'InputSwitch',
		defineAsyncComponent(() => import('@components/utils/form/InputSwitch.vue')),
	)
	.component(
		'InputSearch',
		defineAsyncComponent(() => import('@components/utils/form/InputSearch.vue')),
	)
	.component(
		'InputOpenSearch',
		defineAsyncComponent(() => import('@components/utils/form/InputOpenSearch.vue')),
	)
	.component(
		'InputDate',
		defineAsyncComponent(() => import('@components/utils/form/InputDate.vue')),
	)
	.component(
		'InputFile',
		defineAsyncComponent(() => import('@components/utils/form/InputFile.vue')),
	)
	.component(
		'InputRange',
		defineAsyncComponent(() => import('@components/utils/form/InputRange.vue')),
	)

	// Select components
	.component(
		'ExampleSelect',
		defineAsyncComponent(() => import('@components/utils/form/selects/ExampleSelect.vue')),
	)
	.component(
		'CitySelect',
		defineAsyncComponent(() => import('@components/utils/form/selects/CitySelect.vue')),
	)
	.component(
		'EquipmentSelect',
		defineAsyncComponent(() => import('@components/utils/form/selects/EquipmentSelect.vue')),
	)

	// Catalog components
	.component(
		'ProductActions',
		defineAsyncComponent(() => import('@components/catalog/ProductActions.vue')),
	)
	.component(
		'CatalogFilter',
		defineAsyncComponent(() => import('@components/catalog/CatalogFilter.vue')),
	)

	// Slider components
	.component(
		'ContentSlider',
		defineAsyncComponent(() => import('@components/sliders/ContentSlider.vue')),
	)
	.component(
		'MainBanner',
		defineAsyncComponent(() => import('@components/sliders/MainBanner.vue')),
	)
	.component(
		'ProductsSlider',
		defineAsyncComponent(() => import('@components/sliders/ProductsSlider.vue')),
	)
	.component(
		'ReviewsSlider',
		defineAsyncComponent(() => import('@components/sliders/ReviewsSlider.vue')),
	)
	.component(
		'MediaSlider',
		defineAsyncComponent(() => import('@components/sliders/MediaSlider.vue')),
	)
	.component(
		'ProductColorSlider',
		defineAsyncComponent(() => import('@components/sliders/ProductColorSlider.vue')),
	)
	.component(
		'StorySlider',
		defineAsyncComponent(() => import('@components/sliders/StorySlider.vue')),
	)

	// Forms components
	.component(
		'FormExample',
		defineAsyncComponent(() => import('@components/forms/FormExample.vue')),
	)
	.component(
		'BenefitForm',
		defineAsyncComponent(() => import('@components/forms/BenefitForm.vue')),
	)
	.component(
		'FormTestDrive',
		defineAsyncComponent(() => import('@components/forms/FormTestDrive.vue')),
	)
	.component(
		'ApplicationForm',
		defineAsyncComponent(() => import('@components/forms/ApplicationForm.vue')),
	)
	.component(
		'ProductOrderForm',
		defineAsyncComponent(() => import('@components/forms/ProductOrderForm.vue')),
	)
	.component(
		'CallbackForm',
		defineAsyncComponent(() => import('@components/forms/CallbackForm.vue')),
	)

	// Templates components
	.component(
		'TabsTemplate',
		defineAsyncComponent(() => import('@components/utils/templates/TabsTemplate.vue')),
	)
	.component(
		'HeaderActions',
		defineAsyncComponent(() => import('@components/structural/HeaderActions.vue')),
	)
	.component(
		'SiteSearch',
		defineAsyncComponent(() => import('@components/structural/SiteSearch.vue')),
	)
	.component(
		'MobileHeader',
		defineAsyncComponent(() => import('@components/structural/MobileHeader.vue')),
	)

	// Modals components
	.component(
		'BurgerDropdown',
		defineAsyncComponent(() => import('@components/structural/BurgerDropdown.vue')),
	)
	.component(
		'CallbackModal',
		defineAsyncComponent(() => import('@components/modals/CallbackModal.vue')),
	)
	.component(
		'ReviewModal',
		defineAsyncComponent(() => import('@components/modals/ReviewModal.vue')),
	)
	.component(
		'FilterModal',
		defineAsyncComponent(() => import('@components/modals/FilterModal.vue')),
	)

	// Additional components
	.component(
		'CookieToast',
		defineAsyncComponent(() => import('@components/other/CookieToast.vue')),
	)
	.component(
		'ShareLink',
		defineAsyncComponent(() => import('@components/other/ShareLink.vue')),
	)
	.component(
		'VideoPlayer',
		defineAsyncComponent(() => import('@components/other/VideoPlayer.vue')),
	)
	.component(
		'StickyHeader',
		defineAsyncComponent(() => import('@components/other/StickyHeader.vue')),
	);

// Map component
// .component(
// 	'ChargingServiceMap',
// 	defineAsyncComponent(() => import('@components/map/ChargingServiceMap.vue')),
// );

registerPlugins(APP);

export default APP;
