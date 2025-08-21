import { useContext } from "react";
import { PedidosContext } from "../context/PedidosProvider";
import { Box, Card, CardContent, Typography, Button, Grid } from "@mui/material";

export default function Cozinha() {
  const { preparacao, marcarPronto } = useContext(PedidosContext);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Pedidos em preparo</Typography>

      {preparacao.length === 0 && <Typography>Nenhum pedido em preparação.</Typography>}

      <Grid container spacing={2}>
        {preparacao.map(p => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">
                  Mesa/Endereço: {p.mesaOuEndereco}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {p.itens.map(i => `${i.nome} (x${i.quantity})`).join(", ")}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  Total: R$ {p.total}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 2 }}
                  onClick={() => marcarPronto(p.id)}
                >
                  Pedido Pronto
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
