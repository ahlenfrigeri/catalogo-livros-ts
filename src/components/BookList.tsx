import BookItem from "./BookItem";
import type { BookListProps } from "../types/livro";

export default function BookList({ livros, carregando, onRemover, onAlternarStatus }: BookListProps) {
  if (carregando) {
    return <p className="aviso">Carregando livros...</p>;
  }

  if (livros.length === 0) {
    return <p className="aviso">Nenhum livro cadastrado. Adicione o primeiro!</p>;
  }

  return (
    <ul className="lista">
      {livros.map((livro) => (
        <BookItem
          key={livro._id}
          livro={livro}
          onRemover={onRemover}
          onAlternarStatus={onAlternarStatus}
        />
      ))}
    </ul>
  );
}
