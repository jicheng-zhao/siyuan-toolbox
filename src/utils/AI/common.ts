import { getBaiduAIResponse } from "./baiduAI";
import { getGeminiResponse } from "./gemini";
import { getOpenAiResponse } from "./openAI"
import { getCurrentBlock, updateBlock, insertBlockList } from "../siyuan-request/block"
import { destroyDialog } from "../../event/dialog";
import { informError } from "../siyuan-request/notification"
import { baidu, openai, baiduParameters, openAIParameters, gemini, geminiParameters } from "../../constants/constants";
import type { AIServiceType, AIParamter } from "../../models/AI"

function updateToNotebook(result:string){
    let isCode = false
    let lines = result.split("\n")
    let nextId = getCurrentBlock()
    if(lines[0].startsWith("```")){
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
        case baidu:
            getBaiduAIResponse(serviceType,msg)
            break
        case gemini:
            getGeminiResponse(serviceType,msg)
            break
        case openai:
            getOpenAiResponse(serviceType,msg)
            break
        default:
            getBaiduAIResponse(serviceType,msg)
    }
}

function checkAPIKey(aiProvider:string) {
    let parameters:AIParamter[] = []
    switch(aiProvider){
        case baidu:parameters = baiduParameters
        case gemini:parameters = geminiParameters
        case openai:parameters = openAIParameters
        default:
            break
    }
    for(let i in parameters){
        if(!localStorage.getItem(parameters[i].param)){
            informError("Lack of parameters:"+parameters[i].param)
            return false
        }
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
