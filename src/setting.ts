import {
    Setting
} from "siyuan";
import {
    AIProviders,
    BaiduAIApiKey,
    BaiduAIApiSecret
} from "./constants/constants"
import {
    setLocalStorage,
    getLocalStorage
} from "./utils/siyuan-request/storage"

type SettingParams = {
    "AIProvider":string,
    "baiduApiKey":string,
    "baiduApiSecret":string
}

class ToolboxSetting extends Setting {
    constructor(options:{
        height: string,
        width: string,
        destroyCallback?: () => void
    }){
        super({
            height: options.height,
            width: options.width,
            confirmCallback: ()=>{
                let setting ={"AIProvider":"","baiduApiKey":"","baiduApiSecret":""}
                let AIProviderSelection = document.getElementById("ai-provider-selection") as HTMLSelectElement
                setting["AIProvider"] = AIProviderSelection.value
                let baiduApiKeyInputElement = document.getElementById("baidu-apikey-input") as HTMLInputElement
                setting["baiduApiKey"] = baiduApiKeyInputElement.value
                let baiduApiSecretInputElement = document.getElementById("baidu-api-secret-input") as HTMLInputElement
                setting["baiduApiSecret"] = baiduApiSecretInputElement.value
                setLocalStorage(setting)
                console.log("setting is saved",setting)
            },
            destroyCallback: options.destroyCallback,
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
                selectElement.value=localStorage.getItem("AIProvider")??AIProviders[0]
                locationDiv.appendChild(selectElement);
                return locationDiv;
            },
            
        })
        this.addItem({
            "title":"Baidu API Key",
            createActionElement: () =>{
                const locationDiv = document.createElement("div");
                locationDiv.setAttribute("id", "baidu-apikey-location");
                locationDiv.style.flex = "flex";
                locationDiv.style.flexDirection = "row";

                let baiduApiKeyInput = document.createElement("input")
                baiduApiKeyInput.setAttribute("id","baidu-apikey-input")
                baiduApiKeyInput.value=localStorage.getItem("baiduApiKey")??BaiduAIApiKey
                locationDiv.appendChild(baiduApiKeyInput)
                return locationDiv;
            }
        })
        this.addItem({
            "title":"Baidu API Secret",
            createActionElement: () =>{
                const locationDiv = document.createElement("div");
                locationDiv.setAttribute("id", "baidu-api-secret-location");
                locationDiv.style.flex = "flex";
                locationDiv.style.flexDirection = "row";

                let baiduApiSecretInput = document.createElement("input")
                baiduApiSecretInput.setAttribute("id","baidu-api-secret-input")
                baiduApiSecretInput.value=localStorage.getItem("baiduApiSecret")??BaiduAIApiSecret
                locationDiv.appendChild(baiduApiSecretInput)
                return locationDiv;
            }
        })
        getLocalStorage()
    }
}

export {
    ToolboxSetting,
    SettingParams
}