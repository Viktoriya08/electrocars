import{d as n,_ as t,h as a,o as i,b as s,w as e,m as o,a as p}from"./main-chunk-fdacad84.js";import{S as r}from"./swiper-chunk-c6612f7a.js";import{N as u}from"./navigation-chunk-12355359.js";import{P as l}from"./pagination-chunk-e82daf75.js";const d=n({name:"ContentSlider",components:{Swiper:r},setup:()=>({modules:[l,u]}),data:()=>({navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",type:"fraction"}})}),c=p("div",{class:"swiper-buttons"},[p("div",{class:"swiper-button swiper-button-prev"}),p("div",{class:"swiper-button swiper-button-next"})],-1),m=p("div",{class:"swiper-pagination"},null,-1);const w=t(d,[["render",function(n,t,p,r,u,l){const d=a("Swiper");return i(),s(d,{modules:n.modules,"slides-per-view":1,"space-between":0,navigation:n.navigation,pagination:n.pagination,speed:500,loop:!0},{"wrapper-start":e((()=>[o(n.$slots,"default")])),"container-end":e((()=>[c,m])),_:3},8,["modules","navigation","pagination"])}]]);export{w as default};