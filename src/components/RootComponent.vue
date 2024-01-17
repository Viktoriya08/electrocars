<script lang="ts">
import { defineComponent } from 'vue';
import initVanillaModules from '@scripts/plugins/vanilla';

export default defineComponent({
	name: 'RootComponent',
	mounted() {
		// Инициализация Vanilla-модулей
		initVanillaModules();
	},
});
</script>

<template>
	<slot />
</template>

<style scoped lang="sass"></style>
