const express=require ('express');
const app=express();
const PORT=5000;
const cors=require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
require ("./routes/pipedrive.route")(app);
app.listen(PORT,()=>{console.log("SERVER IS RUNING ")});
