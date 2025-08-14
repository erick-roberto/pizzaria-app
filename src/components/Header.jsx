// Importações do Material-UI para criar a AppBar, botões e layouts
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

// Importações do React Router para navegação entre páginas
import { Link, useNavigate, useLocation } from "react-router-dom";

// Importa o hook useContext do React para acessar o contexto de autenticação
import { useContext } from "react";

// Importa o contexto de autenticação, que contém informações do usuário e funções de login/logout
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  // Desestrutura o usuário logado e a função de logout do AuthContext
  const { user, logout } = useContext(AuthContext);

  // Hook do React Router para navegar programaticamente entre páginas
  const navigate = useNavigate();

  // Hook do React Router para obter informações da URL atual
  const location = useLocation();

  // Função chamada ao clicar no botão "Sair"
  const handleLogout = () => {
    logout();         // Chama a função de logout do contexto
    navigate("/");    // Redireciona o usuário para a página inicial
  };

  // Define o link da logo dependendo da página atual
  // Se estiver na página inicial, a logo leva para "/", caso contrário, leva para "/cardapio"
  const logoLink = location.pathname === "/" ? "/" : "/cardapio";

  return (
    // Componente AppBar do Material-UI para criar a barra de navegação
    <AppBar position="static">
      <Toolbar>
        {/* Box serve como container da logo e nome, usando Link para navegação */}
        <Box
          component={Link}        // Transformamos o Box em um Link clicável
          to={logoLink}           // Define para onde o Link aponta
          sx={{                   // Estilos do Material-UI
            display: "flex",
            alignItems: "center",
            flexGrow: 1,          // Faz a logo ocupar o máximo de espaço possível à esquerda
            textDecoration: "none",
            color: "inherit",     // Herdar cor do AppBar
            cursor: "pointer",    // Muda o cursor ao passar por cima
          }}
        >
          {/* Imagem da logo da pizzaria */}
          <img
            src="/imagens/logo.png"
            alt="Logo Pizzaria"
            style={{ width: 40, height: 40, marginRight: 10 }} // Tamanho e espaçamento
            className="logo-redonda"  // Classe CSS opcional
          />
          {/* Nome da pizzaria */}
          <Typography variant="h6" noWrap component="div">
            Pizzeria
          </Typography>
        </Box>

        {/* Renderiza botões somente se houver um usuário logado */}
        {user && (
          <>
            {/* Botões para clientes */}
            {user.role === "cliente" && (
            <>
              <Button color="inherit" component={Link} to="/cardapio">
                Cardápio
              </Button>
              <Button color="inherit" component={Link} to="/carrinho">
                Carrinho
              </Button>
            </>
            )}

            {/* Botões para staff (funcionários) */}
            {user.role === "staff" && (
              <>
                <Button color="inherit" component={Link} to="/cozinha">
                  Cozinha
                </Button>
                <Button color="inherit" component={Link} to="/entregas">
                  Entregas
                </Button>
              </>
            )}

            {/* Botões para admin */}
            {user.role === "admin" && (
              <>
                <Button color="inherit" component={Link} to="/admin">
                  Admin
                </Button>
                <Button color="inherit" component={Link} to="/cozinha">
                  Cozinha
                </Button>
                <Button color="inherit" component={Link} to="/entregas">
                  Entregas
                </Button>
              </>
            )}

            {/* Botão comum a todos os usuários logados */}
            <Button color="inherit" onClick={handleLogout}>
              Sair
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
