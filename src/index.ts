import {
    Plugin
} from "siyuan";
import AIInputDialog from "./AIInputDialog";
import { ToolboxSetting } from "./setting";
import { getLocalSetting } from "./utils/siyuan-request/storage";


class ToolboxPlugin extends Plugin {
    async onload(){
        getLocalSetting()

        this.protyleSlash.push({
            filter: [".","。"],
            html: "<span>ai</span>",
            id: "ai",
            callback: ()=>{
                new AIInputDialog();
            }
        });
    }
    async openSetting() {
        const setting = new ToolboxSetting({
            height: "500px",
            width: "600px",
        });
        setting.setUpElements();
        setting.open("toolbox")
    }
}

export default ToolboxPlugin