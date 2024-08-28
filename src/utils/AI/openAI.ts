import { AIServiceType, updateToNotebook, updateToAIResponse, checkAPIKey } from "../../utils/AI/common";
import { translationPrompts } from "../../constants/prompts";
import { openai } from "../../constants/constants";

function getRequestBody(serviceType:AIServiceType,msg:string,model:string):string{
    let res:{model:string,messages:{role:string,content:string}[]}={
        model:model,
        messages:[],
    }
    if(serviceType.type==="translation"){
        res.messages.push({
            role:"system",
            content:translationPrompts.get(serviceType.arg)
        })
    }
    res.messages.push({
        role:"user",
        content:msg
    })
    return JSON.stringify(res)
}

function getOpenAiResponse(serviceType:AIServiceType,msg:string){
    if(!checkAPIKey(openai)){
        return
    }
    fetch(localStorage.getItem("openai_base_url"),{
        method:"POST",
        body:getRequestBody(serviceType,msg,localStorage.getItem("openai_model")),
        headers: new Headers({
            Authorization: "Bearer "+ localStorage.getItem("openai_api_key"),
            'Content-Type': "application/json",
        })
    }).then(res=>res.json()).then(data=>{
        let result = data["choices"][0]["message"]["content"]
        if(serviceType.type==="translation"){
            updateToAIResponse(result)
        }else{
            updateToNotebook(result)
        }
    })
}

export {
    getOpenAiResponse
}