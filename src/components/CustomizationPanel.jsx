import { useState } from "react";

export default function CustomizationPanel() {
  const [cor, setCor] = useState("#ffffff");
  const [logo, setLogo] = useState("");

  const handleSave = () => {
    document.body.style.backgroundColor = cor;
    if (logo) {
      const img = document.getElementById("logo");
      if (img) img.src = logo;
    }
    alert("Customização aplicada!");
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2>Customização do Admin</h2>
      <input
        type="color"
        value={cor}
        onChange={(e) => setCor(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL do logo"
        value={logo}
        onChange={(e) => setLogo(e.target.value)}
      />
      <button onClick={handleSave}>Salvar</button>
    </div>
  );
}
