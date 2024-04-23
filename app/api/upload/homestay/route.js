
import cloudinary from "@/config/cloudinaryRelated";
import {NextResponse} from "next/server";

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

        /*files.map((file,index)=>{
            const upload = async ()=>{
                let byteData = await file[1].arrayBuffer();
                let buffer = Buffer.from(byteData);
                let path = `./public/homestay/${file[0]}`;
                await writeFile(path,buffer);
            }
            upload()
        }) */
        const imageUploadPromises = [];

        for (const image of files) {
            // Assuming image is a File object, extract the file data
            const imageBuffer = await image[1].arrayBuffer();
            const imageArray = Array.from(new Uint8Array(imageBuffer));
            const imageData = Buffer.from(imageArray);

            // Convert the image data to base64
            const imageBase64 = imageData.toString('base64');

            // Upload the image data as a base64 string to Cloudinary
            const result = await cloudinary.uploader.upload(
                `data:image/png;base64,${imageBase64}`,
                {
                folder: 'homestayrelated/homestay',
                }
            );

            imageUploadPromises.push(result.secure_url);
        }
        

        // Wait for all image uploads to complete
        const uploadedImages = await Promise.all(imageUploadPromises);
        console.log("Uploaded image infomartion ",imageUploadPromises )
        return new Response(JSON.stringify({'message':'File Uploaded sucessfully',
                    "fileName":imageUploadPromises}),{
                    status:201
                });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({'message':'File Uploading Problem'}),{
            status:500
        });    
    }
}

