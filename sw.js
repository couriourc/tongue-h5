if(!self.define){let e,i={};const s=(s,r)=>(s=new URL(s+".js",r).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(r,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const c=e=>s(e,o),l={module:{uri:o},exports:t,require:c};i[o]=Promise.all(r.map((e=>l[e]||c(e)))).then((e=>(n(...e),t)))}}define(["./workbox-cbf83eee"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-B5rAETQt.css",revision:null},{url:"assets/index-DJBi7rbl.js",revision:null},{url:"config.js",revision:"841ca44f184ca265693b5af68d698747"},{url:"index.html",revision:"78dfe8964b6155b3cb911c0acf47d762"},{url:"override.css",revision:"983f4d12896fe67ec86e666b1011bff2"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"img/logo.png",revision:"f00daab6a15eeb109bc405c6f9ead8cf"},{url:"manifest.webmanifest",revision:"7a8f52d405c8155e85d453eedac9c727"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
