/*
Copyright 2012, KISSY UI Library v1.40dev
MIT Licensed
build time: Nov 7 17:23
*/
KISSY.add("event/dom/touch/gesture",function(h,f){var e=f.Gesture,g=h.Features,b,k,i;g.isTouchSupported?(b="touchstart",k="touchmove",i="touchend"):g.isMsPointerEnabled&&(b="MSPointerDown",k="MSPointerMove",i="MSPointerUp");b&&(e.start=b,e.move=k,e.end=i,e.tap="tap");return e},{requires:["event/dom/base"]});KISSY.add("event/dom/touch/handle-map",function(){return{}});
KISSY.add("event/dom/touch/handle",function(h,f,e,g,b){function k(a){this.doc=a;this.eventHandle={};this.init()}var i=h.guid("touch-handle"),l=h.Features,j={};j[b.start]="onTouchStart";j[b.move]="onTouchMove";j[b.end]="onTouchEnd";"mousedown"!==b.start&&(j.touchcancel="onTouchEnd");k.prototype={init:function(){var a=this.doc,d,c;this.onTouchMove=h.throttle(this.onTouchMove,30);for(d in j){c=j[d];g.on(a,d,this[c],this)}},normalize:function(a){var d=a.type,c;if(!l.isTouchSupported){if(d.indexOf("mouse")!=
-1&&a.which!=1)return;c=[a];d=!d.match(/up$/i);a.touches=d?c:[];a.targetTouches=d?c:[];a.changedTouches=c}return a},onTouchStart:function(a){var d,c;for(d in this.eventHandle){c=this.eventHandle[d];c.isActive=true}this.callEventHandle("onTouchStart",a)},onTouchMove:function(a){this.callEventHandle("onTouchMove",a)},onTouchEnd:function(a){this.callEventHandle("onTouchEnd",a)},callEventHandle:function(a,d){var c,b;if(d=this.normalize(d))for(c in this.eventHandle){b=this.eventHandle[c];if(b.isActive&&
b[a](d)===false)b.isActive=false}},addEventHandle:function(a){this.eventHandle[a]||(this.eventHandle[a]=new e[a])},removeEventHandle:function(a){delete this.eventHandle[a]},destroy:function(){var a=this.doc,d,c;for(d in j){c=j[d];g.detach(a,d,this[c],this)}}};return{addDocumentHandle:function(a,d){var c=f._getWin(a.ownerDocument||a).document,b=f.data(c,i);b||f.data(c,i,b=new k(c));b.addEventHandle(d)},removeDocumentHandle:function(a,b){var c=f._getWin(a.ownerDocument||a).document,e=f.data(c,i);if(e){e.removeEventHandle(b);
if(h.isEmptyObject(eventHandle)){e.destroy();f.removeData(c,i)}}}}},{requires:["dom","./handle-map","event/dom/base","./gesture","./tap"]});KISSY.add("event/dom/touch/tap",function(h,f,e){function g(){}g.prototype={onTouchStart:function(b){if(1<b.touches.length)return!1},onTouchMove:function(){return!1},onTouchEnd:function(b){e.fire(b.target,"tap",b)}};return f.tap=g},{requires:["./handle-map","event/dom/base"]});
KISSY.add("event/dom/touch",function(h,f,e,g){var h=f._Special,f={setup:function(b){g.addDocumentHandle(this,b)},tearDown:function(b){g.removeDocumentHandle(this,b)}},b;for(b in e)h[b]=f},{requires:["event/dom/base","./touch/handle-map","./touch/handle"]});