import{I as e}from"./InputTemplate-chunk-df175f93.js";import{d as a,_ as l,h as t,o as d,b as s,G as n,w as o,m as r,a as i,l as u,I as p,t as c,n as b,s as m,u as y}from"./main-chunk-fdacad84.js";const f=a({name:"InputCheckbox",components:{InputTemplate:e},props:{modelValue:{type:Boolean,default:()=>null},id:{type:String,default:()=>""},label:{type:String,default:()=>""},text:{type:String,default:()=>null},readOnly:{type:Boolean,default:()=>!1},disabled:{type:Boolean,default:()=>!1},name:{type:String,default:()=>""},required:{type:Boolean,default:()=>!1},title:{type:String,default:()=>""},errors:{type:Array,default:()=>[]}},emits:["update:modelValue"],data:()=>({isChecked:!1}),computed:{value:{get(){return this.modelValue??this.isChecked},set(e){this.isChecked=e,this.$emit("update:modelValue",e)}}}}),h=["title"],k=["id","disabled","required","name","readonly"],v=(e=>(m("data-v-4fcb9fbb"),e=e(),y(),e))((()=>i("span",{class:"input-checkbox__checkmark"},null,-1))),_={class:"input-checkbox__value"};const x=l(f,[["render",function(e,a,l,m,y,f){const x=t("InputTemplate");return d(),s(x,{label:e.label,errors:e.errors,tag:"span",disabled:e.disabled,"read-only":e.readOnly,"is-empty":!e.value},n({default:o((()=>[i("label",{class:b(["input-checkbox",[{active:e.value},{error:e.errors.length},{disabled:e.disabled},{readonly:e.readOnly}]]),title:e.title},[u(i("input",{id:e.id,"onUpdate:modelValue":a[0]||(a[0]=a=>e.value=a),type:"checkbox",disabled:e.disabled||e.readOnly,required:e.required,name:e.name,readonly:e.readOnly,class:"input-checkbox__input"},null,8,k),[[p,e.value]]),v,i("span",_,c(e.text),1)],10,h)])),_:2},[e.$slots.label?{name:"label",fn:o((({labelValue:a})=>[r(e.$slots,"label",{labelValue:a},void 0,!0)])),key:"0"}:void 0,e.$slots.action?{name:"action",fn:o((()=>[r(e.$slots,"action",{},void 0,!0)])),key:"1"}:void 0]),1032,["label","errors","disabled","read-only","is-empty"])}],["__scopeId","data-v-4fcb9fbb"]]);export{x as default};
