!function(e){var t={};function n(a){if(t[a])return t[a].exports;var i=t[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(a,i,function(t){return e[t]}.bind(null,i));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(1);let a=null,i=null,l=null,c=null,s=null,r=null,o=null;const u=document.querySelector(".list-of-years"),d=document.querySelector(".filter"),p=document.querySelector(".filter-heading"),m=document.querySelector(".filter-content"),g=document.querySelector(".card-container"),f=document.querySelector(".pages");let h=null;(()=>{for(let e=2006;e<=2020;e++){const t=document.createElement("li");t.appendChild(document.createTextNode(e.toString())),u.appendChild(t)}})();p.addEventListener("click",()=>{p.classList.toggle("active"),m.classList.toggle("active")});const v=e=>{let t=parseInt(o.length/12)+(o.length%12>0&&1);const n=document.createElement("ul");for(let e=1;e<=t;e++){const t=document.createElement("li");t.appendChild(document.createTextNode(e.toString())),n.appendChild(t)}n.childNodes[0].classList.add("active"),f.appendChild(n)},L=e=>{e.forEach((e,t)=>{const n=document.createElement("div");n.classList.add("card","p-1","my-1"),n.innerHTML=`\n            <ul>\n                <li class="logo">${e.links.mission_patch_small?`<img src=${e.links.mission_patch_small} />`:'<img src="imgs/attachment-no-image-available.png" alt="not available">'}</li>\n                <li><span>${e.mission_name} #${e.flight_number}</span></li>\n                <li><span>Mission IDs:</span> <ul class="mission-id${t}"></ul></li>\n                <li><span>Launch Year:</span> ${e.launch_year}</li>\n                <li><span>Succesful Launch:</span> ${e.launch_success}</li>\n                <li><span>Succesful Landing:</span> ${e.mission_id.length>0}</li>\n            </ul>\n        `,g.appendChild(n);const a=document.querySelector(".mission-id"+t);e.mission_id.forEach(e=>{const t=document.createElement("span"),n=document.createTextNode(e.toString());t.appendChild(n),a.appendChild(t)}),0==e.mission_id.length&&a.appendChild(document.createElement("li").appendChild(document.createTextNode("NA")))})};(async()=>{if(!o){const e=await fetch("https://api.spaceXdata.com/v3/launches?limit=100"),t=await e.json();o=t}v(o.length);const e=o.slice(0,12);L(e)})();(async()=>{d.addEventListener("click",async e=>{if("LI"===e.target.tagName){let t=e.target;"Launch Year"===e.target.parentNode.previousElementSibling.innerText&&(c=e.target.innerText.toLowerCase(),a&&a.classList.remove("active"),t.classList.add("active"),a=t),"Successful Launch"===e.target.parentNode.previousElementSibling.innerText&&(s=e.target.innerText.toLowerCase(),i&&i.classList.remove("active"),t.classList.add("active"),i=t),"Successful Landing"===e.target.parentNode.previousElementSibling.innerText&&(r=e.target.innerText.toLowerCase(),l&&l.classList.remove("active"),t.classList.add("active"),l=t);const n=`https://api.spaceXdata.com/v3/launches?limit=30${c?"&launch_year="+c:""}${s?"&launch_success="+s:""}${r?"&land_success="+r:""}`,u=await fetch(n),d=await u.json();o=d;const p=o.slice(0,12);console.log(p),g.innerHTML="",f.innerHTML="",v(o.length),L(p)}})})();f.addEventListener("click",e=>{if("LI"==e.target.tagName){h||(h=f.childNodes[0].childNodes[0]),h.classList.remove("active"),e.target.classList.add("active"),h=e.target;const t=12*(parseInt(e.target.innerText)-1),n=o.slice(t,t+12);g.innerHTML="",L(n)}})},function(e,t,n){}]);