import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createApp} from './app.mjs';
import {deliver,validate} from './contact.mjs';
const data={name:'Test User',email:'test@example.com',message:'Please tell me more about your services.'};
const env={RESEND_API_KEY:'test-only',CONTACT_FROM:'sender@example.com',CONTACT_TO:'recipient@example.com',SITE_URL:'http://localhost'};
async function run(settings,send,fn){const server=createApp(settings,send).listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));try{await fn(`http://127.0.0.1:${server.address().port}`);}finally{await new Promise(r=>server.close(r));}}
const post=(url,body,origin='http://localhost')=>fetch(url+'/api/contact',{method:'POST',headers:{'Content-Type':'application/json',Origin:origin},body:JSON.stringify(body)});
test('validates input and rejects header injection and overlong content',()=>{assert.deepEqual(validate(data),data);assert.equal(validate({...data,name:'a\r\nb'}),null);assert.equal(validate({...data,email:'bad'}),null);assert.equal(validate({...data,message:'a'.repeat(5001)}),null);});
test('unconfigured delivery is unavailable and never sends',async()=>run({},()=>assert.fail('must not send'),async url=>{assert.equal((await (await fetch(url+'/api/contact/status')).json()).available,false);assert.equal((await post(url,data)).status,503);}));
test('enforces origin and input, then confirms accepted delivery',async()=>{let count=0;await run(env,async()=>{count++;},async url=>{assert.equal((await post(url,data,'http://other.example')).status,403);assert.equal((await post(url,{...data,email:'bad'})).status,400);assert.equal((await post(url,data)).status,200);assert.equal(count,1);});});
test('delivery errors return failure',async()=>run(env,async()=>{throw new Error('provider down');},async url=>{assert.equal((await post(url,data)).status,502);}));
test('provider must confirm delivery and credentials remain server-side',async()=>{let payload;await deliver(data,env,async(_url,options)=>{payload=JSON.parse(options.body);return {ok:true,json:async()=>({id:'accepted'})};});assert.equal(payload.reply_to,data.email);await assert.rejects(deliver(data,env,async()=>({ok:false})));await assert.rejects(deliver(data,env,async()=>({ok:true,json:async()=>({})})));});
