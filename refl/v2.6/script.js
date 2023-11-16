var title_interval,title_timeout,search_params=new URLSearchParams(location.search),recently_redirected_links=JSON.parse(localStorage.getItem("recently_redirected_links"))||[],_token=search_params.get("token"),standby_time=0,b64encode=e=>btoa(e).split("=").join(""),b64decode=e=>atob(e);function isJSON(e){if("object"==typeof e&&null!==e)return!0;try{JSON.parse(e)}catch(t){return!1}return!0}function generateRandomBuffer(e){let t=new Uint8Array(e);return crypto.getRandomValues(t),String.fromCharCode(...t)}function generateRandomHex(e){let t=new Uint8Array(e);return crypto.getRandomValues(t),Array.from(t).map(e=>e.toString(16).padStart(2,"0")).join("")}async function SHA256(e){isJSON(e)&&(e=JSON.stringify(e));let t=new TextEncoder().encode(e);return console.log(e,Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",t))).map(e=>e.toString(16).padStart(2,"0")).join("")),Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",t))).map(e=>e.toString(16).padStart(2,"0")).join("")}function blinkTitle(e){clearInterval(title_interval),clearTimeout(title_timeout),document.title=e,title_interval=setInterval(()=>{document.title=e,title_timeout=setTimeout(()=>document.title="RefL",2e3)},4e3)}function startTimer(e,t){clearInterval(title_interval),clearTimeout(title_timeout),function i(){if(0===e)return t();document.title="Please wait for "+e+" seconds",info.innerText="Please wait for "+e+" seconds",e--,setTimeout(i,1e3)}()}function sleep(e){return new Promise(t=>setTimeout(t,e))}history.pushState("","","/redirection?token="+b64encode(generateRandomBuffer(256))),document.addEventListener("DOMContentLoaded",async()=>{let e=_token;_token=void 0;let t=document.querySelector("#info"),i=recently_redirected_links.filter(e=>e.expiration_until<=Date.now());function n(){document.querySelector("#cookieChoiceInfo")?document.querySelector("#cookieChoiceInfo").remove():setTimeout(()=>n())}document.title="Please wait...",t.innerText="Please wait...",n();for(let r=0;r<i.length;r++)recently_redirected_links.splice(recently_redirected_links.indexOf(i[r]),1);if(localStorage.setItem("recently_redirected_links",JSON.stringify(recently_redirected_links)),!e){blinkTitle("Error Redirection Token"),t.innerText="Error Redirection Token";return}try{let{verified:l,referral_links:o,target_link_url:a}=JSON.parse(b64decode(e));if(void 0===l||void 0===o||void 0===a)throw Error();await sleep(1e3);let s=await (async()=>{for(let e=0;e<o.length;e++){let t=o[e].acc_id?await SHA256(o[e].url.split("http://").join("").split("https://").join("").split("/")[0]+"#"+o[e].acc_id+"@"+__ip_addr):await SHA256(o[e].url.split("http://").join("//").split("https://").join("//")+"@"+__ip_addr);if(!recently_redirected_links.find(e=>e.hash===t&&e.expiration_until>=Date.now()))return o[e]}})();startTimer(standby_time,async()=>{if(!0===l&&s){let e=s.acc_id?await SHA256(s.url.split("http://").join("").split("https://").join("").split("/")[0]+"#"+s.acc_id+"@"+__ip_addr):await SHA256(s.url.split("http://").join("//").split("https://").join("//")+"@"+__ip_addr);recently_redirected_links.push({hash:e,expiration_until:Date.now()+ms(s.expiration_until)}),localStorage.setItem("recently_redirected_links",JSON.stringify(recently_redirected_links))}document.title="Redirecting...",t.innerText="Redirecting...",await sleep(1e3),location.href=(!0===l?a:s?.url||a).split("http://").join("//").split("https://").join("//")})}catch(c){blinkTitle("Error Redirection Token"),t.innerText="Error Redirection Token";return}});
