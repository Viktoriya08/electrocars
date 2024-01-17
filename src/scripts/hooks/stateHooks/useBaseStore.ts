import baseStore from '@scripts/store/base';
import { mapActions, mapState } from 'pinia';

export const useBaseStore = {
	computed: {
		...mapState(baseStore, {
			isAppLoading: 'isLoading',
			isActionPending: 'isActionPending',
			isCookieConfirmed: 'isCookieConfirmed',
		}),
	},
	methods: {
		...mapActions(baseStore, {
			startAppLoading: 'startLoading',
			stopAppLoading: 'stopLoading',
			showSuccessMessage: 'successMessage',
			showErrorMessage: 'errorMessage',
			showWarningMessage: 'warningMessage',
			showInfoMessage: 'infoMessage',
			showCustomMessage: 'customMessage',
		}),
	},
};
