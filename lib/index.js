!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).IntervalCenter=t()}(this,(function(){"use strict";
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */function e(e,t,i,s){return new(i||(i=Promise))((function(n,a){function o(e){try{u(s.next(e))}catch(e){a(e)}}function r(e){try{u(s.throw(e))}catch(e){a(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(o,r)}u((s=s.apply(e,t||[])).next())}))}return class{constructor(){this.taskMap=new Map,this.started=!1,this.forceStoped=!1,this.events=this.hanleVisible.bind(this),this.autoReleaseAndReset(this.events)}createInterval(t,i){let s=setTimeout((function n(){return e(this,void 0,void 0,(function*(){clearTimeout(t.timerId),t.paused||(yield t()),s=setTimeout(n,i),t.timerId=s}))}),i);t.timerId=s}add(e,t){const i=Date.now();return e.time=t,e.uuid=i,this.taskMap.set(i,e),this}start(t=!1){this.started=!0,this.taskMap.forEach((i=>e(this,void 0,void 0,(function*(){t?yield i():i.paused=!1,this.createInterval(i,i.time)}))))}remove(e){e.paused=!0;const t=e.timerId;window.clearTimeout(t),this.taskMap.delete(e.uuid)}stop(e=!1){this.started=!1,this.forceStoped=e,this.pauseAll()}clear(){this.taskMap.forEach((e=>this.remove(e)))}pause(e){e.paused=!0}pauseAll(){this.taskMap.forEach((e=>this.pause(e)))}hanleVisible(){"hidden"===document.visibilityState?(console.info("auto pause all interval"),this.pauseAll()):(console.info("auto restart all interval"),this.forceStoped||this.start())}autoReleaseAndReset(e){document.addEventListener("visibilitychange",e,!1)}removeEvents(){this.events&&document.removeEventListener("visibilitychange",this.events)}}}));
