import homeStay from "@/app/model/Homestay";
import connectDB from "@/config/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

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
        console.log('ID - ',id, ' - ', data)
        const exsistingHs = await homeStay.findByIdAndDelete(id)
        return new Response(JSON.stringify({'message':'Homestay Deleted'}),{
            status:201
        });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({'message':'Property Updated'}),{
            status:500
        });
    }
}