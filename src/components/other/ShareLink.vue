<script lang="ts">
import { useBaseStore } from '@scripts/hooks/stateHooks/useBaseStore';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'ShareLink',
	mixins: [useBaseStore],
	computed: {
		link() {
			return window.location.href;
		},
	},
	methods: {
		copyLink(message: string) {
			navigator.clipboard.writeText(this.link);
			this.showSuccessMessage(message);
		},
	},
});
</script>

<template>
	<slot :copy-link="copyLink" />
</template>
