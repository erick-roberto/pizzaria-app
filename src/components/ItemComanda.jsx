// Componente funcional que representa um item dentro da comanda (carrinho)
export default function ItemComanda({ item, onRemove, onChangeQuantity }) {
  return (
    // Cada item é um <li> exibido em linha flexível, com espaço entre as seções
    <li style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
      
      {/* Primeira seção: informações do item e quantidade */}
      <div>
        {/* Nome do item em negrito e tamanho */}
        <strong>{item.nome}</strong> ({item.tamanho})
        <br />
        {/* Preço unitário seguido de input para alterar a quantidade */}
        R$ {item.preco} x 
        <input
          type="number"                 // Input numérico para quantidade
          min={1}                       // Quantidade mínima permitida é 1
          value={item.quantity}          // Valor atual da quantidade
          // Ao mudar o valor, chama onChangeQuantity passando id do item e nova quantidade
          onChange={(e) => onChangeQuantity(item.id, parseInt(e.target.value))}
          style={{ width: 50, marginLeft: 5 }}  // Largura e espaçamento do input
        />
      </div>

      {/* Segunda seção: total do item e botão de remoção */}
      <div>
        {/* Mostra o preço total (preço unitário * quantidade) */}
        <span>R$ {item.preco * item.quantity}</span>
        {/* Botão que remove o item da comanda */}
        <button onClick={() => onRemove(item.id)} style={{ marginLeft: 10 }}>
          Remover
        </button>
      </div>
    </li>
  );
}
