import {
    fetchSyncPost
} from "siyuan";

async function request(url:string, data:any) {
    let response = await fetchSyncPost(url, data);
    let res = response.code === 0 ? response.data : null;
    return res;
}

export default request