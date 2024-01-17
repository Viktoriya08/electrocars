export const checkDialogSupport = {
	methods: {
		checkDialogSupport(element: HTMLDialogElement) {
			if (window.HTMLDialogElement)
				return;

			import('dialog-polyfill').then(({ default: polyfill }) => {
				polyfill.registerDialog(element);
			});
		},
	},
};
