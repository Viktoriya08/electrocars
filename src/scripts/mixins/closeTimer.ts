import { useModalsStore } from '@scripts/hooks/stateHooks/useModalsStore';
import { defineComponent } from 'vue';

export interface CloseTimer {
	timer: number | undefined
	value: number
};

export default defineComponent({
	mixins: [useModalsStore],
	data() {
		return {
			closeTimer: {
				timer: undefined,
				value: 5,
			} as CloseTimer,
		};
	},
	computed: {
		getCloseTimer(): string {
			const time = this.closeTimer.value;
			const minutes = String(Math.floor(time / 60)).padStart(2, '0');
			const seconds = String(time % 60).padStart(2, '0');
			return `${minutes}:${seconds}`;
		},
	},
	methods: {
		startCloseTimer(modalId: string) {
			this.closeTimer.timer = setTimeout(() => {
				this.timerTick(modalId);
			});
		},
		timerTick(modalId: string) {
			this.closeTimer.value--;
			if (this.closeTimer.value === 0) {
				clearTimeout(this.closeTimer.timer);
				setTimeout(() => {
					if (this.isModalOpened(modalId))
						this.closeModal(modalId);
				}, 1000);
			}
			else {
				this.closeTimer.timer = setTimeout(() => {
					this.timerTick(modalId);
				}, 1000);
			}
		},
	},
});
