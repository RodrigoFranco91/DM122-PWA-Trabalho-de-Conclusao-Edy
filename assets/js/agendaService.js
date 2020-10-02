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

    getAll(){
        return db.contatos.toArray();
    }

    get(id){
        return db.contatos.get(id);
    }

    save(task){
        return db.contatos.put(contato);
    }

    delete(id){
        return db.contatos.delete(id);
    }

}



