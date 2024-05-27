import homeStay from "@/app/model/Homestay";
import connectDB from "@/config/database";
export const GET = async (res)=>{
    try {
        await connectDB()
        //const home = new homeStay();
        //await home.save();
        const result = await homeStay.find();
        if (!result) return new Response('Homestay Not Found', { status: 404 });
    
        return new Response(JSON.stringify(result), {
          status: 200,
        });
    } catch (error) {
        console.log(error)
        return new Response('Something went wrong',{status:500}) ;
    }
};



export const POST = async (res)=>{
    try {
        let data = await res.json();
        
        await connectDB();
        const home = new homeStay();
        //await home.save();
        const result = await home.collection.insertOne(data);
        let resultID = result.insertedId.toHexString()
        console.log('Checking id - ',resultID);
        return new Response(JSON.stringify({'message':resultID}),{
            status:201
        });    
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({'message':error}),{
            status:401
        });
    }
}
