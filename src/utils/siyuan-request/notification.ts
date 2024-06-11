import request from "./request";

function informError(msg:string) {
    request("/api/notification/pushErrMsg",{
        msg:msg
    })
}

export {
    informError
}