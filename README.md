# Pirate Land
### A family game for people of all ages
#### Table of contents
##### 1. Setup and Usage
##### 2. Tech Summary
##### 3. Business
### Setup and Usage:
#### Frontend
``` 
1. cd pirate-land
2. Update defaultState in pirate-land/pirate-land/src/contexts/api.context.tsx
3. npm install
4. npm start
```
#### Backend
```
1. cd pirate-land-server
2. Update the .env file
3. npm install
4. npm start or npm run dev (requires nodemon to be installed)
```
### Tech Summary:
#### 🗄️ Database
Users table stores user's details and credentials. Apart from that it has current_game column which either going to hold null or the id of the game the user is currently playing, with the help of this column we can redirect the user to the respective game which he/she has left in the middle of the game. The games column is an list and will hold timeuuids of the games that were played by the user there by aiding the game records at the profile page.

Tokens table is used to store the id and jwt session token of the user which helps in authenticating and authorizing the user to the server

Sockets table has the responsibility to keep track of the id of the socket via which the user is connected. If the user closes the tab without logging out, the socket gets disconnected and upon disconnection the server removes the user session from the db thereby logging out the user

![](https://github.com/jarusYajiv67/pirate-land/blob/main/db.PNG)

Games table has got all the necessary details required per game. initial column helps us know the status of the game, whether the players are hiding their instances or finding the other players. With the help of launched column it easy to identify whether the game has started or not. If the game has started it redirects to the play area else stays in the lobby area. The game can only be launched by the user who created the game and with the help of creator column we know whether the user at the lobby can launch the game or not. players is an array of id of the users who are part of the game. With the help of chance_of column we can know its whose chance to make the move

Teams table has players array that holds the ids of the respective team members which helps in finding the integrity of the relationship between the user and the team. Players of same team gets connected to room with id of this table for team chat and initial placing phase

Scoreboard holds the team wise scores which has the custom type score with id, caught (no. of times the user got caught) and captures (no. of times the user captured pirates)

Messages table holds the conversations made during the game. It is partitioned by chat_id which is the id of the teams (for team chat) or id of the game (for world chat) and is clustered by created_at in descending order

Board table holds the game board, each game has two boards where each team takes a board. When a click is made the team board is updated if the game is in initial phase else the opponents table is checked for hit and the score is updated if hit
#### 🚀 Backend
As mentioned earlier Pirate Land's backend is written in JavaScript with NodeJs. Handling the requests from client side was possible through ExpressJs framework. Custom middleware was written for verifying the users with the help of JSON Web Token package. Cassandra driver was used to communicate with Astra DB from the server.  Morgan was handy when it comes to logging the details about the incoming requests. Each and every single api endpoints has been documented which can be found alongside the code

#### ✨ Frontend
Pirate's land frontend is written in JavaScript with ReactJs. styled-components have been used for styling in order to avoid overlapping of the styles upon bundling. To make api call axios is being used rather than the inbuilt fetch api. State of the app is managaed with the help of react context in order to avoid the boilerplate code being produced when used redux. But when the right time comes state management will be switched to redux as it would be easy to manage to new data that will be added. The timeago Js library is used to convert the date object to string indicating the time in natural language. There are 5 pages and 21 components and the routing is managed with react-router-dom

#### 💰 Business
The main source of income for Pirate Land can be generated via advertisements and user subscriptions. The advertisements are location based and are showed when an API call is being processed. The advertisers chooses their desired location and the amount of time they want to show the specified advertisement. Example, Advertiser A pays Pirate Land to show advertisements on City C from K o clock till L o clock. Thus the users(with free subscription) residing in City C will see advertisements from Advertiser A between the time K - L o clock. The cost to advertise varies from time to time and location to location. There are 3 plans provided for the user to subscribe for, namely Free, Pro and Premium and costs 0$, 5$ and 3$ per year respectively. With premium and pro subscriptions the advertisements are removed. With pro subscription the user can have custom pirate (game character) image and can communicate in game with voice chat apart from using the text chat
