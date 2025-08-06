# 🌿 Rede Alecrim - Site Institucional

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://redealecrim.netlify.app)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Private-red)](LICENSE)

Site institucional moderno e responsivo da Rede Alecrim, desenvolvido com React e TypeScript. O projeto apresenta um design clean com paleta verde institucional, focando na experiência do usuário e performance.

## 🌐 Demo

**Site em Produção**: [https://redealecrim.netlify.app](https://redealecrim.netlify.app)

## 📋 Sobre o Projeto

O site institucional da Rede Alecrim é uma landing page completa que apresenta a empresa de forma profissional e atrativa, com as seguintes seções:

### 🏠 **Home (Hero)**
- Seção principal com chamada para ação impactante
- Animações suaves de entrada
- Call-to-action direcionando para contato

### ℹ️ **Sobre Nós**
- História e valores da empresa
- Missão, visão e valores organizacionais
- Estatísticas da empresa com contadores animados

### 🏪 **Nossas Lojas** 
- Catálogo completo de lojas organizadas por categoria:
  - **Boti**: Lojas de calçados
  - **QDB**: Quero de Bem (moda feminina)
  - **VD**: Venda Direta (representantes)
- Sistema de filtros dinâmicos
- Informações de contato e localização

### 🖼️ **Galeria**
- Showcase profissional de projetos realizados
- Layout tipo masonry responsivo
- Lightbox modal para visualização ampliada
- Filtros por categoria (landscape, nature, seascape, minimal)
- Sistema de navegação por teclado

### 💼 **Trabalhe Conosco**
- Sistema completo de gestão de vagas
- Carregamento dinâmico de vagas via JSON
- Vagas em destaque
- Categorização automática por área
- Sistema de candidatura integrado
- Banco de talentos para cadastro de currículos

### 📞 **Contato**
- Formulário de contato funcional
- Informações de localização
- Links para redes sociais
- Integração com Google Maps

### 🛠️ **Componentes de Apoio**
- **Header**: Navegação responsiva com menu hamburger
- **Footer**: Informações institucionais e links úteis
- **JobApplication**: Formulário completo de candidatura
- **Animações**: Sistema de animações customizadas

## 🚀 Tecnologias Utilizadas

### **Frontend**
- **React 19.1.1** - Biblioteca principal
- **TypeScript 4.9.5** - Tipagem estática
- **CSS3** - Estilização moderna com:
  - Flexbox e CSS Grid
  - Animações e transições
  - Design responsivo mobile-first
  - Variáveis CSS customizadas

### **Bibliotecas e Dependências**
- **Lucide React 0.536.0** - Ícones modernos e otimizados
- **React Scripts 5.0.1** - Configuração e build tools
- **Web Vitals 2.1.4** - Métricas de performance

### **Desenvolvimento e Testes**
- **@testing-library/react 16.3.0** - Testes de componentes
- **@testing-library/jest-dom 6.6.4** - Matchers customizados
- **@testing-library/user-event 13.5.0** - Simulação de eventos

### **TypeScript Types**
- **@types/react 19.1.9**
- **@types/react-dom 19.1.7**
- **@types/node 16.18.126**
- **@types/jest 27.5.2**

## 📁 Estrutura do Projeto

```
rede-alecrim-site/
├── public/
│   ├── images/           # Imagens do site
│   ├── vagas.json       # Dados das vagas de emprego
│   ├── index.html       # Template HTML principal
│   ├── icon.ico        # Favicon
│   └── robots.txt      # Configuração para crawlers
├── src/
│   ├── components/     # Componentes React
│   │   ├── About.tsx/.css        # Página Sobre
│   │   ├── Contact.tsx/.css      # Página Contato
│   │   ├── Footer.tsx/.css       # Rodapé
│   │   ├── Gallery.tsx/.css      # Galeria de fotos
│   │   ├── Header.tsx/.css       # Cabeçalho/navegação
│   │   ├── Hero.tsx/.css         # Seção principal
│   │   ├── Jobs.tsx/.css         # Página de vagas
│   │   ├── JobApplication.tsx/.css # Formulário candidatura
│   │   ├── Services.tsx          # Página serviços
│   │   └── Stores.tsx/.css       # Página lojas
│   ├── hooks/
│   │   └── useAnimations.ts      # Hooks customizados
│   ├── App.tsx/.css     # Componente principal
│   ├── index.tsx/.css   # Ponto de entrada
│   └── animations.css   # Animações globais
├── build/              # Arquivos de produção
├── package.json        # Dependências e scripts
├── tsconfig.json       # Configuração TypeScript
└── README.md          # Este arquivo
```

## 🔧 Como Executar

### **Pré-requisitos**
- Node.js 16+ 
- npm ou yarn

### **Instalação e Execução**

1. **Clone o repositório**
```bash
git clone https://github.com/devCaiqueWS/redeAlecrim.git
cd rede-alecrim-site
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute em modo desenvolvimento**
```bash
npm start
```

4. **Acesse o site**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### **Build para Produção**
```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `build/`.

## 🎯 Funcionalidades Principais

### **Sistema de Navegação Responsiva**
- Menu hamburger para dispositivos móveis
- Navegação suave entre seções (scroll behavior)
- Indicadores visuais de seção ativa

### **Animações Avançadas**
- **useScrollAnimation**: Animações baseadas no scroll
- **useStaggerAnimation**: Animações sequenciais escalonadas  
- **useCountAnimation**: Contadores animados para estatísticas
- Transições suaves entre estados

### **Galeria Profissional**
- Layout masonry responsivo (1-4 colunas)
- Lightbox modal com navegação por teclado
- Sistema de filtros dinâmicos
- Lazy loading de imagens
- Placeholders SVG para loading

### **Sistema de Vagas Completo**
- Carregamento dinâmico via `vagas.json`
- Categorização automática por área
- Vagas em destaque
- Sistema de expansão de cards
- Formulário de candidatura integrado
- Banco de talentos via email

### **Otimizações de Performance**
- Componentes React otimizados
- CSS minificado e otimizado
- Lazy loading de recursos
- Responsive images
- Web Vitals monitoring

## 🎨 Design System

### **Paleta de Cores**
```css
:root {
  --primary-green: #7cb342;
  --secondary-green: #4a7c59;
  --dark-green: #2d5016;
  --light-green: #8bc34a;
  --accent-green: rgba(124, 179, 66, 0.1);
  
  --background: #f8f9fa;
  --text-primary: #2c5530;
  --text-secondary: #6c757d;
  --white: #ffffff;
}
```

### **Typography**
- Fonte principal: System fonts (Arial, Helvetica, sans-serif)
- Hierarquia clara de tamanhos
- Responsividade com `clamp()`

### **Layout**
- Mobile-first approach
- Breakpoints: 480px, 768px, 991px, 1200px, 1400px
- Grid system flexível
- Componentes modulares

## 📱 Responsividade

O site é totalmente responsivo e otimizado para:

- **📱 Mobile**: 320px - 767px
- **📟 Tablet**: 768px - 991px  
- **💻 Desktop**: 992px - 1199px
- **🖥️ Large Desktop**: 1200px+

### **Principais Adaptações Mobile**
- Menu hamburger colapsível
- Stacking de cards e grids
- Otimização de tamanhos de fonte
- Ajuste de espaçamentos
- Touch-friendly buttons

## 🔌 Integrações

### **Sistema de Vagas**
```json
// public/vagas.json
{
  "id": "unique-id",
  "titulo": "Título da Vaga",
  "local": "Cidade/Estado", 
  "salario": "Faixa salarial",
  "categoria": "vendas|administrativo|operacional",
  "tipo": "Presencial|Remoto|Híbrido",
  "empresa": "Nome da empresa",
  "responsavel": "Nome do responsável",
  "descricao": "Descrição completa",
  "responsabilidades": ["item1", "item2"],
  "requisitos": ["requisito1", "requisito2"], 
  "beneficios": ["beneficio1", "beneficio2"],
  "experiencias_preferenciais": ["exp1", "exp2"]
}
```

### **Sistema de Email (Candidaturas)**
- Integração via `mailto:` links
- Formulários pré-preenchidos
- Dados estruturados para RH

### **Deploy Automático**
- **Netlify**: Deploy contínuo via Git
- **Domínio customizado**: redealecrim.netlify.app
- **SSL certificado**: HTTPS automático

## 🧪 Scripts Disponíveis

### **Desenvolvimento**
```bash
npm start          # Servidor de desenvolvimento (port 3000)
npm test           # Executa testes em modo watch
```

### **Produção** 
```bash
npm run build      # Build otimizado para produção
```

## 📊 Performance

### **Métricas Alvo (Web Vitals)**
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)  
- **CLS**: < 0.1 (Cumulative Layout Shift)
- **FCP**: < 1.8s (First Contentful Paint)

