import{d as e,Y as a,_ as l,h as t,o as r,c as o,l as s,v as m,a as i,i as n,e as d,z as u,F as f,s as p,u as c}from"./main-chunk-fdacad84.js";import{u as _,r as h,e as v,m as V,c as D}from"./index-chunk-b278f882.js";import b from"./ExampleSelect-chunk-1411a278.js";import k from"./InputFile-chunk-1d631881.js";import g from"./InputText-chunk-675f41fd.js";import"./multiselect-chunk-7d40e64e.js";import"./InputTemplate-chunk-df175f93.js";import"./getMask-chunk-73dd093f.js";const x=e({name:"FormExample",components:{InputText:g,InputFile:k,ExampleSelect:b},props:{agreement:{type:String,default:()=>"#"}},setup(){const e=a({}),{withMessage:l}=D;return{withMessage:l,externalResults:e,v$:_({$externalResults:e})}},data:()=>({isFinished:!1,formData:{select:"",firstName:"",lastName:"",phone:"",email:"",file:void 0,link:""}}),validations(){return{formData:{firstName:{required:this.withMessage("Поле обязательно для заполнения",h)},lastName:{required:this.withMessage("Поле обязательно для заполнения",h)},email:{email:this.withMessage("Некорректный e-mail",v)},phone:{required:this.withMessage("Поле обязательно для заполнения",h),minLength:this.withMessage("Некорректный номер телефона",V(18))},file:{required:this.withMessage("Поле обязательно для заполнения",h)}}}},methods:{sendForm(){this.v$.$validate().then((e=>{e&&(this.isFinished=!0)})).catch((e=>{console.log(e)}))}}}),$={class:"form__items form__items--2"},F={class:"form__bottom"},M=["disabled"],N={class:"form__agree"},j=["href"],I={class:"form-send form-send--example"},q=[(e=>(p("data-v-d58f61e7"),e=e(),c(),e))((()=>i("div",{class:"form-send__info"},[i("div",{class:"form__title"}," Резюме отравлено "),i("div",{class:"form-send__text"},[d(" Мы свяжемся с вами при появлении "),i("br"),d(" подходящей вакансии ")])],-1)))];const w=l(x,[["render",function(e,a,l,p,c,_){const h=t("ExampleSelect"),v=t("InputText"),V=t("InputFile");return r(),o(f,null,[s(i("form",{class:"form form--example",onSubmit:a[7]||(a[7]=u(((...a)=>e.sendForm&&e.sendForm(...a)),["prevent"]))},[i("div",$,[n(h,{id:"select",modelValue:e.formData.select,"onUpdate:modelValue":a[0]||(a[0]=a=>e.formData.select=a),class:"form__item form__item--full",placeholder:"Выбрать",label:"Направление",options:["Проектирование","Строительство","Управление проектами","IT","Маркетинг","Продажи","Финансы и экономика","HR","Логистика","Сервис"]},null,8,["modelValue"]),n(v,{id:"first-name-input",modelValue:e.formData.firstName,"onUpdate:modelValue":a[1]||(a[1]=a=>e.formData.firstName=a),class:"form__item form__item--required",errors:e.v$.formData.firstName.$errors,label:"Имя",autocomplete:"given-name",placeholder:""},null,8,["modelValue","errors"]),n(v,{id:"last-name-input",modelValue:e.formData.lastName,"onUpdate:modelValue":a[2]||(a[2]=a=>e.formData.lastName=a),class:"form__item form__item--required",errors:e.v$.formData.lastName.$errors,label:"Фамилия",autocomplete:"family-name",placeholder:""},null,8,["modelValue","errors"]),n(v,{id:"phone-input",modelValue:e.formData.phone,"onUpdate:modelValue":a[3]||(a[3]=a=>e.formData.phone=a),class:"form__item form__item--required",label:"Телефон",placeholder:"+7 (___) ___ __ __",type:"tel",autocomplete:"tel","mask-type":"phoneMask"},null,8,["modelValue"]),n(v,{id:"email-input",modelValue:e.formData.email,"onUpdate:modelValue":a[4]||(a[4]=a=>e.formData.email=a),class:"form__item",errors:e.v$.formData.email.$errors,type:"email",label:"E-mail",autocomplete:"email",placeholder:"ivanivanov@mymail.ru"},null,8,["modelValue","errors"]),n(V,{id:"file-input",modelValue:e.formData.file,"onUpdate:modelValue":a[5]||(a[5]=a=>e.formData.file=a),errors:e.v$.formData.file.$errors,accept:".doc, .docx, .pdf, .rtf",class:"form__item form__item--full form__item--required",placeholder:".doc, .pdf, .docx, .rtf",label:"Прикрепите резюме"},null,8,["modelValue","errors"]),n(v,{id:"link-input",modelValue:e.formData.link,"onUpdate:modelValue":a[6]||(a[6]=a=>e.formData.link=a),class:"form__item form__item--full",label:"Или укажите ссылку на резюме hh.ru или superjob.ru",autocomplete:"url",placeholder:"Вставьте сссылку"},null,8,["modelValue"])]),i("div",F,[i("button",{class:"form__submit btn btn--color",type:"submit",disabled:e.v$.$error&&e.v$.$dirty}," Отправить ",8,M),i("div",N,[d(" Нажимая кнопку, Вы даете информированное согласие на обработку своих "),i("a",{class:"link",href:e.agreement,target:"_blank"},"персональных данных",8,j)])])],544),[[m,!e.isFinished]]),s(i("div",I,q,512),[[m,e.isFinished]])],64)}],["__scopeId","data-v-d58f61e7"]]);export{w as default};