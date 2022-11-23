# User API

Implementação de um CRUD de usuários com as principais rotinas (create, update, select, delete). A API também conta com uma rota de paginação e uma rota de documentação.

## Rodando a aplicação

* Clone o repositório   
    `git clone https://github.com/josalesmj/users-api.git`

* Instale as dependências   
    `cd users-api`  
    `npm install` 

* Crie o arquivo .env   
    `touch .env`

* Configure as variáveis de ambiente no arquivo .env para as de sua preferência
    * NODE_ENV (O ambiente padrão é o 'test')   
        `NODE_ENV=dev`
    * port (A port padrão é a 3000)   
        `PORT=5000`
    * DB_NAME (O nome do arquivo de banco de dados sqlite, utilizado somente para ambiente 'dev' )    
        `DB_NAME=database`
    * DB_LOGGING (Se não for configurado como false, as queries serão apresentadas no terminal)     
        `DB_LOGGING=false`

* Inicie a aplicação
  
    `npm start`

    Por padrão, o comando irá rodar o projeto no ambiente de teste (test environment), caso o arquivo .env não tenha sido criado ou a variável NODE_ENV não tenha sido definida, criando um banco de dados "in memory".
    
    Você também pode alterar o script do arquivo package.json para iniciar a aplicação com um ambiente diferente do que está no arquivo .env, para isso:

    * Linux:    
        `"start": "NODE_ENV=dev node src/index.js",`
    
    * Windows:  
        `"start": "SET \"NODE_ENV=dev\" && node src/index.js",` 

* Rodando os testes

    `npm test` 

    O comando rodará os testes definidos no arquivo /test/index.js. São 20 testes que irá testar os principais comportamentos da aplicação.

* Documentação

    O projeto inclui uma documentação, gerada através do swagger, na rota "/docs". Nesta documentação você terá todas as rotas, uma pequena descrição delas, o que é esperado na requisição e as respostas da API.