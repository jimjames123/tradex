import React from 'react';
import {hydrateRoot, createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {App} from './App';
import {pages,siteUrl} from './config/company';
import './styles.css';
function Metadata(){const path=window.location.pathname;const page=pages.find(p=>p.path===path);React.useEffect(()=>{document.title=page?.title||'Page not found | Tradex';const values:Record<string,string>={'description':page?.description||'The requested page could not be found.','og:title':document.title,'og:description':page?.description||'','og:url':siteUrl?siteUrl+path:''};for(const [key,value]of Object.entries(values)){document.querySelector(`meta[${key.startsWith('og:')?'property':'name'}="${key}"]`)?.setAttribute('content',value);}const canonical=document.querySelector('link[rel="canonical"]');if(siteUrl)canonical?.setAttribute('href',siteUrl+path);},[path,page]);return null}
// Router re-renders metadata on navigation.
import {useLocation} from 'react-router-dom';
function Shell(){useLocation();return <><Metadata/><App/></>}
const root=document.getElementById('root')!;const app=<BrowserRouter><Shell/></BrowserRouter>;
if(root.querySelector('main'))hydrateRoot(root,app);else createRoot(root).render(app);
