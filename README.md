# LEitor de QR Code

## Project info

O leitor de QR Code criado tem como intuito funcionar em uma interface integrada ao google forns
através do APPS SCRIPT do Google para que possa ter um funcionamento online através do navegador do celular,
assim podendo ser utilizado tanto em um computador quanto em um smartphone sem a necessidade de
versionamento em linguagens específicas como aplicativos Android e IOS.

A ideia inicial era que o aplicativo service como um scaner de formulários 
e que funcionasse de maneira integrada com um banco de armazenamento de dados para
pontuações que seriam registradas em um perfil de usuário o qual seria logado
com um e-mail de aluno do projeto que participará de um campeonato de informática.

O aplicativo tem como intuito ser uma ferramenta auxiliar em um projeto pedagógico na área tecnológica voltado para a iniciativa
REVER o qual é uma escola de reforço para crianças e adolescentes onde o intuito é ajudar os jovens de comunidades
a se integrarem no mercado de trabalho, e para isso, o projeto EIC (Escola de Informática e Cidadania) da instituição
INPAR (Instituto Presbiteriâno Álvaro Reis) sediará o projeto idealizado por Christopher Wallace de Sá Diniz (@chris-topher0910) com parceria de
Jonas Luiz (@jonasluis) que tem como intuito premiar com computadores os alunos destaque do projeto de informatica EIC.

-APLICATIVO LEITOR DE QR CODE

-FUNCIONALIDADES:
[] TELA DE LOGIN
  [] fazer banco de dados com cadastro dos alunos
  
[]SCANER QR CODE
  [] Fazer formulário do google forns para linkar como perguntas do questionário
  [] Usar o Apps Script do google para fazer a API de integração do formulário com o aplicativo
  {}Transformar o link do formulário em um QRcode para ler com o leitor do aplicativo


[]MARCADOR DE SCORE
  [] Fazer um ranking com os alunos cadastrados no banco de dados que fizerem o login no aplicativo

DESENVOLVER INTERFACE

_____________________________________________________________________________________________________________________________________________________________________
CAMPEONATO INFORMATICA

A proposta dessa prova consiste em gerar trabalho em equipe para que através do empenho coletivo os participantes do grupo consigam a oportunidade de disputar os 10 computadores.
*uma oportunidade só existe se você estiver preparado para ela, porem só é uma oportunidade caso a condição seja dada a alguém pois ninguem consegue nada sozinho*

Os grupos de alunos serão separados de acordo com o desempenho ao longo do ano relacionado as aulas, além disso, será integrado ao aplicativo um dump com o registro de e-mail de todos os participantes, para que os grupos não possam ser mudados.

Após isso, será dado o início a prova, após os esclarecimentos das regras e condições.

OFICINAS DO CAMPEONATO

DESCRIPTOGRAFANDO A PISTA DE MONTAGEM DE PCs (eliminatória - grupo)
A prova será dividida em duas etapas, a primeira, será uma caça a pistas de informações para descriptografar um código, o qual revelará a localização da chave de uma sala onde estará alguns computadores a serem desmontados e montados pelos participantes que conseguirem desvendar o código criptografado.
Essa etapa é em grupo, e determinará os participantes das provas seguintes, assim, eliminando os demais grupos participantes.


PISTA DE MONTAGEM DE PC'S (pontuação - individual)
A prova consiste em uma disputa de montagem de PCs.
Cada participante terá que montar os PCs dentro de um tempo limite
porém a pontuação da prova será definida por tempo de montagem e peças colocadas de maneira correta.
Cada peça correta adiciona 1 ponto para o participante, mas o ponto extra para quem terminar a prova primeiro
São 5 componentes no total (PLM, CPU, RAM, HD e Fonte) cada um valendo 1 ponto.
Mais o cabeamento (PLM, CPU, HD energia e HD SATA) cada um valendo 1 ponto.
A pontuação pelo tempo recorde são 2 pontos.
Após montar os PCs, os participantes teram que desmontar os PCs para que os participantes seguintes possam montálos.
Isso também implicará em pontuação, quem desmontar de maneira mais rápida e organizada ganhará 2 pontos

PISTA DE ORIENTAÇÃO DIGITAL (pontuação - individual)
Essa pista será realizada com o uso do aplicativo de leitura de QR Code.
Basicamente, será uma pista de orientação, com um mapa para localizar as perguntas da prova.
Cada pergunta está impressa em um QR Code, sendo um total de 20 perguntas, cada uma valendo 1 ponto.
O participante terá um tempo de 30 min para localizar e responder as perguntas.

CAÇA BANDEIRA DIGITAL (Desempate - individual)
Caso haja empate, será feito uma prova de Caça bandeiras digital, onde os participantes teram que localizar uma bandeira escondida em uma URL.


**URL**: https://lovable.dev/projects/6c3652e4-c87e-4ef6-b619-531ef9c605ad

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/6c3652e4-c87e-4ef6-b619-531ef9c605ad) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/6c3652e4-c87e-4ef6-b619-531ef9c605ad) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
