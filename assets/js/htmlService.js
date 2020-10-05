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
        const contatoCompleto ={id: contatoId, nome: contato.nome, email: contato.email,
                        telefone: contato.telefone, comentario: contato.comentario};
        this.addToHtmlList(contatoCompleto);
    }

    async listContatos(){
        const contatos = await this.agendaService.getAll();
        contatos.forEach(contato => this.addToHtmlList(contato));
    }

    async deleteContato(ul){
        const contatoId = +ul.querySelector('li').getAttribute('data-item-id');
        await this.agendaService.delete(contatoId);
        ul.remove();
    }

    async updateContato(contatoId, contato){
        contato.id = +contatoId;
        this.agendaService.save(contato);
        window.location.reload();
    }
    
    async preencheForm(ul){
        const contatoId = +ul.querySelector('li').getAttribute('data-item-id');
        const contato = await this.agendaService.get(contatoId);
        const form = document.querySelector('form');
        form.id.value = +contato.id;
        form.nome.value = contato.nome;
        form.email.value = contato.email;
        form.telefone.value = contato.telefone;
        form.comentario.value = contato.comentario;
    }

    addToHtmlList(contato){
        const divListagem = document.querySelector('.contatos');
        
        const ul = document.createElement('ul');
        ul.classList.add('lista-contatos');

        const liId = document.createElement('li');
        liId.setAttribute('data-item-id', contato.id);
        liId.classList.add('id');

        liId.innerHTML = contato.id;

        const liNome = document.createElement('li');
        liNome.innerHTML = contato.nome;

        const liEmail = document.createElement('li');
        liEmail.innerHTML = contato.email;

        const liTelefone = document.createElement('li');
        liTelefone.innerHTML = contato.telefone;

        const liComentario = document.createElement('li');
        liComentario.innerHTML = contato.comentario;

        const liAlterar = document.createElement('li');
        liAlterar.classList.add('editar');
        liAlterar.innerHTML = 'Alterar';

        const liDeletar = document.createElement('li');
        liDeletar.classList.add('excluir');
        liDeletar.innerHTML = 'Excluir';

        ul.appendChild(liId);
        ul.appendChild(liNome);
        ul.appendChild(liEmail);
        ul.appendChild(liTelefone);
        ul.appendChild(liComentario);
        ul.appendChild(liAlterar);
        ul.appendChild(liDeletar);
        divListagem.appendChild(ul);

        liDeletar.addEventListener('click', event =>{
            event.stopPropagation();
            this.deleteContato(ul);
        })

        liAlterar.addEventListener('click', event =>{
            event.stopPropagation();
            this.preencheForm(ul);
        })
    }
}