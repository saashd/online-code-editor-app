## Online code editor app built using the MERN stack (MongoDB, Express, React, and Node.js).
 This web app provides real-time code collaboration for mentors and students. It utilizes the MERN stack and socket.io for efficient and seamless code updates. The app has been deployed to Heroku for easy access.

### [Demo](http://code-blocks.alexdruzina.com/)

### Features
 - Real-time code updates with socket.io
 - MERN stack for efficient and effective app development
- Mentor view in read-only mode, student view with editing capabilities
- Deployed to Heroku for easy access

## Project structure

```
├── client   
│   ├── public
│   │   ├── index.html
│   ├── src
│   ├── package.json
│   ├── .env 		->create your own
├── server   
│   ├── models
│   ├── index.js  -> main entrypoint for server side
│   ├── package.json
│   ├── .env		->create your own

```

### Local Usage

To start the client,go to the `client` directory:
create `.env` file:
```
REACT_APP_BASE_URL= http://localhost:4000/ ( Depends on the server port.)
```
then run:
```
npm run dev
```
To start the server side,go to `server` directory:
create `.env` file :
```
MONGO_URL=mongodb+srv://user:password@sqlauthority.5s3yxjh.mongodb.net/codeblocks?retryWrites=true&w=majority
```

then run:
```
npm start
```
## Badges

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![MUI](https://img.shields.io/badge/Material%20UI-00599C?style=for-the-badge&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Mongoose](https://img.shields.io/badge/mongoose-red?style=for-the-badge&logoColor=white)
![SocketIO](https://img.shields.io/badge/SOCKET%20IO-%23593d88.svg?style=for-the-badge&logo=SOCKETIO&logoColor=white)
