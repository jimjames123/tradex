import {createServer} from 'vite';
import {createApp} from './app.mjs';
const vite=await createServer({server:{middlewareMode:true}});const app=createApp();app.use(vite.middlewares);app.listen(Number(process.env.PORT||3000),'0.0.0.0',()=>console.log('Tradex development server ready'));
