const QueryEngine = require("../scripts/QueryEngine.js");

class MgrChat {

    constructor() {
        this._queryEngine = new QueryEngine();
    }


    //Inserts a new discussion
    //in the database
    //@discussionInfos is an object containing
    //all the informations needed for the insert
    //@Returns a promise
    createNewDiscussion(discussionInfos)
    {
        let query = `INSERT INTO chatroom 
                    (id,username,question,isActive)
                    VALUES (DEFAULT,?,?,true)`;
        let param = [
                        discussionInfos.username,
                        discussionInfos.question
                    ];
        return this._queryEngine.executeQuery(query,param);
    }

    //Gets all the active chat rooms
    //@Returns a promise
    getAllActiveChats()
    {
        let query = "SELECT * FROM chatroom WHERE isActive = true";

        return this._queryEngine.executeQuery(query);
    }

    //Gets all the messages from a chatroom
    //@chatroomId is the id of the chatroom
    //to load the messages from
    //@Returns a promise
    getChatRoomMessages(chatroomId)
    {
        let query = "SELECT * FROM chatroommessage WHERE idChatRoom = ? ORDER BY dhMsg";
        let param = [chatroomId];

        return this._queryEngine.executeQuery(query,param);
    }

    //Gets all the informations about the
    //given chatroomId
    //@chatroomId is the room from which to load
    //the infos
    getRoomInfos(chatroomId)
    {
        let query = "SELECT * FROM chatroom WHERE id = ?";
        let param = [chatroomId];

        return this._queryEngine.executeQuery(query,param);
    }




    //Inserts a new message in the database
    //related to a room
    //@infos is the infos of the message to add
    //@isAdmin tells wether or not the message was
    //sent by an admin
    insertNewMessage(infos,isAdmin)
    {
        console.log(infos)
        let query = `INSERT INTO chatroommessage
                    (id,idChatRoom,idSender,message,isAdmin,dhMsg)
                    VALUES (DEFAULT,?,?,?,?,NOW())`;

        if(!isAdmin){
            infos.userId = null;
        }

        let param = [infos.roomId,infos.userId,infos.message,isAdmin]


        return this._queryEngine.executeQuery(query,param);
    }


}

module.exports = MgrChat;

