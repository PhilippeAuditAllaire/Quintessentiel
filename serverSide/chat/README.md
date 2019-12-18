# Chat app

## Glossaire

| Terme   | Definition                 |
|---------|----------------------------|
| admin   | gestionnaire               |
| user    | gestionnaire et customer   |
| convo   | conversation               |
| socket  | connection semi-permanente |
| room    | sous-section d'un socket   |
|  |  |

## Participants

Il y a 3 participants dans chaque conversation.

- Client
- Gestionnaire
- Serveur

## Socket

L'admin a une room prive avec le serveur pour etre notifier quand il y a des nouveaux customers
Chaque customer va ouvrir un room, et le serveur va faire rejoindre l'admin

### Room

La difference entre une conversation et une room est que l'admin peux etre connecte a plusieurs rooms
en meme temps mais il voit une seule conversation a la fois.

## File Structure

| Folder  | Fichier             | Responsabilite                              |
|---------|---------------------|---------------------------------------------|
| backend | startChatServer     | Demarre le serveur de chat                  |
| backend | database            | Gestion de sauvegarde de la base de donnees |
|         |                     |                                             |
| admin   | serviceAdmin        | Operations effectuees par l'administrateur  |
| admin   | startAdminChat      | Demarre une nouvelle conversation admin     |
|         |                     |                                             |
| users   | startCustomerChat   | Demarre une nouvelle conversation client    |
| users   | classes             | Structure des donnees en memoire            |
| users   | dynamicGui          | Modify l'interface graphique                |
| users   | onEventUser         | Les evenements lances par l'utilisateur     |
| users   | onEventNetworkFront | Les evenements recu depuis le reseau        |
| users   | formaters           | Mise en forme du texte                      |

## How it work

- Start server
- Admin join server with socket

- Customer join server on the socket
- Customer has a room id unique
- Server force Admin to join Customer on the customer room
- Ad nauseum

## Action flow

eventHappen -> onEvent -> doSomething

## TODO

- C'est possible d'utiliser les id de client au lieu d'en generer un.
