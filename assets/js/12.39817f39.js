(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{202:function(t,o,r){"use strict";var e=r(1),s=r(65),n=r(15),i=r(3),a=r(31),c=[],l=c.sort,u=i((function(){c.sort(void 0)})),v=i((function(){c.sort(null)})),d=a("sort");e({target:"Array",proto:!0,forced:u||!v||!d},{sort:function(t){return void 0===t?l.call(n(this)):l.call(n(this),s(t))}})},204:function(t,o,r){},323:function(t,o,r){"use strict";var e=r(204);r.n(e).a},354:function(t,o,r){"use strict";r.r(o);r(43),r(202);var e=r(145),s={props:["title","description","count"],data:function(){return{paletteColors:[],textColors:[],colorCount:this.count||10,imageSrc:"/resources/image/grapes.jpg"}},methods:{generate:function(){var t=this;e.Color.ImageToRGB(this.imageSrc,{maxWidth:100},(function(o){t.paletteColors=e.Color.palette(o,t.colorCount).map((function(t){var o=e.Color.contrast(t);return{color:t,contrast:o,textColor:o>=128?"black":"white"}})).sort((function(t,o){return t.contrast===o.contrast?0:t.contrast>o.contrast?1:-1}))}))}},mounted:function(){this.generate()}},n=(r(323),r(29)),i=Object(n.a)(s,(function(){var t=this,o=t.$createElement,r=t._self._c||o;return r("div",{staticClass:"image-palette"},[r("h3",{staticClass:"title"},[t._v(t._s(t.title))]),t._v(" "),r("div",{staticClass:"viewer"},[r("div",{staticClass:"item"},[r("img",{ref:"img",attrs:{src:t.imageSrc,width:"210px",height:"160px"}})]),t._v(" "),r("div",{staticClass:"tools"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.colorCount,expression:"colorCount"}],attrs:{type:"range",min:1,max:100,step:1},domProps:{value:t.colorCount},on:{change:t.generate,__r:function(o){t.colorCount=o.target.value}}}),t._v(" "+t._s(t.colorCount)+" colors \n\n            "),r("div",{staticClass:"description"},[t._v("\n                "+t._s(t.description)+"\n            ")])])]),t._v(" "),r("div",{staticClass:"colors"},t._l(t.paletteColors,(function(o,e){return r("div",{key:e,staticClass:"color-item",style:{"background-color":o.color,color:o.textColor}},[t._v(t._s(o.color))])})),0)])}),[],!1,null,"984755d2",null);o.default=i.exports}}]);