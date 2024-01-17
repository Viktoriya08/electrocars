<script lang="ts">
import InputText from '@components/utils/form/InputText.vue';
import FadeTransition from '@components/utils/transitions/FadeTransition.vue';
import type { ViewportNames } from '@scripts/hooks/useViewportHandler/types';
import closeTimer from '@scripts/mixins/closeTimer';
import useVuelidate from '@vuelidate/core';
import { helpers, minLength, required } from '@vuelidate/validators';
import { defineComponent, inject, reactive } from 'vue';

export default defineComponent({
	name: 'CallbackForm',
	components: { FadeTransition, InputText },
	mixins: [closeTimer],
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
		const modalId = inject('modalId') as string;

		return {
			viewportUntil,
			withMessage,
			externalResults,
			v$: useVuelidate({ $externalResults: externalResults }),
			modalId,
		};
	},
	data() {
		return {
			isFinished: false,
			formData: {
				name: '',
				phone: '',
			},
		};
	},
	validations() {
		return {
			formData: {
				name: {
					required: this.withMessage('Поле обязательно для заполнения', required),
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
					this.startCloseTimer(this.modalId);
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
		<div class="form__title">
			Отправьте заявку. Мы свяжемся с вами в ближайшее время.
		</div>
		<div class="form__items">
			<div class="form__item">
				<InputText
					id="name-callback"
					v-model="formData.name"
					:errors="v$.formData.name.$errors"
					label="Как вас зовут?"
					autocomplete="given-name"
					placeholder="Укажите имя"
				/>
			</div>
			<div class="form__item">
				<InputText
					id="phone-review"
					v-model="formData.phone"
					:errors="v$.formData.phone.$errors"
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
					Отправить заявку
				</button>
			</div>
			<p class="form__policy">
				Отправляя данные, вы соглашаетесь с
				<a :href="agreement" target="_blank">политикой конфиденциальности</a>
			</p>
		</div>

		<FadeTransition>
			<div v-show="isFinished" class="form__final">
				<h3 v-animate="{ animationClass: 'fadeInUp' }" class="form__title">
					Заявка отправлена! <br> Мы&nbsp;свяжемся с&nbsp;вами <br> в&nbsp;ближайшее время.
				</h3>

				<div class="form__close">
					<span class="form__close-text">Окно автоматически закроется через</span>
					<span class="form__close-time">{{ getCloseTimer }}</span>
				</div>
			</div>
		</FadeTransition>
	</form>
</template>

<style scoped lang="sass">

</style>
