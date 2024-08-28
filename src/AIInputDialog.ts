import {
    Dialog
} from "siyuan";
import {
    getAIResponse,
    updateToNotebook
} from "./utils/AI/common";
import { destroyDialog } from "./event/dialog";

function getDialogContent() {
    let parent = document.createElement("div")

    let aiInputDialog = document.createElement("textarea")
    aiInputDialog.id = "ai-input-dialog"
    aiInputDialog.style.width = "90%"
    aiInputDialog.style.height = "200px"
    aiInputDialog.style.marginLeft = "5%"
    parent.appendChild(aiInputDialog)

    let buttons = document.createElement("div")
    buttons.style.width = "90%"
    buttons.style.marginLeft = "5%"
    let translateToEnglish = document.createElement("button")
    translateToEnglish.id="button-translate-to-english"
    translateToEnglish.innerText = "翻译为英文"
    buttons.appendChild(translateToEnglish)
    let translateToChinese = document.createElement("button")
    translateToChinese.id="button-translate-to-chinese"
    translateToChinese.innerText = "翻译为中文"
    buttons.appendChild(translateToChinese)
    parent.appendChild(buttons)

    let aiResponse = document.createElement("div")
    aiResponse.id = "ai-response"
    aiResponse.style.width = "90%"
    aiResponse.style.height = "100px"
    aiResponse.style.marginLeft = "5%"
    parent.appendChild(aiResponse)


    return parent.innerHTML
}

function dialogEventListener(e: KeyboardEvent) {
    switch (e.key) {
        case "Enter":
            document.getElementById("ai-response").innerHTML = "<p>加载中</p>"
            let element = document.getElementById("ai-input-dialog") as HTMLTextAreaElement
            let inputValue = element.value
            getAIResponse({type:"Chat"},inputValue)
            break
        case "Escape":
            destroyDialog()
            break
    }
}

class AIInputDialog extends Dialog {
    constructor() {
        super({
            title: "toolbox",
            content: getDialogContent(),
            width: "60%",
            height: "600px",
            destroyCallback:()=>{
                // updateToNotebook("")
            }
        });

        let buttonTranslateToEnglish = document.getElementById("button-translate-to-english") as HTMLButtonElement
        buttonTranslateToEnglish.addEventListener("click", () => {
            document.getElementById("ai-response").innerHTML = "<p>加载中</p>"
            let element = document.getElementById("ai-input-dialog") as HTMLTextAreaElement
            let inputValue = element.value
            getAIResponse({type:"translation",arg:"en_US"},inputValue)
        })

        let buttonTranslateToChinese = document.getElementById("button-translate-to-chinese") as HTMLButtonElement
        buttonTranslateToChinese.addEventListener("click", () => {
            document.getElementById("ai-response").innerHTML = "<p>加载中</p>"
            let element = document.getElementById("ai-input-dialog") as HTMLTextAreaElement
            let inputValue = element.value
            getAIResponse({type:"translation",arg:"zh_CN"},inputValue)
        })

        document.addEventListener("dialogDestroy", () =>{
            this.destroy()
            document.removeEventListener("keydown",dialogEventListener)
        })
        document.addEventListener("keydown", dialogEventListener)
        let element = document.getElementById("ai-input-dialog")
        element.focus()
    }
}

export default AIInputDialog