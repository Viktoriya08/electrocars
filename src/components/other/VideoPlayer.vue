<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'VideoPlayer',
	data() {
		return {
			video: null as HTMLVideoElement | null,
			isPlaying: false,
		};
	},
	mounted() {
		this.initPlayer();
	},
	methods: {
		initPlayer() {
			const video = this.$el.querySelector('video') as HTMLVideoElement;
			if (!video) {
				console.error('Video not found');
				return;
			}

			this.video = video;
			this.video.addEventListener('pause', () => {
				this.isPlaying = false;
			});
			this.video.addEventListener('play', () => {
				this.isPlaying = true;
			});
		},
		playVideo() {
			if (!this.isPlaying)
				this.video?.play();
		},
		pauseVideo() {
			if (this.isPlaying)
				this.video?.pause();
		},
	},
});
</script>

<template>
	<div class="video" :class="{ 'video--playing': isPlaying }">
		<slot :pause-video="pauseVideo" name="video" />
		<button class="btn btn--play video__btn" @click="playVideo" />
	</div>
</template>

<style scoped lang="sass">
</style>
