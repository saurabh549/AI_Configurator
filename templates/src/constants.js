const DOMAIN_LOCALHOST = "http://127.0.0.1:8000/";

export const CHAT_USER = "bot";

export const BASE_USER = "Exotel";

export const APIBASE_DETAIL = {
    messageAPI : {
        endpoint     : DOMAIN_LOCALHOST + "message/",
        requestBody : (data) => ({
            "user_id" : BASE_USER, 
            "message"  : data.message, 
            "receiver" : data.receiver
        }) 
    }
}

export const INTERNAL_SERVER_ERROR_MSG = "Something went wrong!";

