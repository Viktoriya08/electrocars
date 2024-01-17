import{d as o,E as i,_ as t,h as e,k as s,l as n,o as d,c as r,a as l,m as p,i as w,w as h,x as a,z as c,v as m,T as u,p as g,q as v}from"./main-chunk-0e8e2f38.js";import{I as f}from"./IconSVG-chunk-f0bb442a.js";const x=o({name:"BaseDropdown",components:{IconSVG:f},props:{showOnClick:{type:Boolean,default:!1},rtl:{type:Boolean,default:!1},colorScheme:{type:String,default:()=>"default"},isFixed:{type:Boolean,default:!1}},setup:()=>({viewportUntil:i("viewportUntil")}),data:()=>({dropdownWillHide:!1,dropdownHideTimeout:null,dropdownShown:!1,position:{}}),computed:{showEvents(){return this.showOnClick?"click":"mouseenter"},hideEvents(){return this.showOnClick?"":"mouseleave"}},methods:{showDropdown(){this.dropdownShown?this.dropdownWillHide=!1:(this.getPosition(),this.isFixed&&window.addEventListener("scroll",this.getPosition),this.dropdownShown=!0)},startHidingDropdown(){this.dropdownWillHide=!0,this.dropdownHideTimeout&&clearTimeout(this.dropdownHideTimeout),this.dropdownHideTimeout=setTimeout((()=>{this.dropdownWillHide&&this.hideDropdown()}),500)},getPosition(){this.isFixed||(this.position={});const o=this.$refs.element;o||(this.position={});const i=o.getBoundingClientRect(),t=this.isFixed?i.top+i.height+8:i.height+8,e=this.isFixed?i.left:0,s=this.isFixed?window.innerWidth-i.right:0;this.position=this.viewportUntil("mobile-xl")?{}:{top:`${t}px`,position:this.isFixed?"fixed":"absolute",...i.left>window.innerWidth/2?{right:`${s}px`}:{left:`${e}px`}}},hideDropdown(){this.dropdownWillHide=!1,this.dropdownShown=!1,this.isFixed&&window.removeEventListener("scroll",this.getPosition)},mobileClickHandler(){this.viewportUntil("mobile-xl")&&this.hideDropdown()}}}),H={class:"dropdown__trigger"},S={class:"dropdown__trigger-text"},k={class:"dropdown__content"};const _=t(x,[["render",function(o,i,t,f,x,_){const D=e("IconSVG"),C=s("click-outside");return n((d(),r("div",g({ref:"element",class:["dropdown",[{active:o.dropdownShown},`dropdown--${o.colorScheme}`,{"dropdown--rtl":o.rtl}]]},{[v(o.showEvents)]:i[1]||(i[1]=(...i)=>o.showDropdown&&o.showDropdown(...i))},{[v(o.hideEvents)]:i[2]||(i[2]=(...i)=>o.startHidingDropdown&&o.startHidingDropdown(...i))}),[l("div",H,[p(o.$slots,"default",{dropdownShown:o.dropdownShown},(()=>[l("span",S,[p(o.$slots,"trigger-text")]),w(D,{name:"chevron-down",class:"dropdown__icon"})]))]),w(u,{name:"dropdown"},{default:h((()=>[n(l("div",{class:"dropdown__body",style:a(o.position),onClick:i[0]||(i[0]=c(((...i)=>o.mobileClickHandler&&o.mobileClickHandler(...i)),["self","stop"]))},[l("div",k,[p(o.$slots,"dropdown")])],4),[[m,o.dropdownShown]])])),_:3})],16)),[[C,o.hideDropdown]])}]]);export{_ as default};