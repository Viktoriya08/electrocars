import{d as i,$ as n,_ as s,m as o}from"./main-chunk-fdacad84.js";const e=s(i({name:"ShareLink",mixins:[n],computed:{link:()=>window.location.href},methods:{copyLink(i){navigator.clipboard.writeText(this.link),this.showSuccessMessage(i)}}}),[["render",function(i,n,s,e,t,a){return o(i.$slots,"default",{copyLink:i.copyLink})}]]);export{e as default};