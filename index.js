const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const ACTIONS = require("./Actions");
const path = require("path");


const server = http.createServer(app);

const io = new Server(server);

app.use(express.static(path.join(__dirname, "../client/build")));

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})



const getallConnectedClients = (roomId) => {
    
    return  Array.from (io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {

        return {

            socketId,
            username: userSocketMap[socketId],
        };
        
    });
}

const userSocketMap = {};

io.on("connection", (socket) => {
   // console.log(`User connected: ${socket.id}`);

    socket.on(ACTIONS.JOIN ,({roomId,username}) => {//joined 

        userSocketMap[ socket.id] = username;
        socket.join(roomId);
        const clients = getallConnectedClients(roomId);
        //tell all users that new user is joined the room 
        clients.forEach(({socketId}) => {
            
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            });
        });
        
    }); 
//code-sync krne ki vidhi (listening on server(backend))
    socket.on(ACTIONS.CODE_CHANGE , ({roomId ,code }) => {

        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });

    });

    socket.on(ACTIONS.SYNC_CODE , ({socketId,code }) => {  
        io.to(socketId).emit(ACTIONS.CODE_CHANGE , { code });
    });  
    //agar koin new user join hua to use bhi abhi tk ka sara code sync ho jaye aur dikhe 
    



    socket.on("disconnecting", () => {//disconnected 
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {   
                socketId: socket.id,//konsa user remove hua hai uska id aur useraname
                username:userSocketMap[socket.id],//ab hmne emit krdiya hai ab hme frontend pe listen krna hai 
            });
              
            });
           delete userSocketMap[socket.id];//ab hmne delete krna hai upar hmne dikha diya konsa delete hua hai ab hm ise object se delete kr dena hai 
           socket.leave();
        });

});




const PORT=process.env.PORT || 5001;
server.listen(PORT, () => console.log("server is running "));