import type { AIParamter, AISettingElement } from "../../models/AI"

function getSettingElement(item:AIParamter):AISettingElement{
    return {
        title:item.title,
        createActionElement: () =>{
            return createSettingElement(item.param)
        }
    }
}

function createSettingElement(parameter:string):HTMLElement{
    let locationDiv = document.createElement("div")
    locationDiv.setAttribute("id", parameter+"_location")
    locationDiv.style.flex = "flex"
    locationDiv.style.flexDirection = "row"

    let elementInput = document.createElement("input")
    elementInput.setAttribute("id",parameter+"_input")
    elementInput.value=localStorage.getItem(parameter)||""
    locationDiv.appendChild(elementInput)
    return locationDiv;
}


export {
    getSettingElement
}