Il s'agit d'une application [Nodejs](https://nodejs.org/) realisée avec le framework [Koajs](https://koajs.com/) utilisant une base de donnée [MySQL](https://www.mysql.com/) pour le stockage des données

# Configuration

Tout d'abord installer les dependances du projet

    yarn
    #or
    npm i

ensuite creez le fichier **.env** qui doit contenir les variables suivantes

    PORT=8000
    MYSQL_HOST=YOUR_MYSQL_HOST_NAME
    MYSQL_USER=YOUR_MYSQL_USER_NAME
    MYSQL_PASSWORD=YOUR_MYSQL_PASSWORD
    MYSQL_DATABASE=YOUR_MYSQL_DATABASE

# Execution

Lancez le **server de developpement**

    yarn dev
    #or
    npm run dev

Ouvrez [http://loccalhost:8000/](http://localhost:8000/) avec votre navigateur pour voir le resultat.

# Test

Pour testez les fonctionnalités de l'api, executer les tests realisés avec **jest** grâce à la commande suivante

    yarn test
    #or
    npm run test

# Routes

Les routes API sont accessibles dans le dossier **src/routes**

| Method | Routes                  | desciption                                         |
| :----- | :---------------------- | :------------------------------------------------- |
| GET    | /citoyen                | recuperer les données de tous les citoyens         |
| GET    | /citoyen/:id            | recuperer les données d'un citoyen                 |
| POST   | /citoyen                | ajouter un citoyen                                 |
| PUT    | /citoyen/:id            | modifier les données d'un citoyen                  |
| DELETE | /citoyen/:id            | supprimer les données d'un citoyen                 |
| PUT    | /citoyen/validation/:id | valider le compte d'un citoyen qui s'est inscrit   |
| POST   | /auth/register          | se connecter à l'application et recuperer le token |