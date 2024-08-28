type AIServiceType = {type:"Chat"|"translation",arg?:string}

type AIParamter = {title:string,param:string}

type AISettingElement = {title:string,createActionElement:()=>HTMLElement}


export {
    AIServiceType,
    AIParamter,
    AISettingElement
}