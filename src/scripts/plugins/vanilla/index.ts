import calcAppProperties from '@scripts/plugins/vanilla/modules/calcProperties';
import initMediaAutoWrapper from '@scripts/plugins/vanilla/utils/mediaAutoWrapper';

export default function initVanillaModules() {
	initMediaAutoWrapper();
	calcAppProperties();
}
