if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let t={};const c=e=>i(e,o),l={module:{uri:o},exports:t,require:c};s[o]=Promise.all(r.map((e=>l[e]||c(e)))).then((e=>(n(...e),t)))}}define(["./workbox-cbf83eee"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-B5rAETQt.css",revision:null},{url:"assets/index-CfoDvoSD.js",revision:null},{url:"config.js",revision:"841ca44f184ca265693b5af68d698747"},{url:"index.html",revision:"4611c819d97c83f4d51c149a2b48ec28"},{url:"override.css",revision:"983f4d12896fe67ec86e666b1011bff2"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"6c20eeb59de788f353a74367889acdf6"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));