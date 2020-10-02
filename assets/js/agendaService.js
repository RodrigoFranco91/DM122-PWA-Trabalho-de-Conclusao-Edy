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
        
        db.on('populate', async () => {
            await db.contatos.bulkPut([
                {nome: 'Meu Próprio Contato', email: 'rodrigofl@pg.inatel.br',
                telefone: '35 997400907', comentario: 'Minha Matricula é 40112'},
            ]);
        });

    }

    getAll(){
        return db.contatos.toArray();
    }

    get(id){
        return db.contatos.get(id);
    }

    save(contato){
        return db.contatos.put(contato);
    }

    delete(id){
        return db.contatos.delete(id);
    }

}



