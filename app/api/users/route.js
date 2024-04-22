import newUser from "@/app/model/User";
import connectDB from "@/config/database";

export const GET = async ()=>{
    try {
        await connectDB()

        return new Response(JSON.stringify({message:'Hi from route api'}),{status:200});
    } catch (error) {
        console.log(error)
        return new Response('Something went wrong',{status:500}) ;
    }
};
export const POST = async (res)=>{
    try {
        let data = await res.json();
        console.log(data)
        await connectDB();
        const user = new newUser(data);
        await user.save();
        return new Response(JSON.stringify({'message':"Successfully added data"}),{
            status:201
        });    
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({'message':error}),{
            status:401
        });
    }
}
/*
export const POST3 = async(request)=>{
    try {

        const formData = await request.formData();
        const userData = {
            name:formData.get("name"),
            empId:formData.get("empId"),
            gender:formData.get("gender"),
            dob:formData.get("dob"),
            address:{
              location: formData.get("address.location"),
              city: formData.get("address.city"),
              district: formData.get("address.district"),
              state: formData.get("address.state"),
              pinCode: formData.get("address.pinCode")
            },
            organization: formData.get("organization"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            altPhone: formData.get("altPhone"),
            role: formData.get("role"), // Admin, DEO - data entry operator
            password:formData.get("password"),
            isStatus: 0
        }

        const cpass = formData.get('cpassword')
        if(cpass!==userData.password){
            return new Response(JSON.stringify({'message':"Error Password did not matched"}),{
                status:401
            });    
        }
        await connectDB()
        const user = new newUser(userData);
        await user.save();
        return new Response(JSON.stringify({'message':"Successfully added data"}),{
            status:200
        });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({'message':error}),{
            status:401
        });
    }
}*/