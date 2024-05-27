import homeStay from "@/app/model/Homestay";
import connectDB from "@/config/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import cloudinary from "@/config/cloudinaryRelated";
import { createPublicId } from "@/utils/extras";

export const GET = async (req,{ params })=>{
    try {
        /*const sessionUser = await getServerSession(authOptions);
        console.log("Session User Value -- ",sessionUser)
        console.log(params.id)
        if(!sessionUser || !sessionUser.user){
            return new Response(JSON.stringify({'message':'User Id required'}),{
                status:401
            }); 
        }*/
        await connectDB();
    
        const property = await homeStay.findById(params.id);
    
        if (!property) return new Response('Property Not Found', { status: 404 });
    
        return new Response(JSON.stringify(property), {
          status: 200,
        });
      } catch (error) {
        console.log('error from api',error)
        return new Response(error, { status: 500 });
      }
};
export const PUT = async (res,{params})=>{
    try {
        let data = await res.json();
        console.log('data from out route - ',data)
        await connectDB()
        /*const sessionUser = await getServerSession();
        console.log(sessionUser)

        if(!sessionUser || !sessionUser.user){
            return new Response(JSON.stringify({'message':'User Id required'}),{
                status:401
            }); 
        }*/
        const {id} = params;
        const exsistingHs = await homeStay.findByIdAndUpdate(id,data)
        return new Response(JSON.stringify({'message':'Property Updated'}),{
            status:201
        });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({'message':'Property Updated'}),{
            status:500
        });
    }
}
export const DELETE = async (res,{params})=>{
    try {
        await connectDB()
        /*const sessionUser = await getServerSession();
        console.log(sessionUser)

        if(!sessionUser || !sessionUser.user){
            return new Response(JSON.stringify({'message':'User Id required'}),{
                status:401
            }); 
        }*/
        const {id} = params;
        console.log('ID - ',id)
        const exsistingHs = await homeStay.findByIdAndDelete(id)
        let makeId = []
        if ('homestayImages' in exsistingHs) {
            if (exsistingHs.homestayImages.length > 0) {
                exsistingHs.homestayImages.map((val,index)=>(
                    makeId.push(createPublicId(val))
                ));
            }
            if(makeId.length>0){
                await cloudinary.api.delete_resources(makeId, { invalidate: true }, function(error, result) {
                    if (error) {
                        console.error(error);
                    }else{
                        console.log("Result - ",result)
                    }
                });
            }    
        }
        if ('signature' in exsistingHs) {
            if(exsistingHs.signature!=""){
                await cloudinary.uploader.destroy(createPublicId(exsistingHs.signature))
            }
        }
        return new Response(JSON.stringify({
            'message':'Deletion success'}),
            {
            status:201
        });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({'message':'Property Updated'}),{
            status:500
        });
    }
}