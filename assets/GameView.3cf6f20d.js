import{L as I,S as B,R as F,P as j,H as z}from"./LoadModal.212fd920.js";import{F as G,r as s,o as l,c as f,a as v,b as U,w as c,d as o,e as _,t as g,S as V,f as H,g as O,h as Y,i as E,j as L,k as r,l as N,p as K,m as q}from"./index.aea1a63b.js";import{_ as M,W as Q}from"./WebFrame.7c82a093.js";import{a as X}from"./api.6933fb8f.js";class C{constructor(t,n,d){this._rows=t,this._cols=n,this._cells=d}get rows(){return this._rows}set rows(t){this._rows=t}get cols(){return this._cols}set cols(t){this._cols=t}get cells(){return this._cells}set cells(t){this._cells=t}static from(t){return Object.assign(new C,t)}}const D={name:"LoadingIcon",components:{FontAwesomeIcon:G},props:{error:{type:Boolean,default:!1}}},J={class:"loading"};function Z(e,t,n,d,a,u){const p=s("font-awesome-icon");return l(),f("div",J,[n.error?n.error?(l(),v(p,{key:1,size:"10x",class:"fa-fade",icon:"fa-solid fa-bolt-lightning"})):U("",!0):(l(),v(p,{key:0,size:"10x",spin:!0,icon:"fa-solid fa-spinner"}))])}const ee=M(D,[["render",Z],["__scopeId","data-v-9cff2bd9"]]);const te={name:"GameOverModal",props:{winner:{type:Number,required:!0}},methods:{reset:function(){X("reset").then(e=>{e.ok&&location.reload()})},close:function(){this.$emit("close")}}};function oe(e,t,n,d,a,u){const p=s("v-card-title"),b=s("v-card-subtitle"),k=s("v-card-text"),h=s("v-btn"),w=s("v-card-actions"),y=s("v-card"),S=s("v-dialog");return l(),v(S,null,{default:c(()=>[o(y,{class:"mx-auto text-center hexa"},{default:c(()=>[o(p,{class:"headline text-h4 py-lg-3"},{default:c(()=>[_("GAME OVER")]),_:1}),o(b,{class:"text-h5 py-lg-1"},{default:c(()=>[_(g(n.winner===0?"It's a tie!":"Player "+n.winner+" wins!"),1)]),_:1}),o(k,null,{default:c(()=>[_(" To start a new game, click on the reset button in the action menu. Thanks for playing! ")]),_:1}),o(w,{class:"justify-center"},{default:c(()=>[o(h,{variant:"outlined",onClick:u.reset},{default:c(()=>[_("Reset")]),_:1},8,["onClick"]),o(h,{onClick:u.close},{default:c(()=>[_("Close")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})}const se=M(te,[["render",oe],["__scopeId","data-v-50edd4d0"]]);const ne=["X","O"],m=["GAME OVER","Your turn","Waiting for other player...","You are spectator"],ae="Requesting player number",R="Player number: ",re="Keep alive",ce="ping",ie={name:"GameView",components:{FontAwesomeIcon:G,GameOverModal:se,LoadModal:I,SaveModal:B,ResetModal:F,WebFrame:Q,LoadingIcon:ee,PlayerStone:j,HexTile:z},data(){return{socket:void 0,loading:Boolean,errorOnLoad:Boolean,counter1:"",counter2:"",gameStatus:"",playerNumber:"",game:void 0,snackbar:!1,msg:String,gameOverModal:!1,winner:Number}},errorCaptured(){this.errorOnLoad=!0},mounted(){this.errorOnLoad=!1,fetch(V+"/game",{method:"GET",headers:{Accept:"application/json"}}).then(e=>{if(e.ok)return e.json();throw new Error("Something went wrong")}).then(e=>{this.updateGame(e),this.loading=!1,this.errorOnLoad=!1}).catch(e=>{console.log(e),this.errorOnLoad=!0}),this.socket=new WebSocket(H+"/ws"),this.socket.onopen=()=>{console.log("WebSocket connection established"),this.socket.send(ae),setInterval(()=>this.socket.send(ce),2e4)},this.socket.onmessage=e=>{const t=e.data;if(t.startsWith(R))this.playerNumber=t.split(" ")[2],console.log(`${R} ${this.playerNumber}`),this.initStatus();else if(t===re)console.log("[ping] "+t);else{const n=JSON.parse(t);this.updateGame(n)}},this.socket.onclose=e=>{e.wasClean?console.log(`[close] Connection closed cleanly, code=${e.code} reason=${e.reason}`):(console.log("[close] Connection died"),this.errorOnLoad=!0)},this.socket.onerror=e=>{console.error(`[error] ${e.message}`),this.errorOnLoad=!0}},beforeUnmount(){this.socket&&this.socket.close()},methods:{doAction:async function(e){const t=await fetch(`${V}/`+e,{method:"POST",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"},body:""});t.ok?(this.$refs.frame.soundToggle&&(O.paused?await O.play():O.currentTime=0),this.socket.send(`Action done: ${e} -> Response: ${await t.text()}`)):this.triggerToast(await t.text())},clickTile:async function(e,t){switch(this.playerNumber){case"1":case"2":await this.doAction(`place/${t}/${e}/${ne[this.playerNumber-1]}`);break;default:this.triggerToast(m[3])}},updateGame:function(e){var d;this.updateCounter(e),(this.playerNumber==="1"||this.playerNumber==="2")&&this.updateStatus(e.turn),this.updateField(e);const t=e.xcount,n=e.ocount;t+n===((d=this.$refs.hex)==null?void 0:d.length)&&(this.gameOver(),this.updateStatus(0))},gameOver:function(){this.$refs.frame.soundToggle&&Y.play(),this.winner=this.counter1>this.counter2?1:this.counter1<this.counter2?2:0,this.gameOverModal=!0},getCell:function(e,t){const n=this.game.field.cells.find(d=>d.row===e&&d.col===t);return n!=null&&n.cell?n.cell:" "},initStatus:function(){switch(this.playerNumber){case"1":this.gameStatus=m[1];break;case"2":this.gameStatus=m[2];break;default:this.gameStatus=m[3];break}},updateStatus:function(e){switch(e.toString()){case"0":this.gameStatus=m[0];break;case this.playerNumber:this.gameStatus=m[1];break;default:this.gameStatus=m[2];break}},updateCounter:function(e){this.counter1=e.xcount,this.counter2=e.ocount},updateField:function(e){this.game=C.from(e)},triggerToast:function(e){this.$refs.frame.soundToggle&&(E.paused?E.play():E.currentTime=0),this.msg=e,this.snackbar=!0}}},T=e=>(K("data-v-0273799f"),e=e(),q(),e),le={key:1,class:"container"},de={class:"game-container"},ue={class:"header"},_e={class:"counter"},me={class:"status"},pe={class:"counter"},he={class:"tileRow"},fe={class:"dropup actionbutton text-capitalize p-3"},ge={id:"dropdownGameButtons","aria-expanded":"false",class:"btn btn-light dropdown-toggle text-capitalize fs-4","data-bs-toggle":"dropdown",type:"button"},ve={"aria-labelledby":"dropdownGameButtons",class:"dropdown-menu"},be=T(()=>r("span",{id:"save",class:"dropdown-item","data-bs-target":"#saveModal","data-bs-toggle":"modal"},"save",-1)),ke=T(()=>r("span",{id:"load",class:"dropdown-item","data-bs-target":"#loadModal","data-bs-toggle":"modal"},"load",-1)),we=T(()=>r("span",{id:"reset",class:"dropdown-item","data-bs-target":"#resetModal","data-bs-toggle":"modal"},"reset",-1)),ye={class:"toast-holder"};function Se(e,t,n,d,a,u){const p=s("LoadingIcon"),b=s("PlayerStone"),k=s("HexTile"),h=s("font-awesome-icon"),w=s("WebFrame"),y=s("ResetModal"),S=s("SaveModal"),A=s("LoadModal"),P=s("GameOverModal"),W=s("v-btn"),$=s("v-snackbar");return l(),f(L,null,[o(w,{ref:"frame"},{default:c(()=>[a.loading?(l(),v(p,{key:0,error:a.errorOnLoad},null,8,["error"])):(l(),f("div",le,[r("div",de,[r("div",ue,[r("h2",_e,[o(b,{player:"X"}),_(" : "+g(a.counter1),1)]),r("h2",me,g(a.gameStatus),1),r("h2",pe,[o(b,{player:"O"}),_(" : "+g(a.counter2),1)])]),(l(!0),f(L,null,N(a.game.field.rows,i=>(l(),f("div",{key:i-1,class:"row"},[r("div",he,[(l(!0),f(L,null,N(a.game.field.cols,x=>(l(),v(k,{key:x-1,ref_for:!0,ref:"hex",stone:u.getCell(i-1,x-1),onClick:xe=>u.clickTile(i-1,x-1)},null,8,["stone","onClick"]))),128))])]))),128))]),r("div",fe,[r("button",ge,[o(h,{class:"mt-1",icon:"keyboard",size:"1x"}),_(" actions ")]),r("div",ve,[r("span",{id:"undo",class:"dropdown-item",onClick:t[0]||(t[0]=i=>u.doAction("undo"))},"undo"),r("span",{id:"redo",class:"dropdown-item",onClick:t[1]||(t[1]=i=>u.doAction("redo"))},"redo"),be,ke,we])])]))]),_:1},512),o(y),o(S),o(A),o(P,{modelValue:a.gameOverModal,"onUpdate:modelValue":t[2]||(t[2]=i=>a.gameOverModal=i),winner:a.winner,onClose:t[3]||(t[3]=i=>a.gameOverModal=!1)},null,8,["modelValue","winner"]),o($,{modelValue:a.snackbar,"onUpdate:modelValue":t[5]||(t[5]=i=>a.snackbar=i),color:"white"},{actions:c(()=>[o(W,{color:"red",variant:"text",onClick:t[4]||(t[4]=i=>a.snackbar=!1)},{default:c(()=>[o(h,{class:"m-lg-1",icon:"x",size:"1x"})]),_:1})]),default:c(()=>[o(h,{class:"mt-1 mx-lg-2 fs-2",icon:"triangle-exclamation",size:"1x"}),r("span",ye,g(a.msg),1)]),_:1},8,["modelValue"])],64)}const Ce=M(ie,[["render",Se],["__scopeId","data-v-0273799f"]]);export{ce as WS_KEEP_ALIVE_REQUEST,re as WS_KEEP_ALIVE_RESPONSE,ae as WS_PLAYER_REQUEST,R as WS_PLAYER_RESPONSE,ne as availableTurns,Ce as default,m as statusText};
