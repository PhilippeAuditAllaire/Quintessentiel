
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

function formatAskName(){
    
    switch (lang) {
        case "fr":
            return "Quel est votre nom ?";
        case "en":
            return "What is your name?";
        default:
            return "Quel est votre nom ?";
    }
}

function formatFirstMessage(lang){
    switch (lang) {
        case "fr":
            return "Comment puis-je vous aider ?";
        case "en":
            return "How can I help you ?";
        default:
            return "Comment puis-je vous aider ?";
    }
}

function formatMsg(msg) {
    if (msg.imSender)
        return "<div class='msg'>" + moi(lang) + " : " + msg.text + " " + msg.time + "</div>";
    else
        return "<div class='msg'>" + correspondant() + " : " + msg.text + " " + msg.time + "</div>";
}

function formatErrorMsg(msg) {
    return "<div class='error_msg'>" + msg + "</div>";
}

function formatDisconnection(name){
    switch (lang) {
        case "fr":
            return `${name} s'est déconnecté`;
        case "en":
            return `${name} disconnected`;
        default:
            return `${name} s'est déconnecté`;
    }
}

function moi(lang) {
    switch (lang) {
        case "fr":
            return "Moi";
        case "en":
            return "Me";
        default:
            return "Moi";
    }
}

function correspondant() {
    if (imCustomer())
        return "Quintessentiel";
    else
        customerName();
}

function generateName(){
    names = ["Ananas", "Banane", "Kiwi", "Noix de coco", "Papaye", "Durian", "Avocat", "Tangerine"];
    adjectives = ["Bleu","Rouge", "Jaune", "Vert", "Orange", "Mauve", "Noir", "Blanc"];
    return names[getRandomInt(names.length)] + adjectives[getRandomInt(adjectives.length)] +  getRandomInt(100);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getCurrentTime(){
    let d = new Date();
    return d.getHours() + ":" + d.getMinutes();
}