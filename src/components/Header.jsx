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
            className="logo-redonda"
          />
          <Typography variant="h6" noWrap component="div">
            Pizzeria
          </Typography>
        </Box>

        {user && (
          <>
            {/* Cliente */}
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

            {/* Staff */}
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

            {/* Admin */}
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

            {/* Botão comum a todos */}
            <Button color="inherit" onClick={handleLogout}>
              Sair
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
