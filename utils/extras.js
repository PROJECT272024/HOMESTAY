
export const createPublicId = (name)=>{
    let delFileId = 'homestayrelated'
    let tempName =  name
    tempName = (tempName.split("/homestayrelated"))[1]
    let count=0
    for(let i in tempName){
        if(tempName[i] == "."){
            count=i
        }
    }
    delFileId = delFileId + tempName.substring(0,count)
    return delFileId
}