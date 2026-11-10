import { useState } from "react";
import type { BookFormProps, CampoEvento, EnvioEvento, FormularioLivro } from "../types/livro";

const vazio: FormularioLivro = { title: "", author: "", status: "Não lido" };

export default function BookForm({ onAdicionar }: BookFormProps) {
  // O TypeScript garante que o estado sempre tem title, author e status
  const [campos, setCampos] = useState<FormularioLivro>(vazio);
  const [erro, setErro] = useState<string>("");
  const [enviando, setEnviando] = useState<boolean>(false);

  function handleChange(evento: CampoEvento) {
    const { name, value } = evento.target;
    setCampos((anterior) => ({ ...anterior, [name]: value }));
  }

  async function handleSubmit(evento: EnvioEvento) {
    evento.preventDefault();
    const title = campos.title.trim();
    const author = campos.author.trim();

    if (!title || !author) {
      setErro("Preencha o título e o autor.");
      return;
    }

    setEnviando(true);
    try {
      await onAdicionar({ title, author, status: campos.status });
      setCampos(vazio);
      setErro("");
    } catch {
      setErro("Não foi possível salvar. Tente de novo.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="formulario" onSubmit={handleSubmit} noValidate>
      <h2 className="formulario__titulo">Adicionar livro</h2>

      <label htmlFor="title">Título</label>
      <input id="title" name="title" value={campos.title} onChange={handleChange} />

      <label htmlFor="author">Autor</label>
      <input id="author" name="author" value={campos.author} onChange={handleChange} />

      <label htmlFor="status">Status</label>
      <select id="status" name="status" value={campos.status} onChange={handleChange}>
        <option value="Não lido">Não lido</option>
        <option value="Lido">Lido</option>
      </select>

      {erro && (
        <p className="erro" role="alert">
          {erro}
        </p>
      )}

      <button className="botao" type="submit" disabled={enviando}>
        {enviando ? "Salvando..." : "Adicionar"}
      </button>
    </form>
  );
}
