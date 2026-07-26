# Estrutura do projeto — site Shopify (Eleventy + Tailwind)

## Stack
- **Eleventy (11ty)** — gerador de site estático, i18n em build-time, zero JS runtime por defeito
- **Tailwind CSS** — estilização
- Conteúdo em **Markdown** para páginas e blog
- Bilingue: **PT** (idioma default, raiz `/`) e **EN** (prefixo `/en/`)

## Estrutura de pastas

```
projeto/
├── content/
│   ├── index_pt.md              # Home (PT)
│   ├── index_en.md              # Home (EN)
│   ├── servicos_pt.md           # Serviços (PT)
│   ├── servicos_en.md           # Services (EN)
│   ├── sobre_pt.md              # Sobre (PT)
│   ├── sobre_en.md              # About (EN)
│   └── blog/
│       ├── meu-primeiro-artigo/
│       │   ├── meu-primeiro-artigo_pt.md
│       │   └── meu-primeiro-artigo_en.md
│       └── outro-artigo/
│           ├── outro-artigo_pt.md
│           └── outro-artigo_en.md
│
├── _includes/
│   ├── base.njk                 # Layout base (header, footer, <head>)
│   ├── pagina.njk                # Layout para páginas principais
│   └── post.njk                  # Layout para artigos do blog
│
├── _data/
│   └── site.json                 # Dados globais (nome, contactos, links)
│
├── src/
│   └── css/
│       └── tailwind.css          # Entry point do Tailwind
│
├── .eleventy.js                  # Configuração do Eleventy (permalinks, coleções, i18n)
├── tailwind.config.js
├── package.json
└── public/                       # Output final (gerado no build)
```

## Frontmatter — páginas principais

```yaml
---
layout: pagina.njk
lang: pt
permalink: /
title: "Vende mais com uma loja Shopify mais rápida"
---
```

Para a versão EN da mesma página, `permalink: /en/` e `lang: en`.

## Frontmatter — artigos do blog

```yaml
---
layout: post.njk
lang: pt
slug: meu-primeiro-artigo
permalink: /blog/meu-primeiro-artigo/
title: "Título do artigo"
date: 2026-07-26
---
```

Versão EN: `permalink: /en/blog/meu-primeiro-artigo/`, `lang: en`, mesmo `slug`.

## Coleções (`.eleventy.js`)

Define uma coleção `blog` que agrupa todos os `.md` dentro de `content/blog/`, filtrável por `lang`, para gerar a página de listagem `/blog/` e `/en/blog/` automaticamente.

## Fluxo para publicar um artigo novo
1. Criar pasta `content/blog/nome-do-artigo/`
2. Criar `nome-do-artigo_pt.md` e `nome-do-artigo_en.md` com o frontmatter acima
3. Escrever o conteúdo em Markdown
4. Correr `npm run build` — o artigo aparece automaticamente em `/blog/` e `/en/blog/`

## Comandos
```bash
npm install
npx @11ty/eleventy --serve   # desenvolvimento local
npm run build                # build de produção (gera /public ou /_site)
```
