import request from "./request";

async function updateBlock(id:string,data:string){
    await request("/api/block/updateBlock",{
        id:id,
        data:data,
        dataType: "markdown"
    })
}

async function insertBlock(previousId:string,data:string){
    let res = await request("/api/block/insertBlock",{
        previousID:previousId,
        data:data,
        dataType: "markdown"
    }).then(data=>data)
    return res[0]["doOperations"][0]["id"]
}

async function insertBlockList(previousId:string, data:string[], isCode:boolean) {
    let code="```\n"
    for(let i in data){
        if(data[i]===""){
            continue
        }
        if(data[i].startsWith("```")){
            isCode=!isCode
            if(isCode){
                code=data[i]+"\n"
                continue
            }else{
                code+=data[i]+"\n"
                previousId = await insertBlock(previousId,code)
                continue
            }
        }
        if(isCode){
            code+=data[i]+"\n"
            continue
        }
        previousId = await insertBlock(previousId,data[i])
    }
}

function getCurrentBlock(){
    let page = document.getElementsByClassName("protyle-wysiwyg protyle-wysiwyg--attr")[0]
    let currentBlockId = ""
    let lastUpdated = ""
    page.childNodes.forEach(child=>{
        let element = child as HTMLElement
        if(element.getAttribute("updated")>lastUpdated){
            currentBlockId = element.getAttribute("data-node-id")
            lastUpdated = element.getAttribute("updated")
        }
    })
    return currentBlockId
}

export {
    updateBlock,
    insertBlockList,
    getCurrentBlock
}