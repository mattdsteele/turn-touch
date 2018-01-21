/*! Built with http://stenciljs.com */
const{h,Context}=window.App;var __awaiter$1=function(t,e,n,c){return new(n||(n=Promise))(function(i,o){function r(t){try{a(c.next(t))}catch(t){o(t)}}function s(t){try{a(c.throw(t))}catch(t){o(t)}}function a(t){t.done?i(t.value):new n(function(e){e(t.value)}).then(r,s)}a((c=c.apply(t,e||[])).next())})};class TurnTouch{connect(){return __awaiter$1(this,void 0,void 0,function*(){const t=yield(yield(yield(yield navigator.bluetooth.requestDevice({optionalServices:["99c31523-dc4f-41b1-bb04-4e4deb81fadd"],filters:[{name:"Turn Touch Remote"}]})).gatt.connect()).getPrimaryService("99c31523-dc4f-41b1-bb04-4e4deb81fadd")).getCharacteristic("99c31525-dc4f-41b1-bb04-4e4deb81fadd");this.ch=t,yield t.startNotifications(),this.ch.addEventListener("characteristicvaluechanged",t=>{const e=t.target.value.getUint16(0);this.buttonPress.emit({number:e})})})}static get is(){return"turn-touch"}static get properties(){return{connect:{method:!0}}}static get events(){return[{name:"buttonPress",method:"buttonPress",bubbles:!0,cancelable:!0,composed:!0}]}}var __awaiter=function(t,e,n,c){return new(n||(n=Promise))(function(i,o){function r(t){try{a(c.next(t))}catch(t){o(t)}}function s(t){try{a(c.throw(t))}catch(t){o(t)}}function a(t){t.done?i(t.value):new n(function(e){e(t.value)}).then(r,s)}a((c=c.apply(t,e||[])).next())})};class MyApp{constructor(){this.mock=!1,this.connected=!1,this.connect=(()=>__awaiter(this,void 0,void 0,function*(){const t=this.el.shadowRoot.querySelector("turn-touch");yield t.connect(),this.connected=!0,this.strip=t})),this.emittedEvents=[]}get welcome(){return h("nav",null,h("button",{onClick:this.connect},"Connect"))}get events(){return h("ul",null,this.emittedEvents.map(t=>h("li",null,t)))}handlePress(t){this.emittedEvents=[t.detail.number,...this.emittedEvents]}render(){return h("div",null,h("turn-touch",null),this.connected?this.events:this.welcome)}static get is(){return"my-app"}static get encapsulation(){return"shadow"}static get properties(){return{connected:{state:!0},el:{elementRef:!0},emittedEvents:{state:!0}}}static get style(){return"*[data-my-app]{box-sizing:border-box}[data-my-app-host]{display:block}nav[data-my-app]{background-color:#000;display:flex;flex-direction:column;justify-content:center;height:100vh}img[data-my-app]{max-width:100%}input[type=color][data-my-app]{-webkit-appearance:default-button;width:100%;margin:0;padding:0}h1[data-my-app]{color:#fff;font-size:18vw;font-weight:500;margin:0;width:100%}button[data-my-app]{font-size:7vw;width:100%;padding:12px;margin-top:10px;border:1px solid #000}#color[data-my-app]{visibility:hidden}.color-picker[data-my-app]{width:100%;margin:0;border:1px solid #000;text-align:center;font-size:9vw}.color-picker[data-my-app]   h2[data-my-app]{margin:0}"}}export{MyApp,TurnTouch};