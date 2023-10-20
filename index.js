const express=require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors=require('cors')
require('dotenv').config();
const app=express();
const port=process.env.PORT||5000
app.use(cors())
app.use(express.json());




const uri = `mongodb+srv://${process.env.USERDB}:${process.env.PASSWORD}@cluster0.bw2yndc.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const productsCollection=client.db('MobileShop').collection('categoryData')
    const cardsCollection=client.db('MobileShop').collection('productData')
   
    app.post('/mobilebrand' , async(req ,res) =>{
     const newProduct=req.body;
     console.log(newProduct)
     const result=await cardsCollection.insertOne(newProduct)
     res.send(result)

    })
    app.get('/mobilebrand/:id' , async(req ,res)=>{
      const id=req .params.id;
      const query={
        _id:new ObjectId(id)

      }
      const result=await cardsCollection.findOne(query)
      res.send(result)
    })
    app.get('/mobilebrand/:id' ,async( req ,res)=>{
      const category=req.params.id
      const filter={category}
       const cursor=cardsCollection.find(filter);
      const result=await cursor.toArray()
      res.send(result)
    })
    app.get('/brandName' ,async( req ,res)=>{
      const cursor=productsCollection.find();
     const result=await cursor.toArray()
     res.send(result)
     
   })
    

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req ,res)=>{
    res.send('server is running')
})







app.listen(port ,() =>{
    console.log(`server is runnig on port:${port}`)
})