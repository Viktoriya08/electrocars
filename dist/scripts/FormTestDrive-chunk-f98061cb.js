import e from"./InputText-chunk-3707bc14.js";import a from"./FadeTransition-chunk-bad51757.js";import{u as t,r as s,m as r,c as o}from"./index-chunk-6e3f4305.js";import{d as i,Y as n,E as l,_ as m,h as d,k as u,o as p,c as f,B as c,a as h,i as v,e as _,w as b,l as g,v as k,z as F}from"./main-chunk-0e8e2f38.js";import"./InputTemplate-chunk-99594d67.js";import"./getMask-chunk-73dd093f.js";const $=i({name:"FormTestDrive",components:{FadeTransition:a,InputText:e},props:{agreement:{type:String,default:()=>"#"}},setup(){const e=n({}),{withMessage:a}=o;return{viewportUntil:l("viewportUntil"),withMessage:a,externalResults:e,v$:t({$externalResults:e})}},data:()=>({isFinished:!1,formData:{firstName:"",phone:""}}),validations(){return{formData:{firstName:{required:this.withMessage("Обязательное поле",s)},phone:{required:this.withMessage("Поле обязательно для заполнения",s),minLength:this.withMessage("Некорректный номер телефона",r(18))}}}},methods:{sendForm(){this.v$.$validate().then((e=>{e&&(this.isFinished=!0)})).catch((e=>{console.log(e)}))}}}),w={key:0,class:"form__title"},x={class:"form__items"},y={class:"form__item"},D={class:"form__item"},T={class:"form__bottom"},M={class:"form__submit"},j=["disabled"],U={class:"form__policy"},V=["href"],I={class:"form__final"},N={class:"form__title"},q=h("br",null,null,-1),E=h("br",null,null,-1);const R=m($,[["render",function(e,a,t,s,r,o){const i=d("InputText"),n=d("FadeTransition"),l=u("animate");return p(),f("form",{class:"form",onSubmit:a[2]||(a[2]=F(((...a)=>e.sendForm&&e.sendForm(...a)),["prevent"]))},[e.viewportUntil("mobile-xl")?c("",!0):(p(),f("div",w," Запишитесь на тест-драйв! ")),h("div",x,[h("div",y,[v(i,{id:"name-rental",modelValue:e.formData.firstName,"onUpdate:modelValue":a[0]||(a[0]=a=>e.formData.firstName=a),label:"Как вас зовут?",autocomplete:"given-name",placeholder:"Укажите имя"},null,8,["modelValue"])]),h("div",D,[v(i,{id:"phone-rental",modelValue:e.formData.phone,"onUpdate:modelValue":a[1]||(a[1]=a=>e.formData.phone=a),errors:e.v$.formData.firstName.$errors,label:"Укажите телефон",placeholder:"+7 999 999-99-99",type:"tel",autocomplete:"tel","mask-type":"phoneMask","required-text":"Обязательное поле"},null,8,["modelValue","errors"])])]),h("div",T,[h("div",M,[h("button",{class:"btn btn--color-primary",type:"submit",disabled:e.v$.$error&&e.v$.$dirty}," Записаться на тест-драйв ",8,j)]),h("p",U,[_(" Отправляя данные, вы соглашаетесь с "),h("a",{href:e.agreement,target:"_blank"},"политикой конфиденциальности",8,V)])]),v(n,null,{default:b((()=>[g(h("div",I,[g((p(),f("div",N,[_(" Заявка отправлена! "),q,_(" Мы свяжемся с вами "),E,_(" в ближайшее время. ")])),[[l,{animationClass:"fadeInUp"}]])],512),[[k,e.isFinished]])])),_:1})],32)}]]);export{R as default};