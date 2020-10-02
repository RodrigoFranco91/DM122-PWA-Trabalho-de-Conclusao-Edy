import htmlService from './htmlService.js';
import agendaService from './agendaService.js';

class App{

    constructor(){
      this.registerServiceWorker();
      this.start();
    }
   
    start(){
      const agendaServiceConst = new agendaService();
      new htmlService(agendaServiceConst);
    }

    registerServiceWorker(){
      if ('serviceWorker' in navigator) {
        const onsuccess = () => console.log('[Service Worker] Registered');
        const onfailure = () => console.log('[Service Worker] Failed');
      
        navigator.serviceWorker
          .register('sw.js')
          .then(onsuccess)
          .catch(onfailure);
      }
    }
  }
  
  new App();