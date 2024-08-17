import { connect } from "mongoose";


export const dbconn = connect('mongodb://localhost:27017/noondb')
.then(()=>{
 console.log("DataBase Connected");
})