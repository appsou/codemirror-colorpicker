(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{200:function(t,e,i){},320:function(t,e,i){"use strict";var r=i(200);i.n(r).a},357:function(t,e,i){"use strict";i.r(e);var r=i(145),s={props:["title","description","red","blue","green","black"],data:function(){return{filteredImageSrc:null,filterBlack:this.black||!1,filterRed:this.red||!1,filterGreen:this.green||!1,filterBlue:this.blue||!1,imageSrc:"/resources/image/grapes.jpg"}},methods:{view_histogram:function(){var t=this;r.Color.ImageToHistogram(this.imageSrc,(function(e){t.filteredImageSrc=e}),{black:this.filterBlack,red:this.filterRed,green:this.filterGreen,blue:this.filterBlue,width:210,height:160})}},mounted:function(){this.view_histogram()}},a=(i(320),i(29)),l=Object(a.a)(s,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"image-filter"},[i("h1",{staticClass:"title"},[t._v(t._s(t.title))]),t._v(" "),i("div",{staticClass:"viewer"},[i("div",{staticClass:"item"},[i("img",{ref:"img",attrs:{src:t.imageSrc,width:"210px",height:"160px"}})]),t._v(" "),i("div",{staticClass:"item"},[i("img",{ref:"convert",attrs:{width:"210px",height:"160px",src:t.filteredImageSrc}})])]),t._v(" "),i("div",{staticClass:"description"},[t._v("\n        "+t._s(t.description)+"\n\n    ")])])}),[],!1,null,"59f5036e",null);e.default=l.exports}}]);