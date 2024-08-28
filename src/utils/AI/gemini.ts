import { gemini } from "../../constants/constants";
import { AIServiceType, updateToNotebook, updateToAIResponse, checkAPIKey } from "../../utils/AI/common";
import { translationPrompts } from "../../constants/prompts";

function getRequestBody(serviceType:AIServiceType,msg:string):string {
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
    if(!checkAPIKey(gemini)){
        return
    }
    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key="+localStorage.getItem(gemini)||"",{
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
