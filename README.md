<p align="center">
  <a href="#-nlw-esports">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout Original</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; 
  <a href="#-next-level">Próximo Nível</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar">Como executar</a>&nbsp;&nbsp;&nbsp;
</p>

# 🎮 NLW eSports
&nbsp;&nbsp;&nbsp;&nbsp; A aplicação tem como finalidade conectar pessoas que desejam jogar um mesmo jogo e se divertir juntas. Foi desenvolvido durante o NLW (Next Level Week, evento que ocorre durante 
uma semana totalmente online, gratuito e prático promovido pela Rocketseat com muito código, desafios e networking) eSports Ignite, especificamente, 
do dia 11 ao dia 18 de setembro de 2022.

&nbsp;&nbsp;&nbsp;&nbsp; Nele foi desenvolvido o back end em Node e o front end em React (para web) e React Native (para mobile), e a princípio, utilizando o 
banco de dados SQLite, com a aplicação rodando, o usuário poderia acessar o site e fazer um anúncio para que outros players interessados em jogar o mesmo 
jogo pode-se entrar em contato com ele pelo discord e assim se divertirem.

###  Pagina inicial
<br>

<img src="https://user-images.githubusercontent.com/82176047/194787007-b5c5a35f-4276-4a97-ac77-0e9eb4909090.png" alt="" width="700" />


<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://user-images.githubusercontent.com/82176047/194795301-bc0b13c9-9fa0-4226-8589-ffc6b8402b3d.gif" alt="" width="400" />
</p>

<br>

## 🏷 Layout

Veja o layout do projeto original através do figma abaixo:

- <a href="https://www.figma.com/community/file/1150897317533332617" target="_blank">Layout Web</a>

## 💻 Tecnologias
Esse projeto foi desenvolvido com as seguintes tecnologias:

- [React](https://reactjs.org/)
- [Node](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Axios](https://axios-http.com/docs/intro)
- [Prisma](https://www.prisma.io)
- [Tailwindcss](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com/)
- [Kenn-Slider](https://keen-slider.io/)
- [TypeScript](https://www.typescriptlang.org)

## 🚀 Next Level
ALGUMAS MELHORIAS REALIZADAS

<ul>
  <li><h3>Página Game</h3></li>
  <ul>
    <li>Na parte web, foi criada uma página no qual passa informações sobre o jogo selecionado, foi colocado um link para acessar site do jogo.</li>
    <li>Publicar mais anúncios.</li>
    <li>Poder ver os anúncios já criado do jogo selecionado.</li>
    <br>
    <img src="https://user-images.githubusercontent.com/82176047/194798596-03158018-8e30-4475-a64d-0ee0acdbea37.gif" alt="" width="600" />
  </ul>
  
  <li><h3>Banco de Dados</h3></li>
  <ul>
    <li>O banco de dados foi alterado para o PostegreSQL, pois no SQLite eu não estava conseguindo fazer um array de strings, 
utilizado para a criação das tags, utilizado para descrever o gênero de cada jogo.</li>
  </ul>
  
  <li><h3>Responsividade </h3></li>
  <ul>
    <li>Mesmo a aplicação tendo sua versão mobile, decidi deixar a parte web responsiva para que a aplicação possa ser acessada de 
    dispositivos com tamanho de tela diferente.</li>
    <br>
    <img src="https://user-images.githubusercontent.com/82176047/194801343-404c1fb8-5986-4de6-8b32-b5be36c186b9.png" alt="" width="200" />
    <img src="https://user-images.githubusercontent.com/82176047/194801385-b0855af1-65a8-47ed-89ab-f020f963d4fc.png" alt="" width="200" />
    <img src="https://user-images.githubusercontent.com/82176047/194801421-71df5f8d-5982-4e9d-8d91-68c6c8347b88.png" alt="" width="200" />
  </ul>
  
  <li><h3>Carrossel Games usando KeenSlides</h3></li>
  <ul>
    <li>Foi feito na página inicial para apresentar os games, e também adicionado nos anúncios criados</li>
  </ul>
  
  <li><h3>Validação Front e BackEnd</h3></li>
  <ul>
    <li>A validação poderia ter sido feita utilizando react hook form e o zod, porém acabou ocorrendo alguns imprevistos, então foi feito de maneira mais 
    simples utilizando os próprios atributos do input do HTML e utilizando o próprio javascript</li>
  </ul>
</ul>


## ⚙ Como executar

Clone o repositório e acesse a pasta.

```bash
$ git clone https://github.com/Lucas-M01/nlw-eSport.git

Para iniciar o projeto:

# Instalar as dependências
$ npm install

# Iniciar o projeto
$ npm run dev

```

<h4><strong>Essa parte ainda está em manutenção</strong> 😄 </h4>

