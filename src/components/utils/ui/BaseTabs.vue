<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

type Tab =
	| {
		label: string
		value: string | number
		disabled?: boolean
	}
	| string;
type Tabs = Tab[];

export default defineComponent({
	name: 'BaseTabs',
	props: {
		modelValue: {
			type: [String, Number],
			default: () => null,
		},
		tabs: {
			type: Array as PropType<Tabs>,
			required: true,
			default: () => [],
		},
		tag: {
			type: String as PropType<'button' | 'a'>,
			default: () => 'button',
		},
		type: {
			type: String as PropType<'default' | 'switcher'>,
			default: () => 'default',
		},
	},
	emits: ['update:modelValue', 'change'],
	data() {
		return {
			activeTab: this.modelValue,
		};
	},
	computed: {
		value: {
			get(): string | number {
				return this.modelValue ?? this.activeTab;
			},
			set(value: string | number) {
				this.activeTab = value;
				this.$emit('update:modelValue', value);
				this.$emit('change', value);
			},
		},
		getLabel() {
			return (tab: Tab) => (typeof tab === 'string' ? tab : tab.label);
		},
		isActive() {
			return (tab: Tab) =>
				typeof tab === 'string' ? this.value === tab : this.value === tab.value;
		},
	},
	mounted() {
		this.setInitialTab();
	},
	methods: {
		setInitialTab() {
			if (this.tabs.length !== 0 && !this.modelValue) {
				if (typeof this.tabs[0] === 'string') {
					[this.value] = this.tabs;
				}
				else {
					const firstActiveTab = this.tabs.find(tab => typeof tab !== 'string' && !tab.disabled);
					if (firstActiveTab) {
						if (typeof firstActiveTab !== 'string')
							this.value = firstActiveTab.value;
					}
				}
			}
		},
		setTab(event: PointerEvent, tab: Tab): void {
			if (typeof tab !== 'string' && tab.disabled) {
				event.preventDefault();
				return;
			}
			this.value = typeof tab === 'string' ? tab : tab.value;

			if (event.target instanceof HTMLElement) {
				event.target.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
					inline: 'center',
				});
			}
		},
	},
});
</script>

<template>
	<div class="tabs" :class="`tabs--type-${type}`">
		<ul class="tabs__list">
			<li v-for="(tab, index) in tabs" :key="index" class="tabs__item">
				<Component
						:is="tag"
						class="tab"
						:disabled="typeof tab !== 'string' && tab.disabled"
						:class="[
						`tab--type-${type}`,
						{ active: isActive(tab) },
						{ disabled: typeof tab !== 'string' && tab.disabled },
					]"
						@click="setTab($event, tab)"
				>
					{{ getLabel(tab) }}
				</Component>
			</li>
		</ul>
	</div>
</template>

<style scoped lang="sass">
.tabs
	display: flex
	max-width: 100%

	&__list
		display: flex
		flex-wrap: wrap
		align-items: center
		gap: rem(6)
		width: 100%

	&__item
		display: block
		flex: 1 1 auto

		& .tab
			width: 100%

	&--type
		&-switcher
			padding: rem(2)
			border-radius: var(--radius-m)

			background-color: var(--color-primary-300)

			& .tabs
				&__list
					flex-wrap: nowrap
					gap: 0
					max-width: 100%
					overflow-x: auto

					@include tiny-h-scroll(var(--color-neutral-200), var(--color-primary-500))


</style>
