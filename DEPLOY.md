# Guia — publicar o site (Eleventy) no GitHub Pages

## Opção recomendada: deploy automático via GitHub Actions

Mais robusto que fazer commit manual da pasta de output — o build corre no GitHub sempre que fazes push.

### 1. Configurar o Eleventy para gerar em `_site`
No `.eleventy.js`, confirma que o output é `_site` (default do Eleventy):
```js
module.exports = function (eleventyConfig) {
  return {
    dir: {
      output: "_site"
    }
  };
};
```

### 2. Criar o workflow do GitHub Actions
Criar o ficheiro `.github/workflows/deploy.yml`:

```yaml
name: Deploy site

on:
  push:
    branches: ["main"]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: "_site"

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### 3. Ativar o GitHub Pages no repositório
No GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**

### 4. Push para `main`
```bash
git add .
git commit -m "setup deploy"
git push origin main
```
O site fica disponível em `https://<utilizador>.github.io/<nome-do-repo>/`.

## Domínio próprio (opcional)
Se quiseres usar um domínio teu em vez do subdomínio `github.io`:
1. **Settings → Pages → Custom domain** — escreve o teu domínio
2. No teu fornecedor de DNS, cria um registo `CNAME` a apontar para `<utilizador>.github.io`
3. O GitHub cria automaticamente um ficheiro `CNAME` no output — se usares Eleventy, garante que ele é copiado para `_site` (podes colocar um ficheiro `CNAME` em `content/` como *passthrough copy* no `.eleventy.js`)

## Nota sobre i18n e caminhos
Como o site é bilingue com PT na raiz e EN em `/en/`, não é preciso configuração extra no GitHub Pages — os caminhos gerados pelo Eleventy (`/`, `/en/`, `/blog/`, `/en/blog/`) funcionam diretamente como pastas estáticas.

## Checklist antes do primeiro deploy
- [ ] `npm run build` corre sem erros localmente
- [ ] `_site/index.html` e `_site/en/index.html` existem após o build
- [ ] Links internos usam caminhos relativos corretos (testa em `npx serve _site`)
- [ ] Aprovação do teu empregador atual sobre os side gigs está confirmada, antes de tornares o site público
