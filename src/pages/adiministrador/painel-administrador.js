// ============================================
// Gerenciamento de Usuários - CRUD Fictício
// ============================================

class GerenciadorUsuarios {
    constructor() {
        this.usuarios = this.carregarUsuarios();
        this.usuarioEditandoId = null;
        this.usuarioExcluindoId = null;
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
        this.configurarEventListeners();
        this.renderizarTabela();
        this.exibirNomeUsuario();
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
            nomeElement.textContent = usuarioLogado.nome;
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

        // Botões de Fechar Modal
        document.getElementById('btnFecharModal').addEventListener('click', () => this.fecharModal('modalUsuario'));
        document.getElementById('btnCancelar').addEventListener('click', () => this.fecharModal('modalUsuario'));

        // Modal de Confirmação
        document.getElementById('btnFecharConfirmacao').addEventListener('click', () => this.fecharModal('modalConfirmacao'));
        document.getElementById('btnCancelarExclusao').addEventListener('click', () => this.fecharModal('modalConfirmacao'));
        document.getElementById('btnConfirmarExclusao').addEventListener('click', () => this.confirmarExclusao());

        // Fechar modal ao clicar fora
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.fecharModal(e.target.id);
            }
        });
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
                <td>
                    <div class="acoes-cell">
                        <button class="btn-editar" onclick="gerenciador.abrirModalEditar(${usuario.id})">
                            ✏️ Editar
                        </button>
                        <button class="btn-excluir" onclick="gerenciador.abrirModalExcluir(${usuario.id})">
                            🗑️ Excluir
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // Abre modal para adicionar usuário
    abrirModalAdicionar() {
        this.usuarioEditandoId = null;
        document.getElementById('modalTitulo').textContent = 'Adicionar Usuário';
        document.getElementById('formUsuario').reset();
        document.getElementById('usuarioId').value = '';
        this.abrirModal('modalUsuario');
    }

    // Abre modal para editar usuário
    abrirModalEditar(id) {
        this.usuarioEditandoId = id;
        const usuario = this.usuarios.find(u => u.id === id);
        
        if (usuario) {
            document.getElementById('modalTitulo').textContent = 'Editar Usuário';
            document.getElementById('usuarioId').value = usuario.id;
            document.getElementById('usuarioNome').value = usuario.nome;
            document.getElementById('usuarioEmail').value = usuario.email;
            document.getElementById('usuarioTelefone').value = usuario.telefone;
            this.abrirModal('modalUsuario');
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
        this.fecharModal('modalUsuario');
    }

    // Abre modal de confirmação de exclusão
    abrirModalExcluir(id) {
        this.usuarioExcluindoId = id;
        const usuario = this.usuarios.find(u => u.id === id);
        
        if (usuario) {
            document.getElementById('usuarioParaExcluir').textContent = 
                `${usuario.nome} (${usuario.email})`;
            this.abrirModal('modalConfirmacao');
        }
    }

    // Confirma e executa a exclusão
    confirmarExclusao() {
        if (this.usuarioExcluindoId) {
            this.usuarios = this.usuarios.filter(u => u.id !== this.usuarioExcluindoId);
            this.salvarUsuarios();
            this.renderizarTabela();
            this.usuarioExcluindoId = null;
            this.fecharModal('modalConfirmacao');
        }
    }

    // Abre modal
    abrirModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.add('ativo');
        document.body.style.overflow = 'hidden';
    }

    // Fecha modal
    fecharModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('ativo');
        document.body.style.overflow = 'auto';
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
