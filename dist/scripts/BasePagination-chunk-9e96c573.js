import{I as t}from"./IconSVG-chunk-cd8e7ea2.js";import{d as e,g as a,_ as n,h as o,o as s,b as i,w as u,i as l}from"./main-chunk-fdacad84.js";const r=n(e({name:"BasePagination",components:{IconSVG:t,VueAwesomePaginate:a},props:{modelValue:{type:Number,default:()=>null},total:{type:Number,required:!0},limit:{type:Number,default:()=>10},maxButtons:{type:Number,default:()=>5},type:{type:String,default:()=>"button"},hideButtons:{type:Boolean,default:()=>!1},arrowsStyle:{type:String,default:()=>"default"},colorScheme:{type:String,default:()=>"default"}},emits:["update:modelValue","change"],data:()=>({activePage:1}),computed:{value:{get(){return this.modelValue??this.activePage},set(t){this.activePage=t,this.$emit("update:modelValue",t),this.$emit("change",t)}},getArrowIcons(){return t=>{switch(this.arrowsStyle){case"default":default:return"left"===t?"arrow-left":"arrow-right";case"simple":return"left"===t?"chevron-left":"chevron-right";case"small":return"left"===t?"chevron-left-sm":"chevron-right-sm"}}}}}),[["render",function(t,e,a,n,r,c){const m=o("IconSVG"),p=o("VueAwesomePaginate");return s(),i(p,{modelValue:t.value,"onUpdate:modelValue":e[0]||(e[0]=e=>t.value=e),"total-items":t.total,"items-per-page":t.limit,"show-ending-buttons":!1,"max-pages-shown":t.maxButtons,type:t.type,"hide-prev-next":t.hideButtons,"pagination-container-class":"pagination","paginate-buttons-class":`pagination__button pagination__button--color-${t.colorScheme}`,"disabled-paginate-buttons-class":"disabled","number-buttons-class":"pagination__button--number","active-page-class":"active","back-button-class":"pagination__button--back","next-button-class":"pagination__button--next","last-button-class":"pagination__button--number","first-button-class":"pagination__button--number"},{"prev-button":u((()=>[l(m,{class:"pagination__button-icon",name:t.getArrowIcons("left")},null,8,["name"])])),"next-button":u((()=>[l(m,{class:"pagination__button-icon",name:t.getArrowIcons("right")},null,8,["name"])])),_:1},8,["modelValue","total-items","items-per-page","max-pages-shown","type","hide-prev-next","paginate-buttons-class"])}]]);export{r as default};
