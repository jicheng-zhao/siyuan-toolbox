import {
    Setting
} from "siyuan";
import {
    AIProviders,
    baidu,
    openai,
    baiduParameters,
    openAIParameters,
    gemini,
    geminiParameters,
    defaultProvider,
    defaultParameter
} from "./constants/constants"
import {
    setLocalSetting,
    getLocalSetting
} from "./utils/siyuan-request/storage"
import { updateToNotebook } from "./utils/AI/common";
import { getSettingElement } from "./utils/common/common"

class ToolboxSetting extends Setting {
    constructor(options:{
        height: string,
        width: string
    }){
        super({
            height: options.height,
            width: options.width,
            confirmCallback: ()=>{
                // get current ai provider
                let setting:any = {"AIProvider":""}
                let AIProviderSelection = document.getElementById("ai-provider-selection") as HTMLSelectElement
                setting["AIProvider"] = AIProviderSelection.value

                if(AIProviderSelection.value==localStorage.getItem("AIProvider")){
                    // set current ai provider parameter
                    switch(AIProviderSelection.value){
                        case baidu:
                            setting[baidu]={}
                            baiduParameters.forEach((item:{title:string,param:string})=>{
                                let element = document.getElementById(item.param+"_input") as HTMLInputElement
                                setting[baidu][item.param] = element?.value||localStorage.getItem(item.param)||""
                            })
                            break
                        case gemini:
                            setting[gemini]={}
                            geminiParameters.forEach((item:{title:string,param:string})=>{
                                let element = document.getElementById(item.param+"_input") as HTMLInputElement
                                setting[gemini][item.param] = element?.value||localStorage.getItem(item.param)||""
                            })
                            break
                        case openai:
                            setting[openai]={}
                            openAIParameters.forEach((item:{title:string,param:string})=>{
                                let element = document.getElementById(item.param+"_input") as HTMLInputElement
                                setting[openai][item.param] = element?.value||localStorage.getItem(item.param)||""
                            })
                            break
                        default:
                            setting[defaultProvider]={}
                            defaultParameter.forEach((item:{title:string,param:string})=>{
                                let element = document.getElementById(item.param+"_input") as HTMLInputElement
                                setting[defaultProvider][item.param] = element?.value||localStorage.getItem(item.param)||""
                            })
                            break
                    }
                }
                setLocalSetting(setting)
            },
            destroyCallback: ()=>{},
        })
    }
    setUpElements() {
        this.addItem({
            title: "ai服务商",
            createActionElement: () => {
                const locationDiv = document.createElement("div");
                locationDiv.setAttribute("id", "ai-provider-location");
                locationDiv.style.flex = "flex";
                locationDiv.style.flexDirection = "row";

                let selectElement = document.createElement("select")
                selectElement.setAttribute("id","ai-provider-selection")
                for(let i=0;i<AIProviders.length;i++){
                    let optionElement = document.createElement("option")
                    optionElement.setAttribute("value",AIProviders[i])
                    optionElement.innerText=AIProviders[i]
                    selectElement.appendChild(optionElement)
                }
                selectElement.value=localStorage.getItem("AIProvider")??defaultProvider
                locationDiv.appendChild(selectElement);
                return locationDiv;
            },
            
        })
        switch(localStorage.getItem("AIProvider")){
            case baidu:
                baiduParameters.forEach((item:{title:string,param:string})=>{
                    this.addItem(getSettingElement(item))
                })
                break
            case gemini:
                geminiParameters.forEach((item:{title:string,param:string})=>{
                    this.addItem(getSettingElement(item))
                })
                break
            case openai:
                openAIParameters.forEach((item:{title:string,param:string})=>{
                    this.addItem(getSettingElement(item))
                })
                break
            default:
                defaultParameter.forEach((item:{title:string,param:string})=>{
                    this.addItem(getSettingElement(item))
                })
        }
        getLocalSetting()
    }
}

export {
    ToolboxSetting
}