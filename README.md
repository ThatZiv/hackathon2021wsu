# Friendzy - `Hackathon 2021 WSU`
Friendzy is a simple chatting application that allows users to communicate with eachother with the option to utilize rooms

![img](https://github.com/ThatZiv/hackathon2021wsu/blob/main/pics/chat.PNG?raw=true)

## Contributors
* @thatziv - https://github.com/thatziv
* @masrurtajwar - https://github.com/masrurtajwar
* @pollchowdhury - https://github.com/pollchowdhury

## Problem
Over the past year or so, the COVID-19 Pandemic has dimished our social lives due to the restrictions, especially through the holidays. With **Friendzy** users are allowed to communicate with each other and stay in contact through these hard times with privacy and speed.

## Technicalities
* Languages: `HTML/CSS, and JavaScript (node.js too)`.
* Frameworks: `Express.js (Server & Router), Socket.io (Client & Server)`
* Data: All data is temporary and nothing is permanent. The temp data (Users and Room data) can be accessed through the predefined socket events.

## Progression
Much work was done during the hackathon. Express.js http server was built around the backend of the service, binded with a socket.io server. The frontend is served via the backend web server and the client sided code connects to the backend socket.io server. Through this, the user is able to transmit data to the server and recieve data from the server with ease.

## Navigation
* The `client` folder houses all the client sided html/js code
* `index.js` is the main file that runs the entire backend
* `users.js` houses the user's data (username, unique identifer, etc)
* `rooms.js` houses the room data (members ids in each room and unique identifier for room id)
* `routing` folder has the routes used for the backend web server

## Reproduction
1. clone the repo
```sh
git clone https://github.com/ThatZiv/hackathon2021wsu
```

2. install dependencies
```sh
npm i
```

3. create a `.env` file
```sh
touch .env
```

4. edit the `.env` file, make sure it has the following contents
```yaml
PORT=2000
```

5. run the service
```sh
node .
```

6. connect to the website @ `http://localhost:2000/`

