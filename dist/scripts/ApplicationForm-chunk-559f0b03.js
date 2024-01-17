import e from"./InputText-chunk-3707bc14.js";import a from"./InputTextarea-chunk-544d63f8.js";import s from"./FadeTransition-chunk-bad51757.js";import{c as t}from"./closeTimer-chunk-e62a2f3b.js";import{u as r,r as o,m,a as l,c as i}from"./index-chunk-6e3f4305.js";import{d as n,Y as d,E as u,_ as p,h as c,k as h,o as f,c as _,a as v,i as g,e as b,w as x,l as k,v as w,t as $,z as T}from"./main-chunk-0e8e2f38.js";import"./InputTemplate-chunk-99594d67.js";import"./getMask-chunk-73dd093f.js";const D=n({name:"ApplicationForm",components:{InputTextarea:a,FadeTransition:s,InputText:e},mixins:[t],props:{agreement:{type:String,default:()=>"#"}},setup(){const e=d({}),{withMessage:a}=i,s=u("viewportUntil"),t=u("modalId");return{viewportUntil:s,withMessage:a,externalResults:e,v$:r({$externalResults:e}),modalId:t}},data:()=>({isFinished:!1,formData:{name:"",phone:"",message:""}}),validations(){return{formData:{name:{required:this.withMessage("Поле обязательно для заполнения",o)},phone:{required:this.withMessage("Поле обязательно для заполнения",o),minLength:this.withMessage("Некорректный номер телефона",m(18))},message:{required:this.withMessage("Поле обязательно для заполнения",o),maxLength:this.withMessage("Превышено максимальное количество символов (500)",l(500))}}}},methods:{sendForm(){this.v$.$validate().then((e=>{e&&(this.isFinished=!0,this.startCloseTimer(this.modalId))})).catch((e=>{console.log(e)}))}}}),F=v("div",{class:"form__title"}," Отправьте заявку. Мы свяжемся с вами в ближайшее время. ",-1),I={class:"form__items form__items--2"},M={class:"form__item"},V={class:"form__item"},j={class:"form__item form__item--full"},y={class:"form__bottom form__bottom--row"},U={class:"form__submit"},q=["disabled"],C={class:"form__policy"},E=["href"],L={class:"form__final"},R={class:"form__title"},S=v("br",null,null,-1),z=v("br",null,null,-1),A={class:"form__close"},Y=v("span",{class:"form__close-text"},"Окно автоматически закроется через",-1),B={class:"form__close-time"};const G=p(D,[["render",function(e,a,s,t,r,o){const m=c("InputText"),l=c("InputTextarea"),i=c("FadeTransition"),n=h("animate");return f(),_("form",{class:"form",onSubmit:a[3]||(a[3]=T(((...a)=>e.sendForm&&e.sendForm(...a)),["prevent"]))},[F,v("div",I,[v("div",M,[g(m,{id:"name-review",modelValue:e.formData.name,"onUpdate:modelValue":a[0]||(a[0]=a=>e.formData.name=a),errors:e.v$.formData.name.$errors,label:"Как вас зовут?",autocomplete:"given-name",placeholder:"Укажите имя"},null,8,["modelValue","errors"])]),v("div",V,[g(m,{id:"phone-review",modelValue:e.formData.phone,"onUpdate:modelValue":a[1]||(a[1]=a=>e.formData.phone=a),errors:e.v$.formData.phone.$errors,label:"Укажите телефон",placeholder:"+7 999 999-99-99",type:"tel",autocomplete:"tel","mask-type":"phoneMask","required-text":"Обязательное поле"},null,8,["modelValue","errors"])]),v("div",j,[g(l,{id:"message-review",modelValue:e.formData.message,"onUpdate:modelValue":a[2]||(a[2]=a=>e.formData.message=a),errors:e.v$.formData.message.$errors,label:"Ваш отзыв",placeholder:"Введите текст","required-text":"Обязательное поле"},null,8,["modelValue","errors"])])]),v("div",y,[v("div",U,[v("button",{class:"btn btn--color-primary",type:"submit",disabled:e.v$.$error&&e.v$.$dirty}," Отправить отзыв ",8,q)]),v("p",C,[b(" Отправляя данные, вы соглашаетесь с "),v("a",{href:e.agreement,target:"_blank"},"политикой конфиденциальности",8,E)])]),g(i,null,{default:x((()=>[k(v("div",L,[k((f(),_("h3",R,[b(" Спасибо! "),S,b(" Мы получили ваш отзыв "),z,b(" и скоро свяжемся с вами. ")])),[[n,{animationClass:"fadeInUp"}]]),v("div",A,[Y,v("span",B,$(e.getCloseTimer),1)])],512),[[w,e.isFinished]])])),_:1})],32)}]]);export{G as default};