### **Otimizações Implementadas**
- Code splitting automático
- Tree shaking de dependências
- Compressão de assets
- Lazy loading de componentes
- Otimização de imagens

## 🔒 Segurança

- **Sanitização**: Inputs sanitizados
- **HTTPS**: SSL/TLS obrigatório  
- **CSP**: Content Security Policy
- **No inline scripts**: Prevenção XSS
- **Dependências auditadas**: Vulnerabilidades monitoradas

## 🐛 Troubleshooting

### **Problemas Comuns**

**❌ Erro: "Module not found"**
```bash
# Limpe node_modules e reinstale
rm -rf node_modules package-lock.json
npm install
```

**❌ Erro de build TypeScript**
```bash
# Verifique tipos e reinstale @types
npm install @types/react @types/react-dom
```

**❌ Erro de CSS não carregando**  
```bash
# Verifique imports de CSS nos componentes
# Limpe cache do build
npm run build
```

**❌ Problemas de performance**
```bash
# Analise o bundle
npm install -g webpack-bundle-analyzer  
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

## 🤝 Contribuição

### **Workflow de Desenvolvimento**
1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Add: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### **Padrões de Código**
- **TypeScript strict mode** habilitado
- **ESLint** para linting  
- **Prettier** para formatação
- **Conventional Commits** para mensagens

### **Estrutura de Commits**
```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: tarefas de manutenção
```

## 📞 Suporte

Para dúvidas, sugestões ou suporte técnico:

- **Email**: dev@redealecrim.com.br
- **GitHub Issues**: [Criar issue](https://github.com/devCaiqueWS/redeAlecrim/issues)
- **WhatsApp**: +55 (xx) xxxxx-xxxx

## 📋 Roadmap

### **Próximas Funcionalidades**
- [ ] Sistema de blog/notícias
- [ ] Integração com CRM
- [ ] Dashboard administrativo
- [ ] Sistema de newsletter
- [ ] Chat online/WhatsApp API
- [ ] PWA (Progressive Web App)
- [ ] Multi-idioma (i18n)

### **Melhorias Técnicas**  
- [ ] Migração para Next.js
- [ ] Implementação de testes E2E
- [ ] Monitoramento de performance
- [ ] Cache inteligente
- [ ] Otimização SEO avançada

---

## 📄 Licença

Este projeto é de propriedade privada da **Rede Alecrim**. Todos os direitos reservados.

---

## 👨‍💻 Desenvolvido por

**[Caique WS](https://github.com/devCaiqueWS)**  
Desenvolvedor Full-Stack especializado em React, TypeScript e soluções web modernas.

---

⭐ **Se este projeto foi útil, considere dar uma estrela no GitHub!**
