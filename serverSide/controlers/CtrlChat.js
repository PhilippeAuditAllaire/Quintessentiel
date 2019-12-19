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
            question: info.question,
            messages: []
          };

          for(let i = 0;i < messages.length;i++)
          {
            objRoom.messages.push({isAdmin:messages[i].isAdmin,message:messages[i].message})
          }

          return objRoom;

        });

    }

    //Gets all the chats that are still
    //active and loads each of their messages
    getAllActiveChats()
    {

      let context = this;

      //Load all the active chat rooms
      return this._mgrChat.getAllActiveChats().then((chatRooms) => {
          
          //Create the room object
          let roomObj = chatRooms;
          roomObj.allMessages = {};


          if(chatRooms.length > 0) //There is currently at least one active chat room
          {
            console.log(chatRooms)
            let allRequestsMessages = [];

            //Put all the promises to load the messages in the array
            chatRooms.forEach((room)=>{
                allRequestsMessages.push(context._mgrChat.getChatRoomMessages(room.id));
            });

            return Promise.all(allRequestsMessages,(messages) =>{
              console.log(messages)
            })

          }
      });
    }

    //Inserts a message in the database
    //@isAdmin is a bool telling wether or not
    //the message was sent from an admin
    insertNewMessage(infos,isAdmin)
    {
        return this._mgrChat.insertNewMessage(infos,isAdmin);
    }


}

module.exports = CtrlChat;