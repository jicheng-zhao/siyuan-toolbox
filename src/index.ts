import {
    Plugin
} from "siyuan";
import AIInputDialog from "./AIInputDialog";
import { ToolboxSetting } from "./setting";
import { getLocalStorage } from "./utils/siyuan-request/storage";


class ToolboxPlugin extends Plugin {
    async onload(){
        getLocalStorage()
        const setting = new ToolboxSetting({
            height: "300px",
            width: "600px",
        });
        setting.setUpElements();
        this.setting = setting

        this.protyleSlash.push({
            filter: [".","。"],
            html: "<span>ai</span>",
            id: "ai",
            callback: ()=>{
                new AIInputDialog();
            }
        });
    }
}

export default ToolboxPlugin