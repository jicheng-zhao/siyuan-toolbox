import { getBaiduAIResponse } from "./baiduAI";
import { getGeminiResponse } from "./gemini";
import { getCurrentBlock, updateBlock, insertBlockList } from "../siyuan-request/block"
import { destroyDialog } from "../../event/dialog";
import { informError } from "../siyuan-request/notification"

type AIServiceType = {type:"Chat"|"translation",arg?:string}

function updateToNotebook(result:string){
    let isCode = false
    let lines = result.split("\n")
    let nextId = getCurrentBlock()
    if(lines[0].startsWith("```")){
        console.log("code block found")
        isCode=true
        updateBlock(nextId,"")
    }else{
        updateBlock(nextId,lines[0])
    }
    insertBlockList(nextId,lines.slice(1),isCode)
    destroyDialog()
}

function updateToAIResponse(result:string){
    let element = document.getElementById("ai-response")
    element.innerText = result
}

function getAIResponse(serviceType:AIServiceType,msg:string){
    switch (localStorage.getItem("AIProvider")) {
        case "Baidu":
            getBaiduAIResponse(serviceType,msg)
            break
        case "Gemini":
            getGeminiResponse(serviceType,msg)
            break
        default:
            getBaiduAIResponse(serviceType,msg)
    }
}

function checkAPIKey() {
    if(!localStorage.getItem("AIProvider") || !localStorage.getItem("baiduApiKey") || !localStorage.getItem("baiduApiSecret")){
        informError("Lack of parameters")
        return false
    }
    return true
}

export {
    getAIResponse,
    AIServiceType,
    updateToNotebook,
    updateToAIResponse,
    checkAPIKey
}
