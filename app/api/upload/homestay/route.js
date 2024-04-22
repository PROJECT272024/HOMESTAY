
import { writeFile } from "fs/promises";
import {NextResponse} from "next/server";
//import cloudinary from '@/config/cloudinaryRelated'

export const POST = async (req)=>{
    const data = await req.formData();
    let files = [];
    for (let i of data.entries()) {
        console.log("I am inside files checking")
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
                let path = `./public/homestay/${file[0]}`;
                await writeFile(path,buffer);
            }
            upload()
        }) 
        /*let imageUrl = []
        files.map((file,index)=>{
            const upload = async ()=>{
                let byteData = await file[1].arrayBuffer();
                let imageArray = Array.from(new Uint8Array(byteData))
                let buffer = Buffer.from(imageArray);

                const imageBase64 = buffer.toString("base64");
                
                const result = await cloudinary.uploader.upload(
                    `data:image/png;base64;${imageBase64}`,{
                        folder: 'homestayrelated'
                    }
                );
                imageUrl.push(result.secure_url)
                const uploadedImages = await Promise.all(imageUrl);
                console.log(uploadedImages)
            }
            upload()
        })*/
        return new Response(JSON.stringify({'message':'File Uploaded sucessfully'}),{
            status:201
        });    
    } catch (error) {
        return new Response(JSON.stringify({'message':'File Uploading Problem'}),{
            status:500
        });    
    }
}

