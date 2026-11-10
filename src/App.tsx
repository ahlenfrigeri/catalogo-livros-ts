import { useEffect, useState } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import { apiConfigurada, atualizarLivro, criarLivro, listarLivros, removerLivro } from "./services/api";
import type { Livro, NovoLivro } from "./types/livro";

export default function App() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string>("");

  // GET ao abrir a página
  useEffect(() => {
    if (!apiConfigurada) {
      setErro("Configure a URL do crudcrud no arquivo .env.local (veja o README).");
      setCarregando(false);
      return;
    }

    async function carregar() {
      try {
        setLivros(await listarLivros());
      } catch (e) {
        setErro(`Não foi possível carregar os livros. ${(e as Error).message}`);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  // POST: o erro sobe para o BookForm mostrar a mensagem
  async function adicionar(novo: NovoLivro): Promise<void> {
    const criado = await criarLivro(novo);
    setLivros((atuais) => [...atuais, criado]);
    setErro("");
  }

  // DELETE
  async function remover(id: string): Promise<void> {
    try {
      await removerLivro(id);
      setLivros((atuais) => atuais.filter((l) => l._id !== id));
      setErro("");
    } catch (e) {
      setErro(`Não foi possível remover. ${(e as Error).message}`);
    }
  }

  // PUT (opcional): alterna entre "Lido" e "Não lido"
  async function alternarStatus(livro: Livro): Promise<void> {
    const atualizado: Livro = { ...livro, status: livro.status === "Lido" ? "Não lido" : "Lido" };
    try {
      await atualizarLivro(atualizado);
      setLivros((atuais) => atuais.map((l) => (l._id === livro._id ? atualizado : l)));
      setErro("");
    } catch (e) {
      setErro(`Não foi possível atualizar. ${(e as Error).message}`);
    }
  }

  const lidos = livros.filter((l) => l.status === "Lido").length;

  return (
    <div className="pagina">
      <header className="cabecalho">
        <h1>
          Estante<span>.</span>
        </h1>
        <p>
          {livros.length} {livros.length === 1 ? "livro" : "livros"} · {lidos}{" "}
          {lidos === 1 ? "lido" : "lidos"}
        </p>
      </header>

      {erro && (
        <p className="erro erro--geral" role="alert">
          {erro}
        </p>
      )}

      <div className="conteudo">
        <section aria-label="Lista de livros">
          <BookList
            livros={livros}
            carregando={carregando}
            onRemover={remover}
            onAlternarStatus={alternarStatus}
          />
        </section>
        <aside>
          <BookForm onAdicionar={adicionar} />
        </aside>
      </div>
    </div>
  );
}
