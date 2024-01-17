<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { email, helpers, minLength, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import ExampleSelect from '@components/utils/form/selects/ExampleSelect.vue';
import InputFile from '@components/utils/form/InputFile.vue';
import InputText from '@components/utils/form/InputText.vue';

export default defineComponent({
	name: 'FormExample',
	components: { InputText, InputFile, ExampleSelect },
	props: {
		agreement: {
			type: String,
			default: () => '#',
		},
	},
	setup() {
		const externalResults = reactive({});
		const { withMessage } = helpers;
		return {
			withMessage,
			externalResults,
			v$: useVuelidate({ $externalResults: externalResults }),
		};
	},
	data() {
		return {
			isFinished: false,
			formData: {
				select: '',
				firstName: '',
				lastName: '',
				phone: '',
				email: '',
				file: undefined,
				link: '',
			},
		};
	},
	validations() {
		return {
			formData: {
				firstName: {
					required: this.withMessage('Поле обязательно для заполнения', required),
				},
				lastName: {
					required: this.withMessage('Поле обязательно для заполнения', required),
				},
				email: {
					email: this.withMessage('Некорректный e-mail', email),
				},
				phone: {
					required: this.withMessage('Поле обязательно для заполнения', required),
					minLength: this.withMessage('Некорректный номер телефона', minLength(18)),
				},
				file: {
					required: this.withMessage('Поле обязательно для заполнения', required),
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
	<form v-show="!isFinished" class="form form--example" @submit.prevent="sendForm">
		<div class="form__items form__items--2">
			<ExampleSelect
				id="select"
				v-model="formData.select"
				class="form__item form__item--full"
				placeholder="Выбрать"
				label="Направление"
				:options="['Проектирование', 'Строительство', 'Управление проектами', 'IT', 'Маркетинг', 'Продажи', 'Финансы и экономика', 'HR', 'Логистика', 'Сервис']"
			/>
			<InputText
				id="first-name-input"
				v-model="formData.firstName"
				class="form__item form__item--required" :errors="v$.formData.firstName.$errors"
				label="Имя"
				autocomplete="given-name"
				placeholder=""
			/>
			<InputText
				id="last-name-input"
				v-model="formData.lastName"
				class="form__item form__item--required" :errors="v$.formData.lastName.$errors"
				label="Фамилия"
				autocomplete="family-name"
				placeholder=""
			/>
			<InputText
				id="phone-input"
				v-model="formData.phone"
				class="form__item form__item--required"
				label="Телефон"
				placeholder="+7 (___) ___ __ __"
				type="tel"
				autocomplete="tel"
				mask-type="phoneMask"
			/>
			<InputText
				id="email-input"
				v-model="formData.email"
				class="form__item"
				:errors="v$.formData.email.$errors"
				type="email"
				label="E-mail"
				autocomplete="email"
				placeholder="ivanivanov@mymail.ru"
			/>
			<InputFile
				id="file-input"
				v-model="formData.file"
				:errors="v$.formData.file.$errors"
				accept=".doc, .docx, .pdf, .rtf"
				class="form__item form__item--full form__item--required"
				placeholder=".doc, .pdf, .docx, .rtf"
				label="Прикрепите резюме"
			/>
			<InputText
				id="link-input"
				v-model="formData.link"
				class="form__item form__item--full"
				label="Или укажите ссылку на резюме hh.ru или superjob.ru"
				autocomplete="url"
				placeholder="Вставьте сссылку"
			/>
		</div>

		<div class="form__bottom">
			<button class="form__submit btn btn--color" type="submit" :disabled="v$.$error && v$.$dirty">
				Отправить
			</button>
			<div class="form__agree">
				Нажимая кнопку, Вы даете информированное согласие на обработку своих
				<a class="link" :href="agreement" target="_blank">персональных данных</a>
			</div>
		</div>
	</form>

	<div v-show="isFinished" class="form-send form-send--example">
		<div class="form-send__info">
			<div class="form__title">
				Резюме отравлено
			</div>
			<div class="form-send__text">
				Мы свяжемся с вами при появлении
				<br>
				подходящей вакансии
			</div>
		</div>
	</div>
</template>

<style scoped lang="sass">
@import '@styles/blocks/form'

// .form--example

// .form-send--example
</style>
