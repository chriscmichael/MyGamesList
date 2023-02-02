# My Games List

- Claudia Harrison
- Chris Michael
- Brian Eggert
- Garrett Strand

My Games List - a place for gamers to keep track of games

## Design

- [API design](docs/apis.md)
- [GHI](docs/ghi.md)
- [Integrations](docs/integrations.md)

## Intended market

We are targeting gamers of all walks of life who want to build lists of games: games they have enjoyed, games they want to play, or whatever other list they like.

## Functionality

- New users can create an account with username and password. No email or further personal information is required.
- Users can view a list of all games or a list of all users without being signed in. This will allow them to better understand how the site works.
- Once they have created an account, users can begin to build their own lists, first by creating a list, and then by browsing or searching for games and adding them to their desired list(s).
- Registered users can view other user's accounts and lists.

## Project Initialization

To fully enjoy this application on your local machine, please make sure to follow these steps:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run `docker volume create mongo-data`
4. Follow the directions in [integrations](docs/integrations.md) to cache the game database.
4. Run `docker compose build`
5. Run `docker compose up`
6. Open a browser and navigate to http://localhost:3000/
