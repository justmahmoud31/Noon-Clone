import mongoose, { Types } from 'mongoose';
const schema = new mongoose.Schema({
   code:{
    required:true,
    type:String,
    unique:true
   },
   discount:{
    type:Number
   },
   expires:{
    type:Date
   }
}, { timestamps: true, versionKey: false });
export const Copoun = mongoose.model('Copoun', schema);