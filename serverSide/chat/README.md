# Chat app

## Notes

Il y a 3 participants dans chaque conversation.

- Client
- Gestionnaire
- Serveur

| fichier         | Responsabilite                   |
|-----------------|----------------------------------|
| classes         | Structure des donnees en memoire |
|  |  |
| dynamicGui      | Modify l'interface graphique     |
| serviceCustomer | Operations effectuees seulement par le client |
| serviceAdmin    | Operations effectuees seulement par l'administrateur |
| eventUser       | Les evenements lances par l'utilisateur     |
| eventNetwork    | Les evenements recu depuis le reseau        |
| userEmit        | Emit vers le serveur                        |
| formaters       | Mise en forme du texte                      |
| database        | Gestion de sauvegarde de la base de donnees |
|  |  |
| startServer     | Demarre le serveur de chat                  |
| startUser       | Demarre une nouvelle conversation           |

Session

- Conversation
- 