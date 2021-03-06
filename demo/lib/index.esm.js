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
***************************************************************************** */
function t(t,e,i,s){return new(i||(i=Promise))((function(a,n){function o(t){try{u(s.next(t))}catch(t){n(t)}}function r(t){try{u(s.throw(t))}catch(t){n(t)}}function u(t){var e;t.done?a(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,r)}u((s=s.apply(t,e||[])).next())}))}class e{constructor(){this.taskMap=new Map,this.started=!1,this.forceStoped=!1,this.events=this.hanleVisible.bind(this),this.autoReleaseAndReset(this.events)}createInterval(e,i){let s=setTimeout((function a(){return t(this,void 0,void 0,(function*(){clearTimeout(e.timerId),e.paused||(yield e()),s=setTimeout(a,i),e.timerId=s}))}),i);e.timerId=s}add(t,e){const i=Date.now();return t.time=e,t.uuid=i,this.taskMap.set(i,t),this}start(e=!1){this.started=!0,this.taskMap.forEach((i=>t(this,void 0,void 0,(function*(){e?yield i():i.paused=!1,this.createInterval(i,i.time)}))))}remove(t){t.paused=!0;const e=t.timerId;window.clearTimeout(e),this.taskMap.delete(t.uuid)}stop(t=!1){this.started=!1,this.forceStoped=t,this.pauseAll()}clear(){this.taskMap.forEach((t=>this.remove(t)))}pause(t){t.paused=!0}pauseAll(){this.taskMap.forEach((t=>this.pause(t)))}hanleVisible(){"hidden"===document.visibilityState?(console.info("auto pause all interval"),this.pauseAll()):(console.info("auto restart all interval"),this.forceStoped||this.start())}autoReleaseAndReset(t){document.addEventListener("visibilitychange",t,!1)}removeEvents(){this.events&&document.removeEventListener("visibilitychange",this.events)}}export{e as default};
