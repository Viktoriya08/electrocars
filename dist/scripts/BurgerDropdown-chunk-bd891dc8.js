import{I as o}from"./IconSVG-chunk-cd8e7ea2.js";import n from"./FadeTransition-chunk-e258e4e0.js";import{d as e,y as i,E as r,_ as s,h as t,o as d,c as a,b as l,i as c,w as p,B as u,C as m,a as h,z as g,m as w,T as b,n as _}from"./main-chunk-fdacad84.js";const D=e({name:"BurgerDropdown",components:{IconSVG:o,FadeTransition:n},mixins:[i],props:{id:{type:String,default:"burger-menu"}},setup:()=>({viewportUntil:r("viewportUntil")}),data:()=>({dropdownWillHide:!1,dropdownHideTimeout:null,dropdownShown:!1}),computed:{isOpened(){return this.isModalOpened(this.id)}},mounted(){try{this.registerModal(this.id)}catch(o){console.error(o)}},unmounted(){try{this.unregisterModal(this.id)}catch(o){console.error(o)}},methods:{showDropdown(){this.openModal(this.id)},hideDropdown(){this.closeModal(this.id)},toggleDropdown(){this.isOpened?this.hideDropdown():this.showDropdown()}}}),f={ref:"trigger",class:"burger-menu__trigger"},v={class:"burger-menu__content"},k={key:0,class:"burger-menu__bottom"};const y=s(D,[["render",function(o,n,e,i,r,s){const D=t("FadeTransition"),y=t("IconSVG");return d(),a("div",{class:_(["burger-menu",[{active:o.isOpened}]])},[(d(),l(m,{to:"#modals-container"},[c(D,{appear:""},{default:p((()=>[o.isOpened?(d(),a("div",{key:0,class:"burger-menu__blackout",onClick:n[0]||(n[0]=(...n)=>o.hideDropdown&&o.hideDropdown(...n))})):u("",!0)])),_:1})])),h("div",f,[h("button",{class:"icon-btn icon-btn--color-primary",onClick:n[1]||(n[1]=(...n)=>o.toggleDropdown&&o.toggleDropdown(...n))},[c(y,{name:o.isOpened?"close":""+(o.viewportUntil("tablet")?"menu-mob":"menu"),class:"icon-btn__icon"},null,8,["name"])])],512),c(b,{name:"burger-menu",duration:450,appear:""},{default:p((()=>[o.isOpened?(d(),a("div",{key:0,ref:"dropdown",class:"burger-menu__body",onClick:n[3]||(n[3]=g(((...n)=>o.toggleDropdown&&o.toggleDropdown(...n)),["self"]))},[h("div",v,[w(o.$slots,"default"),o.viewportUntil("tablet")?(d(),a("div",k,[h("button",{class:"icon-btn icon-btn--color-primary",onClick:n[2]||(n[2]=(...n)=>o.hideDropdown&&o.hideDropdown(...n))},[c(y,{name:"close",class:"icon-btn__icon"})])])):u("",!0)])],512)):u("",!0)])),_:3})],2)}]]);export{y as default};
