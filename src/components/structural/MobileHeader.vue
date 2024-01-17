<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'MobileHeader',
	data() {
		return {
			shouldBeHidden: false,
		};
	},
	created() {
		window.addEventListener('scroll', this.handleScroll);
	},
	unmounted() {
		window.removeEventListener('scroll', this.handleScroll);
	},
	methods: {
		handleScroll() {
			const heightBody = document.documentElement.scrollHeight;
			this.shouldBeHidden = heightBody - (window.pageYOffset + window.innerHeight) <= 200;
		},
	},
});
</script>

<template>
	<slot :should-be-hidden="shouldBeHidden" />
</template>

<style scoped lang="sass">

</style>
