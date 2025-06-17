# GastronoMe

## Descrição  

GastronoMe foi desenvolvido como um projeto de estudos, com foco em FastAPI no backend e Vue.js no frontend

O GastronoMe oferece uma experiência intuitiva e agradável para os amantes da culinária.

## Tecnologias Utilizadas  
  
*   **Backend:** FastAPI (Python)  
*   **Frontend:** Vue.js (JavaScript)  
*   **Banco de Dados:** PostgreSQL  
*   **ORM:** SQLMOdel

## Funcionalidades  
  
*   Cadastro e login de usuários  
*   Criação, edição e exclusão de receitas  
*   Visualização detalhada de receitas
*   Busca de receitas por nome
*   Interface responsiva e minimalista

## Pré-requisitos  
  
Antes de começar, você vai precisar ter instalado na sua máquina:  
  
*   [Python 3.8+](https://www.python.org/downloads/)  
*   [Node.js 14+](https://nodejs.org/en/download/)  
*   [pip](https://pip.pypa.io/en/stable/installing/) (gerenciador de pacotes do Python)  
*   [npm](https://www.npmjs.com/get-npm) (gerenciador de pacotes do Node.js) ou [Yarn](https://yarnpkg.com/getting-started/install)

## Configuração do Projeto  
  
1.  **Clone o repositório:**  
  
    ```bash  
    git clone https://github.com/caetanobona/gastronome  
    cd gastronome
    ```  
  
2.  **Configurar o Backend (FastAPI):**  
  
    *   Navegue até a pasta backend:  
  
        ```bash  
        cd src/backend  
        ```  
  
    *   Crie um ambiente virtual (opcional, mas recomendado):  
  
        ```bash  
        python -m venv venv  
        source venv/bin/activate  # No Linux/macOS  
        venv\Scripts\activate  # No Windows (utilize CMD)  
        ```  
  
    *   Instale as dependências do backend:  
  
        ```bash  
        pip install -r requirements.txt  
        ```  
  
    *   Configure as variáveis de ambiente:  
  
        *   Crie um arquivo `.env` na pasta `src/backend/` com as seguintes variáveis:  
  
            ```  
            # Esses são valores para um banco de dados PostgreSQL padrão
            DB_NAME="postgres"
            DB_PASSWORD="password" 
            DB_USER="postgres"
            DB_HOST="localhost"
            DB_PORT="5432"
            ```  
  
            *   Substitua os valores pelos seus dados de configuração do seu banco de dados.  
  
3.  **Configurar o Frontend (Vue.js):**  
  
    *   Navegue até a pasta do frontend:  
  
        ```bash  
        cd ../frontend  
        ```  
  
    *   Instale as dependências do frontend:  
  
        ```bash  
        npm install  # Ou yarn install  
        ```  
  
    *   Configure as variáveis de ambiente:  
  
        *   Crie um arquivo `.env` na pasta `src/frontend/` com as seguintes variáveis:  
  
            ```  
            FAST_API_URL=http://127.0.0.1:8000
            ```  
  
            *   Ajuste a URL da API para corresponder ao endereço do seu backend.  
  
## Executando o Projeto em Desenvolvimento  
  
1.  **Backend (FastAPI):**  
  
    *   Navegue até a pasta `src/backend/src`:  
  
        ```bash  
        cd src/backend/src
        ```  
  
    *   Execute o servidor FastAPI:  
  
        ```bash  
        uvicorn main:app --reload  
        ```  
  
        *   Isso iniciará o servidor em `http://127.0.0.1:8000`. A flag `--reload` permite que o servidor reinicie automaticamente a cada alteração no código.  
  
2.  **Frontend (Vue.js):**  
  
    *   Navegue até a pasta `src/frontend/`:  
  
        ```bash  
        cd src/frontend  
        ```  
  
    *   Execute o servidor de desenvolvimento do Vue.js:  
  
        ```bash  
        npm run serve  # Ou yarn serve  
        ```  
  
        *   Isso iniciará o servidor em `http://localhost:5173` (ou outra porta disponível). O Vue CLI irá monitorar as alterações nos arquivos e atualizar o navegador automaticamente.  
  
3.  **Acessando o Aplicativo:**  
  
    *   Abra o seu navegador e acesse `http://localhost:5173` para visualizar o GastronoMe.
