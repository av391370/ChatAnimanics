//Imports
importScripts ('js/sw-utils.js');



//creacion de 3 constantes para almacenar los 3 tipos de cache
const STATIC_CACHE = "static-v7";
const DYNAMIC_CACHE = "dynamyc-v1";
const INMUTABLE_CACHE = "inmutable-v1";

const APP_SHELL =[ //corazon de la app
'/',
'index.html',
'css/style.css',
'img/favicon.ico',
'img/avatars/3.jpg',
'img/avatars/beb.jpg',
'img/avatars/Warner.jpg',
'img/avatars/Yakko.jpg',
'img/avatars/yako.jpg',
'js/app.js',
'js/sw-utils.js'
];

const APP_SHELL_INMUTABLE =[
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/animate.css',
    'js/libs/jquery.js',
    
];


self.addEventListener('install', e=>{

const cacheStatic = caches.open(STATIC_CACHE).then(cache=>
    cache.addAll(APP_SHELL)); // pasamos los archivos al cache estatico

    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache=>
        cache.addAll(APP_SHELL_INMUTABLE)); //pasamos los archivos al cache inmutable

        

    e.waitUntil(Promise.all([cacheStatic,cacheInmutable])); //esperamos a que los caches finalicen 
});

self.addEventListener('activate', e=>{
    const respuesta= caches.keys().then(keys=>{

    keys.forEach(keys=>{
        
//stactic-v4 =CACHE_STATIC_NAME
if(key!=STATIC_CACHE && key.includes('static')){
    return caches.delete(key);
}

});

});

e.waitUntil(respuesta);

});
//cache online
self.addEventListener('fetch', e=>{
   const respuesta= caches.match(e.request).then(res=>{
        if(res){
            return res;
        }
        else{
            //console.log(e.request.url);
       return fetch(e.request).then(newRes=>{
           return actualizarCacheDinamico(DYNAMIC_CACHE,e.request,newRes);
    });
}
   });
   e.responWith(respuesta);

});

