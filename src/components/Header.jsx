import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Se estiver na raiz (login), link para "/", senão para "/cardapio"
  const logoLink = location.pathname === "/" ? "/" : "/cardapio";

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          component={Link}
          to={logoLink}
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          <img
            src="/imagens/logo.png"
            alt="Logo Pizzaria"
            style={{ width: 40, height: 40, marginRight: 10 }}
          />
          <Typography variant="h6" noWrap component="div">
            Pizzaria App
          </Typography>
        </Box>

        {user && (
          <>
            <Button color="inherit" component={Link} to="/cardapio">
              Cardápio
            </Button>
            {["staff", "admin"].includes(user.role) && (
              <>
                <Button color="inherit" component={Link} to="/cozinha">
                  Cozinha
                </Button>
                <Button color="inherit" component={Link} to="/entregas">
                  Entregas
                </Button>
              </>
            )}
            {user.role === "admin" && (
              <Button color="inherit" component={Link} to="/admin">
                Admin
              </Button>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Sair
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
