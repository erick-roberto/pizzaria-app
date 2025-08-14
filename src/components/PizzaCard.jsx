// Importações do Material-UI para criar um Card estilizado com imagem, texto e botão
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

// Componente funcional que exibe informações de uma pizza
// Props:
// - pizza: objeto contendo as informações da pizza (nome, ingredientes, preço, imagem)
// - onAdd: função que é chamada quando o usuário clica em "Adicionar"
export default function PizzaCard({ pizza, onAdd }) { 
  return (
    // Card do Material-UI, com largura máxima de 300px
    <Card sx={{ maxWidth: 300 }}>
      
      {/* CardMedia exibe a imagem da pizza */}
      <CardMedia
        component="img"       // Define que é uma imagem
        height="140"          // Altura da imagem em pixels
        image={pizza.imagem}  // URL da imagem da pizza
        alt={pizza.nome}      // Texto alternativo para acessibilidade
      />

      {/* CardContent contém o texto e o botão */}
      <CardContent>
        {/* Nome da pizza em destaque */}
        <Typography variant="h6">{pizza.nome}</Typography>

        {/* Lista de ingredientes separados por vírgula */}
        <Typography variant="body2">{pizza.ingredientes.join(", ")}</Typography>

        {/* Preço da pizza */}
        <Typography variant="subtitle1">R$ {pizza.preco}</Typography>

        {/* Botão para adicionar a pizza à comanda/carrinho */}
        <Button
          variant="contained"               // Botão preenchido
          onClick={() => onAdd(pizza)}      // Ao clicar, chama a função onAdd passando a pizza
        >
          Adicionar
        </Button>
      </CardContent>
    </Card>
  );
}
