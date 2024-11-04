import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { WebSocket, WebSocketServer } from 'ws';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Create a server
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Websocket connection
wss.on("connection",(ws: WebSocket)=>{
    console.log("New client connected");

    ws.on("message", (data)=>{
        console.log("Received a message from the client: "+ data);
        wss.clients.forEach((client) =>{
            if(client !== ws && client.readyState == WebSocket.OPEN){
                client.send(data);
            }
        });
    });


    ws.on("close", () => {
        console.log("Client has disconnected");
    })


});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})
