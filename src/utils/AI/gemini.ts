import { GeminiApiKey } from "../../constants/constants";
import { AIServiceType, updateToNotebook, updateToAIResponse } from "../../utils/AI/common";
import { translationPrompts } from "../../constants/prompts";

function getRequestBody(serviceType:AIServiceType,msg:string) {
    if(serviceType.type==="Chat"){
        return JSON.stringify({"contents":{"parts":[{"text":msg}]}})
    }else if(serviceType.type==="translation"){
        return JSON.stringify({
            "contents":{"parts":[{"text":msg}]},
            "system_instruction":{"parts":[{"text":translationPrompts.get(serviceType.arg)}]}
        })
    }
}

function getGeminiResponse(serviceType:AIServiceType,msg:string) {
    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key="+GeminiApiKey,{
        method:"POST",
        body:getRequestBody(serviceType,msg),
    }).then(res=>res.json()).then(data=>{
        let result = data["candidates"][0]["content"]["parts"][0]["text"]
        if(serviceType.type==="translation"){
            updateToAIResponse(result)
        }else{
            updateToNotebook(result)
        }
    })
}

export {
    getGeminiResponse
}
