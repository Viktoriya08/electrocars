import type { MaskType } from '@scripts/consts/masks';
import { decimalMask, integerMask, phoneMask } from '@scripts/consts/masks';

export const getMask = {
	computed: {
		getMask() {
			return (maskName: MaskType) => {
				switch (maskName) {
					case 'phoneMask':
						return phoneMask;
					case 'decimalMask':
						return decimalMask;
					case 'integerMask':
						return integerMask;
					default:
						return null;
				}
			};
		},
	},
};
