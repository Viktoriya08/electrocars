<script lang="ts">
import {defineComponent, inject} from 'vue'
import {ViewportNames} from "@scripts/hooks/useViewportHandler/types";

export default defineComponent({
	name: "BenefitForm",
	props: {
		fuelConsumption: {
			type: Number,
			default: 11.2,
		},
		batteryCapacity: {
			type: Number,
			default: 64,
		},
		rangeReserve: {
			type: Number,
			default: 360,
		},
	},
	setup() {
		const viewportUntil = inject('viewportUntil') as (viewportName: ViewportNames) => boolean;
		return {
			viewportUntil,
		}
	},
	data() {
		return {
			formData: {
				fuelCost: 52.7,
				mileage: 15000,
				electricityCost: 3.5,
			},
			resultsShown: !this.viewportUntil('mobile-xl')
		}
	},
	computed: {
		results() {
			const {
				fuelCost,
				mileage,
				electricityCost,
			} = this.formData

			const perYearEconomy = ((fuelCost / this.fuelConsumption) * mileage) - ((electricityCost * this.batteryCapacity) / this.rangeReserve)
			const perKmEconomy = ((fuelCost / this.fuelConsumption) * 100) - (((electricityCost * this.batteryCapacity) / this.rangeReserve))

			const formatter = new Intl.NumberFormat('ru-RU', {
				style: 'decimal',
				maximumFractionDigits: 0,
			});

			return {
				perYearEconomy: formatter.format(perYearEconomy),
				perKmEconomy: formatter.format(perKmEconomy),
			}
		},
		getParams() {
			const priceFormatter = new Intl.NumberFormat('ru-RU', {
				style: 'decimal',
				maximumFractionDigits: 2,
				minimumFractionDigits: 2
			});

			const mileageFormatter = new Intl.NumberFormat('ru-RU', {
				style: 'decimal',
				maximumFractionDigits: 0,
			});

			return {
				...this.formData,
				fuelCostHuman: priceFormatter.format(this.formData.fuelCost),
				mileageHuman: mileageFormatter.format(this.formData.mileage),
				electricityCostHuman: priceFormatter.format(this.formData.electricityCost),
			}
		},
	},
	methods: {
		setElectricityCost(sourceType: 'home' | 'public') {
			if (sourceType === 'home') {
				this.formData.electricityCost = 3.5
			} else {
				this.formData.electricityCost = 4.5
			}
		},
		setFuelCost(fuelCost: number) {
			this.formData.fuelCost = fuelCost
		},
		setMileage(mileage: number) {
			this.formData.mileage = mileage
		},
		showResults() {
			this.resultsShown = true
		}
	}
})
</script>

<template>
	<slot :results="results" :params="getParams" :results-shown="resultsShown" :show-results="showResults" :set-electricity-cost="setElectricityCost" :set-fuel-cost="setFuelCost" :set-mileage="setMileage"></slot>
</template>

<style scoped lang="sass">

</style>
