import express from 'express';
import {resolve} from 'node:path';
import {createApp} from './app.mjs';
const app=createApp();app.use(express.static(resolve('dist'),{extensions:['html']}));app.use((_req,res)=>res.status(404).sendFile(resolve('dist/404/index.html')));app.listen(Number(process.env.PORT||3000),'0.0.0.0',()=>console.log('Tradex server ready'));
