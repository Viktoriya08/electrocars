<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'HeaderActions',
	data() {
		return {
			searchShown: false,
		};
	},
	methods: {
		showSearch() {
			this.searchShown = true;
		},
		hideSearch() {
			this.searchShown = false;
		},
	},
});
</script>

<template>
	<slot :search-shown="searchShown" :hide-search="hideSearch" :show-search="showSearch" />
</template>

<style scoped lang="sass">

</style>
