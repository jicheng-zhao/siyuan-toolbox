const dialogDestroy = new Event("dialogDestroy");

function destroyDialog(){
    document.dispatchEvent(dialogDestroy);
}

export {
    destroyDialog
}