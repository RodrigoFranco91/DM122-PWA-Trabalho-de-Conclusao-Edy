let db;

export default class agendaService{
    constructor(){
        this.initializeDb();
    }

    initializeDb(){
        db = new Dexie('agendaDb');

        db.version(1).stores({
            contatos:'++id,nome,email,telefone,comentario'
        });
        
    }
}



