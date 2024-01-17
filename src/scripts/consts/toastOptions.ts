import type { PluginOptions } from 'vue-toastification';
import { POSITION, TYPE } from 'vue-toastification';

const toastOptions: PluginOptions = {
	timeout: 5000,
	position: POSITION.BOTTOM_CENTER,
	hideProgressBar: true,
	draggablePercent: 0.3,
	draggable: false,
	closeOnClick: false,
	pauseOnHover: false,
	closeButton: 'span',
	toastClassName: 'toast',
	bodyClassName: 'toast__body',
	closeButtonClassName: 'toast__close',
	containerClassName: 'toast-container',
	toastDefaults: {
		[TYPE.ERROR]: {
			toastClassName: 'toast toast--error',
		},
		[TYPE.SUCCESS]: {
			toastClassName: 'toast toast--success',
		},
		[TYPE.INFO]: {
			toastClassName: 'toast toast--info',
		},
		[TYPE.WARNING]: {
			toastClassName: 'toast toast--warning',
		},
	},
};

export default toastOptions;
