
// ChatFormatter

function connectionErrorMsg(lang) {
    switch (lang) {
        case "fr":
            return "Une erreur avec la connection est arrivee.";
        case "en":
            return "There was a connection error";
        default:
            return "Une erreur avec la connection est arrivee.";
    }
}


function firstMessage(lang){
    switch (lang) {
        case "fr":
            return "Comment puis-je vous aider ?";
        case "en":
            return "How can I help you";
        default:
            return "Comment puis-je vous aider ?";
    }
}


function formatMsg(msg) {
    if (msg.imSender)
        return "<div class='msg'>" + selfName(lang) + " : " + msg.text + " " + msg.time + "</div>";
    else
        return "<div class='msg'>" + nameFriend() + " : " + msg.text + " " + msg.time + "</div>";
}

function formatErrorMsg(msg) {
    return "<div class='error_msg'>" + msg + "</div>";
}

function selfName(lang) {
    switch (lang) {
        case "fr":
            return "Moi";
        case "en":
            return "Me";
        default:
            return "Moi";
    }
}

function nameFriend() {
    if (imCustomer())
        return "Quintessentiel";
    else
        customerName();
}

function generateName(){
    names = ["Ananas", "Banane", "Kiwi", "Noix de coco", "Papaye", "Durian", "Avocat", "Tangerine"];
    adjectives = ["bleu","rouge", "jaune", "vert", "orange", "mauve", "noir", "blanc"];
    return names[getRandomInt(names.length)] + " " + adjectives[getRandomInt(adjectives.length)];
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
