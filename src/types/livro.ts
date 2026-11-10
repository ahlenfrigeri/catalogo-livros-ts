// ===== Modelo de dados =====

// União de literais: o status só pode ser exatamente um destes dois textos
export type StatusLivro = "Lido" | "Não lido";

// Livro como ele existe na API (o crudcrud cria o _id sozinho)
export interface Livro {
  _id: string;
  title: string;
  author: string;
  status: StatusLivro;
}

// Livro novo, antes de ir para a API: tudo do Livro, menos o _id
export type NovoLivro = Omit<Livro, "_id">;

// ===== Props dos componentes =====

export interface BookListProps {
  livros: Livro[];
  carregando: boolean;
  onRemover: (id: string) => Promise<void>;
  onAlternarStatus: (livro: Livro) => Promise<void>;
}

export interface BookItemProps {
  livro: Livro;
  onRemover: (id: string) => Promise<void>;
  onAlternarStatus: (livro: Livro) => Promise<void>;
}

export interface BookFormProps {
  onAdicionar: (livro: NovoLivro) => Promise<void>;
}

// ===== Estado e eventos do formulário =====

export type FormularioLivro = NovoLivro;

export type CampoEvento = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
export type EnvioEvento = React.FormEvent<HTMLFormElement>;
