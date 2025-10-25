// ============================================
// Gerenciamento de Usuários - CRUD Fictício
// ============================================

class GerenciadorUsuarios {
    constructor() {
        this.usuarios = this.carregarUsuarios();
        this.usuarioEditandoId = null;
        this.usuarioExcluindoId = null;
        this.modalUsuario = null;
        this.modalConfirmacao = null;
        this.inicializar();
    }

    // Carrega usuários do localStorage ou cria dados fictícios
    carregarUsuarios() {
        const usuariosSalvos = localStorage.getItem('usuarios');
        if (usuariosSalvos) {
            return JSON.parse(usuariosSalvos);
        }
        
        // Dados fictícios iniciais
        return [
            { id: 1, nome: 'João Silva', email: 'joao.silva@email.com', telefone: '(11) 98765-4321' },
            { id: 2, nome: 'Maria Santos', email: 'maria.santos@email.com', telefone: '(21) 91234-5678' },
            { id: 3, nome: 'Pedro Oliveira', email: 'pedro.oliveira@email.com', telefone: '(31) 99876-5432' },
            { id: 4, nome: 'Ana Costa', email: 'ana.costa@email.com', telefone: '(41) 92345-6789' },
            { id: 5, nome: 'Carlos Ferreira', email: 'carlos.ferreira@email.com', telefone: '(51) 93456-7890' }
        ];
    }

    // Salva usuários no localStorage
    salvarUsuarios() {
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }

    // Inicializa os event listeners e renderiza a tabela
    inicializar() {
        this.verificarAutenticacao();
        this.inicializarModals();
        this.configurarEventListeners();
        this.renderizarTabela();
        this.exibirNomeUsuario();
    }

    // Inicializa os modais do Bootstrap
    inicializarModals() {
        this.modalUsuario = new bootstrap.Modal(document.getElementById('modalUsuario'));
        this.modalConfirmacao = new bootstrap.Modal(document.getElementById('modalConfirmacao'));
    }

    // Verifica se o usuário está autenticado
    verificarAutenticacao() {
        const usuarioLogado = sessionStorage.getItem('usuarioLogado');
        if (!usuarioLogado) {
            window.location.href = '/src/pages/autenticacao/autenticacao.html';
        }
    }

    // Exibe o nome do usuário logado
    exibirNomeUsuario() {
        const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado') || '{}');
        const nomeElement = document.getElementById('nomeUsuario');
        if (nomeElement && usuarioLogado.nome) {
            nomeElement.innerHTML = `<i class="bi bi-person-circle"></i> ${usuarioLogado.nome}`;
        }
    }

    // Configura todos os event listeners
    configurarEventListeners() {
        // Botão Sair
        document.getElementById('btnSair').addEventListener('click', () => this.sair());

        // Botão Adicionar
        document.getElementById('btnAdicionar').addEventListener('click', () => this.abrirModalAdicionar());

        // Formulário de Usuário
        document.getElementById('formUsuario').addEventListener('submit', (e) => this.salvarUsuario(e));

        // Botão de Confirmar Exclusão
        document.getElementById('btnConfirmarExclusao').addEventListener('click', () => this.confirmarExclusao());
    }

    // Renderiza a tabela de usuários
    renderizarTabela() {
        const tbody = document.getElementById('tabelaUsuarios');
        const mensagemVazia = document.getElementById('mensagemVazia');
        
        if (this.usuarios.length === 0) {
            tbody.innerHTML = '';
            mensagemVazia.style.display = 'block';
            return;
        }

        mensagemVazia.style.display = 'none';
        
        tbody.innerHTML = this.usuarios.map(usuario => `
            <tr>
                <td>${usuario.id}</td>
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>${usuario.telefone}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-warning me-2" onclick="gerenciador.abrirModalEditar(${usuario.id})">
                        <i class="bi bi-pencil"></i> Editar
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="gerenciador.abrirModalExcluir(${usuario.id})">
                        <i class="bi bi-trash"></i> Excluir
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Abre modal para adicionar usuário
    abrirModalAdicionar() {
        this.usuarioEditandoId = null;
        document.getElementById('modalTitulo').innerHTML = '<i class="bi bi-person-plus"></i> Adicionar Usuário';
        document.getElementById('formUsuario').reset();
        document.getElementById('usuarioId').value = '';
        this.modalUsuario.show();
    }

    // Abre modal para editar usuário
    abrirModalEditar(id) {
        this.usuarioEditandoId = id;
        const usuario = this.usuarios.find(u => u.id === id);
        
        if (usuario) {
            document.getElementById('modalTitulo').innerHTML = '<i class="bi bi-pencil"></i> Editar Usuário';
            document.getElementById('usuarioId').value = usuario.id;
            document.getElementById('usuarioNome').value = usuario.nome;
            document.getElementById('usuarioEmail').value = usuario.email;
            document.getElementById('usuarioTelefone').value = usuario.telefone;
            this.modalUsuario.show();
        }
    }

    // Salva usuário (adicionar ou editar)
    salvarUsuario(e) {
        e.preventDefault();
        
        const id = document.getElementById('usuarioId').value;
        const nome = document.getElementById('usuarioNome').value;
        const email = document.getElementById('usuarioEmail').value;
        const telefone = document.getElementById('usuarioTelefone').value;

        if (id) {
            // Editar usuário existente
            const index = this.usuarios.findIndex(u => u.id === parseInt(id));
            if (index !== -1) {
                this.usuarios[index] = { id: parseInt(id), nome, email, telefone };
            }
        } else {
            // Adicionar novo usuário
            const novoId = this.usuarios.length > 0 
                ? Math.max(...this.usuarios.map(u => u.id)) + 1 
                : 1;
            this.usuarios.push({ id: novoId, nome, email, telefone });
        }

        this.salvarUsuarios();
        this.renderizarTabela();
        this.modalUsuario.hide();
    }

    // Abre modal de confirmação de exclusão
    abrirModalExcluir(id) {
        this.usuarioExcluindoId = id;
        const usuario = this.usuarios.find(u => u.id === id);
        
        if (usuario) {
            document.getElementById('usuarioParaExcluir').innerHTML = 
                `<strong>${usuario.nome}</strong><br><small>${usuario.email}</small>`;
            this.modalConfirmacao.show();
        }
    }

    // Confirma e executa a exclusão
    confirmarExclusao() {
        if (this.usuarioExcluindoId) {
            this.usuarios = this.usuarios.filter(u => u.id !== this.usuarioExcluindoId);
            this.salvarUsuarios();
            this.renderizarTabela();
            this.usuarioExcluindoId = null;
            this.modalConfirmacao.hide();
        }
    }

    // Sair do sistema
    sair() {
        sessionStorage.removeItem('usuarioLogado');
        window.location.href = '/src/pages/autenticacao/autenticacao.html';
    }
}

// Inicializa o gerenciador quando a página carregar
let gerenciador;
document.addEventListener('DOMContentLoaded', () => {
    gerenciador = new GerenciadorUsuarios();
});
