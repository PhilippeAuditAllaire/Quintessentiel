// Enum des types de messages
const MsgType = Object.freeze({

    // User Query
    "IS_ADMIN_ACTIVE": "is-active-admin",
    "I_DISCONNECTED": "disconnect",
    "IM_A_NEW_CUSTOMER": "im-new-custo",
    "IM_A_NEW_ADMIN": "im-admin",
    "I_SEND_MSG": "i-send-msg",
    "ADMIN_IS_THERE": "admin-there",
    "ADMIN_IS_MISSING": "admin-missing",

    // Server response
    "PLZ_JOIN_CUSTO": "plz-join-custo",
    "DUDE_DISCONNECTED": "dude-disconnect",
    "DUDE_SEND_MSG": "dude-send-msg",
    "418": "im-a-teapot"
});