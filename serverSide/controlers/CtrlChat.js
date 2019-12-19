const MgrChat = require("../managers/MgrChat.js");

class CtrlChat{

    constructor() {
    	this._mgrChat = new MgrChat();
    }

    //Inserts a new discussion
    //in the database
    //@discussionInfos are the infos needed
    //in order to create a new discussion
    //@Returns a promise
    createNewDiscussion(discussionInfos)
    {
        return this._mgrChat.createNewDiscussion(discussionInfos);
    }

    //Updates the client's socket id
    //@roomId is the id of the room from which
    //to update the socketId
    //@newSocketId is the new socket Id that'll replace
    //the older one
    updateSocketId(roomId,newSocketId)
    {
      return this._mgrChat.updateSocketId(roomId,newSocketId);
    }


    //Loads all the messages from a
    //given room Id
    //@roomId is the id of the room in from which
    //we want to load the messages from
    getMessagesFromRoom(roomId)
    {
      return this._mgrChat.getChatRoomMessages(roomId);
    }

    //Loads the informations about a given
    //room
    //@roomId is the id of the room
    //to load the infos from
    getRoomInfos(roomId)
    {
      return this._mgrChat.getRoomInfos(roomId);
    }

    //Gets all the informations about a room, 
    //including the messages
    //@roomId is the id of the room to load all the
    //infos from
    //@Returns the formatted informations
    getAllRoomInformations(roomId)
    {
      //Load all the infos and messages related to the roomId
      return Promise.all([this.getRoomInfos(roomId),this.getMessagesFromRoom(roomId)]).then((infos) =>{
         
          let info = infos[0][0];
          let messages = infos[1];

          //Format everything into objects
          let objRoom = {
            roomId: roomId,
            username: info.username,
            question: info.question,
            socketId: info.socketId,
            messages: []
          };

          for(let i = 0;i < messages.length;i++)
          {
            objRoom.messages.push({isAdmin:messages[i].isAdmin,message:messages[i].message})
          }

          return objRoom;

        });

    }

    //Gets all the active rooms and
    //gets all of their informations and
    //messages
    //@Return a promise that returns a 
    //formatted object
    getAllActiveRoomsAndInfos()
    {
      let context = this;
      let allPromisesRoomInfo = [];
      let adminRoomsObj = {
        rooms: []
      };

      return this.getAllActiveChats().then(function(allChats){

          //Push all the load all infos about rooms promises in 
          //an array
          for(let i = 0;i < allChats.length;i++)
          {
            allPromisesRoomInfo.push(context.getAllRoomInformations(allChats[i].id))
          }

          //Execute all the promises at once
          return Promise.all(allPromisesRoomInfo).then(function(roomInfos){
              
              //Put all the infos in the rooms object
              for(let i = 0;i < allChats.length;i++)
              {
                adminRoomsObj.rooms.push(roomInfos[i]);
              }

              return adminRoomsObj;

          });
      });
    }

    //Gets all the chats that are still
    //active and loads each of their messages
    getAllActiveChats()
    {
      //Load all the active chat rooms
      return this._mgrChat.getAllActiveChats();
    }

    //Inserts a message in the database
    //@isAdmin is a bool telling wether or not
    //the message was sent from an admin
    insertNewMessage(infos,isAdmin)
    {
        return this._mgrChat.insertNewMessage(infos,isAdmin);
    }

    //Updates the status of the given room
    //id
    //@roomId is the room to update the status to
    //@status is the new status to give to the room
    updateRoomStatus(roomId,status)
    {
      return this._mgrChat.updateRoomStatus(roomId,status);
    }


}

module.exports = CtrlChat;