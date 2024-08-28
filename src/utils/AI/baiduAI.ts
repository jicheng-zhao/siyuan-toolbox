import { informError } from "../siyuan-request/notification"
import { AIServiceType, updateToNotebook, updateToAIResponse, checkAPIKey } from "../../utils/AI/common";
import { translationPrompts } from "../../constants/prompts";
import { baidu } from "../../constants/constants";

async function getAccessToken() {
    if(!checkAPIKey(baidu)){
        return
    }
    let res = await fetch("https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id="+localStorage.getItem("baidu_api_key")+"&client_secret="+localStorage.getItem("baidu_api_secret"))
    if(!res.ok){
        informError("baidu api key/secret error")
        return
    }
    let data = await res.json()
    return data["access_token"]
}

function getRequestBody(serviceType:AIServiceType,msg:string) {
    if(serviceType.type==="Chat"){
        return JSON.stringify({"messages":[{"role":"user","content":msg}]})
    }else if(serviceType.type==="translation"){
        return JSON.stringify({
            "messages":[{"role":"user","content":msg}],
            "system":translationPrompts.get(serviceType.arg)
        })
    }
}

async function getBaiduAIResponse(serviceType:AIServiceType,msg:string) {
    let access_token = await getAccessToken()
    let res = await fetch("https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie-speed-128k?access_token="+access_token,{
        body:getRequestBody(serviceType,msg),
        method:"POST",
        headers:new Headers({
            'Content-Type':"application/json"
        })
    })
    let data = await res.json()
    if(data["error_code"]===336501){
        informError("Rate limit reached for RPM")
        return
    }
    let result = data["result"]
    if(result==="" || result===null){
        informError("AI服务异常")
        return
    }
    if(serviceType.type==="translation"){
        updateToAIResponse(result)
    }else{
        updateToNotebook(result)
    }
}

export {
    getBaiduAIResponse
}