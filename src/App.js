import React, { useState } from "react"; //import do react com useState para gerenciar o estado
import "./App.css";

const App = () => { //estado inicial do formulario
  const [formDados, setFormDados] = useState({ //formdata guarda os valores dos campos, e SetFormData para setar os dados.
    nome: "",
    curso: "",
    estado: "",
    cidade: "",
  });
  const [cidades, setCidades] = useState([]); //cities lista de cidades atualizada conforme o estado, e setCities para setar as cidades.

  const cursos = ["Matemática", "Letras", "Geografia"]; //dados fixos dos cursos
  const estados = ["São Paulo", "Rio de Janeiro", "Minas Gerais"]; //dados fixos dos estados
  const cidadesPorEstado = { //dados fixos das cidades para cada estado
    "São Paulo": ["Mogi das Cruzes", "Suzano", "Poa", "Guararema"],
    "Rio de Janeiro": ["Angra dos Reis", "Niterói", "Itaboraí"],
    "Minas Gerais": ["Belo Horizonte", "Monte Azul", "Muzambinho"],
  };

  const handleInputChange = (e) => { //acionado quando adiciona algo aos inputs
    const { name, value } = e.target; 
    setFormDados((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    
    if (name === "estado") { // Atualiza as cidades ao selecionar um estado
      setCidades(cidadesPorEstado[value] || []);
      setFormDados((prevData) => ({
        ...prevData,
        cidade: "", // Reseta a cidade quando o estado muda
      }));
    }
  };

  const handleSubmit = (e) => { //acionado quando clica em Gravar
    e.preventDefault();
    alert(`Formulário enviado!\nNome: ${formDados.nome}\nCurso: ${formDados.curso}\nEstado: ${formDados.estado}\nCidade: ${formDados.cidade}`);

    // Limpa os campos após o envio
    setFormDados({
      nome: "",
      curso: "",
      estado: "",
      cidade: "",
    });
    setCidades([]);
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Ingressantes</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome
          <input
            type="text"
            name="nome"
            value={formDados.nome}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Curso
          <select
            name="curso"
            value={formDados.curso}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione</option>
            {cursos.map((cursos) => (
              <option key={cursos} value={cursos}>
                {cursos}
              </option>
            ))}
          </select>
        </label>
        <label>
          Estado
          <select
            name="estado"
            value={formDados.estado}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione</option>
            {estados.map((estados) => (
              <option key={estados} value={estados}>
                {estados}
              </option>
            ))}
          </select>
        </label>
        <label>
          Cidades
          <select
            name="cidade"
            value={formDados.cidade}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione</option>
            {cidades.map((cidades) => (
              <option key={cidades} value={cidades}>
                {cidades}
              </option>
            ))}
          </select>
        </label>
        <div className="buttons">
          <button className="voltar" type="button">Voltar</button>
          <button className="gravar" type="submit">Gravar</button>
        </div>
      </form>
    </div>
  );
};

export default App;
