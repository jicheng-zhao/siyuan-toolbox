import request from "./request";

function setLocalSetting(toolboxSetting:any) {
    for(let key in toolboxSetting){
        if(key=="AIProvider"){
            localStorage.setItem("AIProvider",toolboxSetting["AIProvider"])
        }else{
            for(let setting in toolboxSetting[key]){
                localStorage.setItem(setting,toolboxSetting[key][setting])
            }
        }
    }
    request("/api/storage/getLocalStorage",{}).then((data:any)=>{
        data["toolbox"]["AIProvider"]=toolboxSetting["AIProvider"]
        data["toolbox"][toolboxSetting["AIProvider"]]=toolboxSetting[toolboxSetting["AIProvider"]]
        request("/api/storage/setLocalStorage",{
            val: data
        }).catch((e:any)=>console.log(e))
    })
}

function getLocalSetting() {
    request("/api/storage/getLocalStorage",{}).then((data:any)=>{
        let AIProvider = data["toolbox"]["AIProvider"]
        localStorage.setItem("AIProvider",AIProvider)
        let selectionElement = document.getElementById("ai-provider-selection") as HTMLSelectElement
        if(!selectionElement) return
        selectionElement.value=AIProvider

        for(let setting in data["toolbox"][AIProvider]){
            console.log("key",setting)
            console.log(data["toolbox"][AIProvider][setting])
            localStorage.setItem(setting,data["toolbox"][AIProvider][setting])
            let element = document.getElementById(setting+"_input") as HTMLInputElement
            if(!element) return
            element.value = data["toolbox"][AIProvider][setting]
        }
    })
}

export {
    setLocalSetting,
    getLocalSetting
}