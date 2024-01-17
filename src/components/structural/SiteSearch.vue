<script lang="ts">
import InputOpenSearch from '@components/utils/form/InputOpenSearch.vue';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'SiteSearch',
	components: { InputOpenSearch },
	props: {
		label: {
			type: String,
			default: () => '',
		},
	},
	emits: ['clear', 'search'],

});
</script>

<template>
	<InputOpenSearch :label="label" @clear="$emit('clear')" @search="$emit('search', $event)" />
</template>

<style scoped lang="sass">

</style>
