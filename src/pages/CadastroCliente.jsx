// Importa hooks do React, axios para requisições HTTP e useNavigate para redirecionamento
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Componente funcional para cadastro de novos clientes
export default function CadastroCliente() {
  // Estado que guarda os dados do cliente digitados nos inputs
  const [cliente, setCliente] = useState({ nome: "", email: "", senha: "" });

  // Estado para mensagens de sucesso e erro
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  // Hook para navegar programaticamente entre páginas
  const navigate = useNavigate();

  // Função para validar se o email possui formato correto
  const validarEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email); // Regex simples para verificar email
  };

  // Função que é chamada ao clicar no botão "Cadastrar"
  const cadastrar = async () => {
    setMensagem(""); // limpa mensagens anteriores
    setErro("");

    // Valida se todos os campos foram preenchidos
    if (!cliente.nome || !cliente.email || !cliente.senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    // Valida formato do email
    if (!validarEmail(cliente.email)) {
      setErro("Email inválido.");
      return;
    }

    // Valida tamanho da senha
    if (cliente.senha.length < 6) {
      setErro("Senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      // Verifica se já existe usuário com esse email no backend
      const res = await axios.get(`http://localhost:5000/users?username=${cliente.email}`);
      if (res.data.length > 0) {
        setErro("Email já cadastrado.");
        return;
      }

      // Cria o objeto do novo usuário
      const novoUsuario = {
        username: cliente.email,
        password: cliente.senha,
        role: "cliente",
        nome: cliente.nome,
        email: cliente.email,
      };

      // Envia POST para criar o usuário no backend
      await axios.post("http://localhost:5000/users", novoUsuario);

      // Exibe mensagem de sucesso e limpa os inputs
      setMensagem("Cadastro realizado com sucesso! Você será redirecionado para o login.");
      setCliente({ nome: "", email: "", senha: "" });

      // Redireciona para a página de login após 2 segundos
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      // Trata erros de requisição
      if (err.response && err.response.data && err.response.data.message) {
        setErro(err.response.data.message);
      } else {
        setErro("Erro ao cadastrar. Tente novamente.");
      }
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Cliente</h2>

      {/* Inputs para preencher dados do cliente */}
      <input
        type="text"
        placeholder="Nome"
        value={cliente.nome}
        onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={cliente.email}
        onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Senha"
        value={cliente.senha}
        onChange={(e) => setCliente({ ...cliente, senha: e.target.value })}
      />

      {/* Botão para cadastrar */}
      <button onClick={cadastrar}>Cadastrar</button>

      {/* Mensagens de sucesso e erro */}
      {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </div>
  );
}
