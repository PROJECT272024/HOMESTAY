
import { writeFile,unlink } from "fs/promises";
import {NextResponse} from "next/server"
export const POST = async (req)=>{
    const data = await req.formData();
    let files = [];
    for (let i of data.entries()) {
        files.push(i)
    }
    try {
        if(!files){
            return NextResponse.json(
                {
                    "message": "No image found",
                    "success":false
                }
            )
        }

        files.map((file,index)=>{
            const upload = async ()=>{
                let byteData = await file[1].arrayBuffer();
                let buffer = Buffer.from(byteData);
                let path = `./public/signature/${file[0]}`;
                await writeFile(path,buffer);
            }
            upload()
        }) 
        return new Response(JSON.stringify({'message':'File Uploaded sucessfully'}),{
            status:201
        });    
    } catch (error) {
        console.log('Error from signature route ',error)
        return new Response(JSON.stringify({'message':'File Uploading Problem'}),{
            status:500
        });    
    }
}