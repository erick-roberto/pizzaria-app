import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

// componente que recebe props
// pizza: objeto com informações da pizza
// onAdd: função externa que é utilizada quando o botão adicionar é clicado
export default function PizzaCard({ pizza, onAdd }) { 
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia component="img" height="140" image={pizza.imagem} alt={pizza.nome} />
      <CardContent>
        <Typography variant="h6">{pizza.nome}</Typography>
        <Typography variant="body2">{pizza.ingredientes.join(", ")}</Typography>
        <Typography variant="subtitle1">R$ {pizza.preco}</Typography>
        <Button variant="contained" onClick={() => onAdd(pizza)}>Adicionar</Button>
      </CardContent>
    </Card>
  );
}
