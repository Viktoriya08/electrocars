<script lang="ts">
import InputText from '@components/utils/form/InputText.vue';
import FadeTransition from '@components/utils/transitions/FadeTransition.vue';
import type { ViewportNames } from '@scripts/hooks/useViewportHandler/types';
import useVuelidate from '@vuelidate/core';
import { helpers, minLength, required } from '@vuelidate/validators';
import { defineComponent, inject, reactive } from 'vue';

export default defineComponent({
	name: 'FormTestDrive',
	components: { FadeTransition, InputText },
	props: {
		agreement: {
			type: String,
			default: () => '#',
		},
	},
	setup() {
		const externalResults = reactive({});
		const { withMessage } = helpers;
		const viewportUntil = inject('viewportUntil') as (viewportName: ViewportNames) => boolean;
		return {
			viewportUntil,
			withMessage,
			externalResults,
			v$: useVuelidate({ $externalResults: externalResults }),
		};
	},
	data() {
		return {
			isFinished: false,
			formData: {
				firstName: '',
				phone: '',
			},
		};
	},
	validations() {
		return {
			formData: {
				firstName: {
					required: this.withMessage('Обязательное поле', required),
				},
				phone: {
					required: this.withMessage('Поле обязательно для заполнения', required),
					minLength: this.withMessage('Некорректный номер телефона', minLength(18)),
				},
			},
		};
	},
	methods: {
		sendForm() {
			this.v$.$validate()
				.then((result) => {
					if (!result)
						return;
					this.isFinished = true;
				})
				.catch((e) => {
					console.log(e);
				});
		},
	},
});
</script>

<template>
	<form class="form" @submit.prevent="sendForm">
		<div v-if="!viewportUntil('mobile-xl')" class="form__title">
			Запишитесь на тест-драйв!
		</div>

		<div class="form__items">
			<div class="form__item">
				<InputText
					id="name-rental"
					v-model="formData.firstName"
					label="Как вас зовут?"
					autocomplete="given-name"
					placeholder="Укажите имя"
				/>
			</div>
			<div class="form__item">
				<InputText
					id="phone-rental"
					v-model="formData.phone"
					:errors="v$.formData.firstName.$errors"
					label="Укажите телефон"
					placeholder="+7 999 999-99-99"
					type="tel"
					autocomplete="tel"
					mask-type="phoneMask"
					required-text="Обязательное поле"
				/>
			</div>
		</div>

		<div class="form__bottom">
			<div class="form__submit">
				<button class="btn btn--color-primary" type="submit" :disabled="v$.$error && v$.$dirty">
					Записаться на тест-драйв
				</button>
			</div>
			<p class="form__policy">
				Отправляя данные, вы соглашаетесь с
				<a :href="agreement" target="_blank">политикой конфиденциальности</a>
			</p>
		</div>

		<FadeTransition>
			<div v-show="isFinished" class="form__final">
				<div v-animate="{ animationClass: 'fadeInUp' }" class="form__title">
					Заявка отправлена! <br> Мы&nbsp;свяжемся с&nbsp;вами <br> в&nbsp;ближайшее время.
				</div>
			</div>
		</FadeTransition>
	</form>
</template>

<style scoped lang="sass">

</style>
