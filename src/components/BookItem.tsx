import { useState } from "react";
import type { BookItemProps } from "../types/livro";

export default function BookItem({ livro, onRemover, onAlternarStatus }: BookItemProps) {
  const [ocupado, setOcupado] = useState<boolean>(false);
  const lido = livro.status === "Lido";

  // Envolve as ações para desabilitar os botões enquanto a requisição acontece
  async function executar(acao: () => Promise<void>) {
    setOcupado(true);
    try {
      await acao();
    } finally {
      setOcupado(false);
    }
  }

  return (
    <li className="livro">
      <div className="livro__info">
        <h3 className="livro__titulo">{livro.title}</h3>
        <p className="livro__autor">{livro.author}</p>
      </div>

      <button
        type="button"
        className={`etiqueta ${lido ? "etiqueta--lido" : ""}`}
        onClick={() => executar(() => onAlternarStatus(livro))}
        disabled={ocupado}
        title="Clique para alterar o status"
      >
        {livro.status}
      </button>

      <button
        type="button"
        className="livro__remover"
        onClick={() => executar(() => onRemover(livro._id))}
        disabled={ocupado}
        aria-label={`Remover ${livro.title}`}
      >
        Remover
      </button>
    </li>
  );
}
