// Things

const NBR_MSG_FOR_LONG_CONVO = 20;

class SocketData {

    constructor(conversation, id) {
        this.conversation = conversation;
        this.id = id;
    }
}


class Conversation {

    constructor(me, other, id) {
        this.me = me; // Participant
        this.other = other; // Participant
        this.id = id; // Id

        this.listMessage = []; // List<Message>
    }
    
    isLong(){
        return this.listMessage.length == NBR_MSG_FOR_LONG_CONVO;
    }
}

class Message {

    constructor(text, imSender, id) {
        this.text = text; // String
        this.imSender = imSender; // Bool
        this.id = id; // Int

        this.time = getCurrentTime(); // String
    }
}

// People

class Participant {

    constructor(ip, name, isAdmin) {
        this.ip = ip; // String
        this.name = name; // String
        this.isAdmin = isAdmin; // Bool
    }
}

class Customer extends Participant {

    constructor(ip, name, isAdmin) {
        super(ip, name, isAdmin);
    }

}

class Representant extends Participant {

    constructor(ip, name, isAdmin) {
        super(ip, name, isAdmin);
    }

}