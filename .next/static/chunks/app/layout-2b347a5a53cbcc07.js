(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{3524:function(e,t,n){Promise.resolve().then(n.t.bind(n,2445,23)),Promise.resolve().then(n.bind(n,3491)),Promise.resolve().then(n.t.bind(n,6087,23))},3491:function(e,t,n){"use strict";n.r(t),n.d(t,{ThemeProvider:function(){return b}});var r=n(7437),s=n(2265),o=(e,t,n,r,s,o,a,l)=>{let i=document.documentElement,c=["light","dark"];function m(t){(Array.isArray(e)?e:[e]).forEach(e=>{let n="class"===e,r=n&&o?s.map(e=>o[e]||e):s;n?(i.classList.remove(...r),i.classList.add(o&&o[t]?o[t]:t)):i.setAttribute(e,t)}),l&&c.includes(t)&&(i.style.colorScheme=t)}if(r)m(r);else try{let e=localStorage.getItem(t)||n,r=a&&"system"===e?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":e;m(r)}catch(e){}},a=["light","dark"],l="(prefers-color-scheme: dark)",i="undefined"==typeof window,c=s.createContext(void 0),m=e=>s.useContext(c)?s.createElement(s.Fragment,null,e.children):s.createElement(u,{...e}),d=["light","dark"],u=e=>{let{forcedTheme:t,disableTransitionOnChange:n=!1,enableSystem:r=!0,enableColorScheme:o=!0,storageKey:i="theme",themes:m=d,defaultTheme:u=r?"system":"light",attribute:b="data-theme",value:g,children:v,nonce:w,scriptProps:E}=e,[S,_]=s.useState(()=>f(i,u)),[k,C]=s.useState(()=>"system"===S?p():S),T=g?Object.values(g):m,L=s.useCallback(e=>{let t=e;if(!t)return;"system"===e&&r&&(t=p());let s=g?g[t]:t,l=n?y(w):null,i=document.documentElement,c=e=>{"class"===e?(i.classList.remove(...T),s&&i.classList.add(s)):e.startsWith("data-")&&(s?i.setAttribute(e,s):i.removeAttribute(e))};if(Array.isArray(b)?b.forEach(c):c(b),o){let e=a.includes(u)?u:null,n=a.includes(t)?t:e;i.style.colorScheme=n}null==l||l()},[w]),A=s.useCallback(e=>{let t="function"==typeof e?e(S):e;_(t);try{localStorage.setItem(i,t)}catch(e){}},[S]),P=s.useCallback(e=>{C(p(e)),"system"===S&&r&&!t&&L("system")},[S,t]);s.useEffect(()=>{let e=window.matchMedia(l);return e.addListener(P),P(e),()=>e.removeListener(P)},[P]),s.useEffect(()=>{let e=e=>{e.key===i&&(e.newValue?_(e.newValue):A(u))};return window.addEventListener("storage",e),()=>window.removeEventListener("storage",e)},[A]),s.useEffect(()=>{L(null!=t?t:S)},[t,S]);let N=s.useMemo(()=>({theme:S,setTheme:A,forcedTheme:t,resolvedTheme:"system"===S?k:S,themes:r?[...m,"system"]:m,systemTheme:r?k:void 0}),[S,A,t,k,r,m]);return s.createElement(c.Provider,{value:N},s.createElement(h,{forcedTheme:t,storageKey:i,attribute:b,enableSystem:r,enableColorScheme:o,defaultTheme:u,value:g,themes:m,nonce:w,scriptProps:E}),v)},h=s.memo(e=>{let{forcedTheme:t,storageKey:n,attribute:r,enableSystem:a,enableColorScheme:l,defaultTheme:i,value:c,themes:m,nonce:d,scriptProps:u}=e,h=JSON.stringify([r,n,i,t,m,c,a,l]).slice(1,-1);return s.createElement("script",{...u,suppressHydrationWarning:!0,nonce:"undefined"==typeof window?d:"",dangerouslySetInnerHTML:{__html:"(".concat(o.toString(),")(").concat(h,")")}})}),f=(e,t)=>{let n;if(!i){try{n=localStorage.getItem(e)||void 0}catch(e){}return n||t}},y=e=>{let t=document.createElement("style");return e&&t.setAttribute("nonce",e),t.appendChild(document.createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(t),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(t)},1)}},p=e=>(e||(e=window.matchMedia(l)),e.matches?"dark":"light");function b(e){let{children:t,...n}=e;return(0,r.jsx)(m,{...n,children:t})}},2445:function(){},6087:function(e){e.exports={style:{fontFamily:"'__Inter_d65c78', '__Inter_Fallback_d65c78'",fontStyle:"normal"},className:"__className_d65c78"}}},function(e){e.O(0,[971,69,744],function(){return e(e.s=3524)}),_N_E=e.O()}]);