# Chat app

## Participants

Il y a 3 participants dans chaque conversation.

- Client
- Gestionnaire
- Serveur

## Sockets

L'admin a un socket prive avec le serveur pour etre notifier quand il y a  des nouveau chatt
Chaque utilisateur va ouvrir un socket avec le serveur, et le serveur va faire rejoindre l'admin

## File Structure

| Folder  | Fichier             | Responsabilite                              |
|---------|---------------------|---------------------------------------------|
| backend | database            | Gestion de sauvegarde de la base de donnees |
| backend | startChatServer     | Demarre le serveur de chat                  |
|         |                     |                                             |
| admin   | serviceAdmin        | Operations effectuees par l'administrateur  |
| admin   | startAdminChat      | Demarre une nouvelle conversation admin     |
|         |                     |                                             |
| customer| serviceCustomer     | Operations effectuees par le client         |
| users   | startCustomerChat   | Demarre une nouvelle conversation           |
|         |                     |                                             |
| users   | classes             | Structure des donnees en memoire            |
| users   | dynamicGui          | Modify l'interface graphique                |
| users   | onEventUser         | Les evenements lances par l'utilisateur     |
| users   | onEventNetworkFront | Les evenements recu depuis le reseau        |
| users   | formaters           | Mise en forme du texte                      |

## How it work

- Start server
- Admin join server with socket admin

- Customer join server on a new socket
- Server force Admin to join Customer on the customer socket
- Ad nauseum

## Action flow

eventHappen -> onEvent -> doSomething
