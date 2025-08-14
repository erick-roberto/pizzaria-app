export default function ItemComanda({ item, onRemove, onChangeQuantity }) {
  return (
    <li style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
      <div>
        <strong>{item.nome}</strong> ({item.tamanho})
        <br />
        R$ {item.preco} x 
        <input
          type="number"
          min={1}
          value={item.quantity}
          onChange={(e) => onChangeQuantity(item.id, parseInt(e.target.value))}
          style={{ width: 50, marginLeft: 5 }}
        />
      </div>
      <div>
        <span>R$ {item.preco * item.quantity}</span>
        <button onClick={() => onRemove(item.id)} style={{ marginLeft: 10 }}>Remover</button>
      </div>
    </li>
  );
}
