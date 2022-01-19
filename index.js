const express=require('express')
const cors=require('cors')
const { MongoClient} = require('mongodb');
const ObjectId=require('mongodb').ObjectId;
require('dotenv').config()
const app=express()
const port=4000
app.use(express.json())
app.use(cors())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3nf9m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try {
        await client.connect();
        const database=client.db("healthCare")
        const productCollection=database.collection('services')
        app.get('/services',async(req,res)=>{
            const cursor=productCollection.find({})
            products=await cursor.toArray()
            res.json(products)
        })
        app.get('/services/:id',async(req,res)=>{
            const id=req.params.id
            const find={ _id:ObjectId(id) };
            console.log(id);
            const user=await productCollection.findOne(find);
            res.send(user)
          })
    }finally{
    
    }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
res.send("Health_care database Running")
})

app.listen(port,()=>{
console.log("Listening to port",port);
})
