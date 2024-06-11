import request from "./request";
import { SettingParams } from "../../setting";
import { informError } from "./notification";

function setLocalStorage(toolboxSetting:SettingParams) {
    localStorage.setItem("AIProvider",toolboxSetting["AIProvider"])
    localStorage.setItem("baiduApiKey",toolboxSetting["baiduApiKey"])
    localStorage.setItem("baiduApiSecret",toolboxSetting["baiduApiSecret"])
    let val = {toolbox:toolboxSetting}
    request("/api/storage/setLocalStorage",{
        val: val
    }).catch((e:any)=>console.log(e))
}

function getLocalStorage() {
    request("/api/storage/getLocalStorage",{}).then((data:any)=>{
        if(!data["toolbox"] || !data["toolbox"]["AIProvider"] || !data["toolbox"]["baiduApiKey"] || !data["toolbox"]["baiduApiSecret"]){
            informError("Please init toolbox settings for the first time")
            return
        }
        localStorage.setItem("AIProvider",data["toolbox"]["AIProvider"])
        localStorage.setItem("baiduApiKey",data["toolbox"]["baiduApiKey"])
        localStorage.setItem("baiduApiSecret",data["toolbox"]["baiduApiSecret"])
        let selectionElement = document.getElementById("ai-provider-selection") as HTMLSelectElement
        if(!selectionElement) return
        selectionElement.value=data["toolbox"]["AIProvider"]
        let baiduApiKeyInputElement = document.getElementById("baidu-apikey-input") as HTMLInputElement
        if(!baiduApiKeyInputElement) return
        baiduApiKeyInputElement.value=data["toolbox"]["baiduApiKey"]
        let baiduApiSecretInputElement = document.getElementById("baidu-api-secret-input") as HTMLInputElement
        if(!baiduApiSecretInputElement) return
        baiduApiSecretInputElement.value=data["toolbox"]["baiduApiSecret"]
    })
}

export {
    setLocalStorage,
    getLocalStorage
}