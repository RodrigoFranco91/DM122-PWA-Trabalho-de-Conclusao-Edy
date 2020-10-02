export default class htmlService{
    constructor(agendaService){
        this.agendaService = agendaService;
        this.bindFormEvent();
        this.listContatos();
    }

    bindFormEvent(){
        const form = document.querySelector('form');
        form.addEventListener('submit', event =>{
            event.preventDefault();
            const contatoId = form.id.value;
            const contato = {nome: form.nome.value, email: form.email.value,
                            telefone: form.telefone.value, comentario: form.comentario.value};
            if(contatoId == -1){
                this.addContato(contato);
            }else{
                this.updateContato(contatoId, contato);
            }
            form.reset();
        })
    }

    async addContato(contato){
        const contatoId = await this.agendaService.save(contato);
        contato.id = contatoId;
        this.addToHtmlList(contato);
    }

    async listContatos(){
        const contatos = await this.agendaService.getAll();
        contatos.forEach(contato => this.addToHtmlList(contato));
    }

    async deleteTask(li){
        const contatoId = +li.getAttribute('data-item-id');
        await this.agendaService.delete(contatoId);
        li.remove();
    }

    async updateContato(contatoId, contato){
        contato.id = contatoId;
        this.agendaService.save(contato);
    }

    addToHtmlList(contato){
    }
}