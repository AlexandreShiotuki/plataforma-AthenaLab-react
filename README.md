# 🦉 Plataforma Athena Lab

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Threejs](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Status](https://img.shields.io/badge/Status-Em_Desenvolvimento-warning?style=for-the-badge)

A Plataforma Athena é uma Iniciação Científica desenvolvida com o objetivo de criar um ambiente educacional de robótica 100% gratuito. O foco é democratizar o acesso ao conhecimento tecnológico, permitindo que escolas públicas aprendam robótica, participem de competições como OBR/TBR e incentivando novos talentos a ingressarem no mercado de tecnologia.

🌍 **[Acesse a Plataforma Athena](https://plataforma-athena-lab-react.vercel.app/)**

> ⚠️ **Aviso de Desenvolvimento (WIP):** Esta plataforma está em fase de construção ativa. Algumas áreas, como o Laboratório de Impressão 3D e as imagens das peças estão utilizando modelos genéricos provisórios para testes de interface e arquitetura de código.

---

## 📸 Demonstração
<!-- DICA: Salve o seu GIF na pasta raiz do projeto ou dentro de uma pasta chamada 'assets' e mude o nome do arquivo abaixo -->
![Demonstração da Plataforma Athena](./src/assets/ApresentacaoSite.gif)

---

## 🎯 O que é este projeto

Este projeto é uma aplicação web interativa que reúne conteúdos de robótica, aulas em vídeo, exercícios gamificados e um módulo de visualização avançada de peças para impressão 3D. 

A plataforma foi criada para:
- Democratizar o ensino de robótica em escolas públicas.
- Apoiar a preparação de equipes para competições como OBR e TBR.
- Oferecer um ambiente moderno, intuitivo e gratuito para estudo autodirigido.

## ✨ Funcionalidades

- **Trilhas de Aprendizado:** Página inicial com cursos organizados e seções de aulas.
- **Preparatório OBR:** Curso dedicado com vídeos explicativos e conteúdo pedagógico focado em competições.
- **Exercícios Interativos:** Módulos de exercícios práticos ao final das aulas para fixação de conteúdo.
- **Sistema de Gamificação:** Pontos de experiência (XP) e níveis baseados no progresso do usuário (atualmente utilizando `localStorage`).
- **Laboratório 3D:** Página de impressão 3D com busca, links para download e visualização de modelos reais renderizados diretamente no navegador.
- **Player Integrado:** Navegação fluida com player de vídeo integrado para aulas do YouTube.

## 🚀 Próximos Passos (Roadmap)
- [ ] Integração com banco de dados (Supabase/Firebase) para salvar o progresso dos alunos na nuvem.
- [ ] Sistema de Autenticação (Login/Cadastro).
- [ ] Painel do Professor para acompanhamento de turmas.

## 🛠️ Tecnologias Utilizadas

- **React 19**
- **Vite**
- **React Router Dom** (Gerenciamento de rotas)
- **Three.js** (Renderização 3D)
- **React Player**
- **CSS Modules** (Estilização encapsulada)

## 💻 Como rodar localmente

1. Clone o repositório:
```bash
git clone https://github.com/AlexandreShiotuki/plataforma-AthenaLab-react.git
```

2. Entre na pasta do projeto:
```bash
cd plataforma-athena-react
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Abra o navegador no endereço mostrado pelo Vite (geralmente `http://localhost:5173`).

---

## 👨‍💻 Autor

**Alexandre Shiotuki**
Desenvolvedor Front-end e Pesquisador de Iniciação Científica (UNESP).

* 💼 [LinkedIn](https://www.linkedin.com/in/alexandre-shiotuki-bb20a3240/)
* 🐙 [GitHub](https://github.com/AlexandreShiotuki)

Projeto desenvolvido como ferramenta de divulgação científica e educação tecnológica.