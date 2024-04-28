import homeStay from "@/app/model/Homestay";
import connectDB from "@/config/database";

export const POST = async (res)=>{
    try {
    
        let data = await res.json();
        await connectDB()
        let result=null
        if('project' in data){
            if('offset' in data){
                result = await homeStay.find(data.query,data.project)
                        .skip(data.offset)
                        .limit(data.pageSize);
            }else{
                result = await homeStay.find(data.query,data.project)
            }
        }else{
            if('offset' in data){
                result = await homeStay.find(data.query)
                        .skip(data.offset)
                        .limit(data.pageSize);
            }else{
                result = await homeStay.find(data.query).count();
                if (!result) return new Response('Homestay Not Found', { status: 404 });

                return new Response(JSON.stringify({"totalCount":result}), {
                    status: 200,
                });
            }
        }
        if (!result) return new Response('Homestay Not Found', { status: 404 });

        return new Response(JSON.stringify(result), {
                status: 200,
        });
    } catch (error) {
        console.log(error)
        return new Response('Something went wrong',{status:500}) ;
    }
};
export const GET = async (res)=>{
    try {
        await connectDB()
        //const home = new homeStay();
        //await home.save();
        const result = await homeStay.find(data.query).count();
        if (!result) return new Response('Homestay Not Found', { status: 404 });
    
        return new Response(JSON.stringify({"totalCount":result}), {
          status: 200,
        });
    } catch (error) {
        console.log(error)
        return new Response('Something went wrong',{status:500}) ;
    }
};