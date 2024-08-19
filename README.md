<body>
  <h1>Trybe Futebol Clube</h1>
  <p>Este projeto é uma aplicação desenvolvida em <strong>Node.js</strong> usando <strong>Express</strong> para criar e gerenciar partidas de futebol, além de fornecer endpoints para consultar a classificação de times.</p>

  <h2>Endpoints</h2>

  <h3>/leaderboard/home</h3>
  <p>Retorna a classificação dos times em partidas como mandante.</p>

  <h3>/leaderboard/away</h3>
  <p>Retorna a classificação dos times em partidas como visitante.</p>

  <h3>/leaderboard</h3>
  <p>Retorna a classificação geral dos times considerando todas as partidas.</p>

  <h3>/matches</h3>
  <p>Gerencia partidas, incluindo criação, atualização, finalização e listagem de partidas.</p>

  <h3>/teams</h3>
  <p>Gerencia as equipes, incluindo listagem e consulta de equipes por ID.</p>
  <br />
  <h2>Estrutura do Projeto</h2>
  <ul>
    <li><strong>Controller:</strong> Contém os controladores responsáveis por manipular as requisições e enviar as respostas.</li>
    <li><strong>Service:</strong> Contém as regras de negócio e interação com os modelos de dados.</li>
    <li><strong>Model:</strong> Contém os modelos Sequelize que representam as tabelas no banco de dados.</li>
    <li><strong>Middleware:</strong> Contém as validações e verificações de regras antes da execução dos controladores.</li>
  </ul>
  <br />
  <h2>Tecnologias usadas para o desenvolvimento do Backend:</h2>
  <div style="display: flex; gap: 10px;">
    <img alt="typeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
    <img alt="MySQL" src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white">
    <img alt="Docker" src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white">
    <img alt="NodeJs" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
    <img alt="Sequelize" src="https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue">
    <img alt="JWT" src="https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink">
    <img alt="Express" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">
  </div>
  <br />
  <h2>Tecnologias usadas nos testes:</h2>
  <div>
    <img alt="Chai" src="https://img.shields.io/badge/chai.js-323330?style=for-the-badge&logo=chai&logoColor=red">
    <img alt="Sinon" src="https://img.shields.io/badge/sinon.js-323330?style=for-the-badge&logo=sinon">
  </div>
  <br />
  <hr></hr>
  <h3>Contatos: 😉</h3>
  <div style="display: flex; gap: 10px;">
    <a href="https://www.linkedin.com/in/paulodalalana/" target="_blank">
      <img alt="Linkedin" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
    </a>
    <a href="https://github.com/paulodalalana" target="_blank">
      <img alt="Github" src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white">
    </a>
    <a href="https://mail.google.com/mail" target="_blank">
      <img alt="Gmail" src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white">
    </a>
  </div>
  <p>Vamos nos conectar no <a href="https://www.linkedin.com/in/paulodalalana/" target="_blank">LinkedIn</a>, será uma ótima forma de trocarmos conhecimento e experiência.
</body>
</html>
