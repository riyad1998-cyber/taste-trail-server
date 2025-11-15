const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = 3000;

app.use(cors())
app.use(express.json())




const uri = "mongodb+srv://taste-Trail:4AbwBtRoWGdkBKTl@riyad.wtxen74.mongodb.net/?appName=riyad";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

const db = client.db('taste-trail')
const foodCollection = db.collection('reviews')

app.get('/reviews', async(req, res)=>{
    const result = await foodCollection.find().toArray()
    res.send(result)
})


app.get('/reviews/:id',async (req, res)=>{
  const {id} = req.params
  const result = await foodCollection.findOne({_id: new ObjectId(id)})
  res.send({
    success: true,
    result
  })
})




app.delete('/reviews/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await foodCollection.deleteOne({ _id: new ObjectId(id) });
    res.send({ success: true, result });
  } catch (err) {
    console.log(err);
    res.send({ success: false, message: err.message });
  }
});






app.post('/reviews',async (req, res)=>{
    const data = req.body
const result =await foodCollection.insertOne(data)
res.send({
    success: true,
    result
})
})

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})