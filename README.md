# Estante: catálogo de livros (React + TypeScript + crudcrud)

Catálogo de livros em **React com TypeScript** que lista, cadastra, remove e atualiza livros numa API REST real do **crudcrud.com**. Exercício do Módulo 21 do curso de Front-End da EBAC.

## Funcionalidades

- **GET**: lista os livros da API ao abrir a página (`useEffect`)
- **POST**: formulário para adicionar livro (título, autor e status)
- **DELETE**: botão "Remover" em cada livro
- **PUT** (opcional no enunciado): clicar na etiqueta alterna entre "Lido" e "Não lido"
- Erros de requisição tratados com `try/catch`, com mensagem na tela
- Layout responsivo

## Tipagem

Todos os tipos ficam em `src/types/livro.ts`:

| Tipo | Para quê |
|---|---|
| `StatusLivro` | `"Lido" \| "Não lido"` (só aceita esses dois textos) |
| `Livro` | estrutura vinda da API: `_id`, `title`, `author`, `status` |
| `NovoLivro` | `Omit<Livro, "_id">`: livro antes de ser salvo |
| `BookListProps`, `BookItemProps`, `BookFormProps` | props de cada componente |
| `FormularioLivro`, `CampoEvento`, `EnvioEvento` | estado e eventos do formulário |

## Estrutura

```
src/
├── components/
│   ├── BookList.tsx     lista (carregando / vazia / itens)
│   ├── BookItem.tsx     um livro + remover + alternar status
│   └── BookForm.tsx     formulário controlado
├── services/api.ts      GET, POST, DELETE, PUT com fetch
├── types/livro.ts       interfaces e types
├── App.tsx              estado e funções que chamam a API
├── main.tsx
└── estilos.css
```

## Como rodar

1. Gere uma URL em [crudcrud.com](https://crudcrud.com). Ela é única, não precisa de cadastro e **expira em cerca de 24 horas**.
2. Copie `.env.example` para `.env.local` e cole a sua URL:
   ```
   VITE_CRUDCRUD_URL=https://crudcrud.com/api/seu-codigo
   ```
3. Instale e rode:
   ```bash
   npm install
   npm run dev      # http://localhost:5173
   npm run build    # verifica os tipos (tsc) e gera dist/
   ```

Sem a URL configurada, a página mostra um aviso em vez de quebrar.

## Tecnologias

React 19 · TypeScript · Vite · Fetch API · crudcrud
