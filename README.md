# BACKEND TYPE. 

* node/express et mongoDB

## lancement API

* Ajoutez le `.env`
* Installez toutes les dépendances du projet : `npm install`
* Démarrez le serveur Node.js : `npm run start`


### USERS

* `POST`localhost:3000/api/user/signup
    * Création d'un compte utilisateur

* `POST`localhost:3000/api/user/login
    * Connexion au compte utilisateur

* `GET`localhost:3000/api/users
    * Récupération des utilisateurs

* `GET`localhost:3000/api/user/:id
    * Récupération d'un utilisateur par :id

* `DELETE`localhost:3000/api/user/delete/:id
    * Suppression d'un utilisateur

* `PATCH`localhost:3000/api/user/update/:id
    * Modification d'un utilisateur


