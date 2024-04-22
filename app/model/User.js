import { Schema,model,models } from "mongoose";

const NewUserSchema = new Schema(
    {
        name: { type: String, 
            required: [true, 'Name required'] 
        },
        empId: { type: String, 
            required: [true, 'Employee Id required'] 
        },
        gender: { type: String, 
            required: [true, 'Gender required'] 
        },
        dob: {
            type: Date,
            required: [true, 'Age required']
        },
        address: {
            location: { type: String },
            city: { type: String },
            district: { type: String },
            state: { type: String },
            pinCode: { type: String }
        },
        organization: { type: String, 
            required: [true, 'Organization required'] 
        },
        email: { type: String, 
            unique:[true,'Email Already Exists'] ,
            required: [true, 'Email required'] 
        },
        phone: { 
            type: String,
            required: [true, 'Phone Number is required']
        },
        altPhone: { type: String },
        role: { 
            type: String // admin, data entry operator
        },
        password:{
            type: String
        },
        isStatus: { type: Number, default: 0 },
        createdAt: { type: Date, default: Date.now },
        isModifiedBy: { 
            type: Schema.Types.ObjectId,
            default:null
        }
    }
);


const newUser = models.newUser  || model('newUser',NewUserSchema)

export default  newUser; 