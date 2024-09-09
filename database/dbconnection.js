import { connect } from "mongoose";


export const dbconn = connect('mongodb+srv://justMahmoud:Mahmoud3152003@natours-cluster.fxxidg9.mongodb.net/noondb')
.then(()=>{
 console.log("DataBase Connected");
})