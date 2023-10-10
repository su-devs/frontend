const express = require('express')
const path = require('path')
const { MongoClient } = require('mongodb')
var bodyParser = require('body-parser')

const app = express()
app.use(express.json());
app.use(bodyParser.json());


const port = 3000
const mongoUri ='mongodb+srv://mbithi:sammy4991@cluster1.xrc8oqf.mongodb.net/?retryWrites=true&w=majority'// : process.env.MONGO_URL


const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } finally {
        // await client.close();
        // console.log('Disconnected from MongoDB');
    }
}

run().catch(console.error);


async function insertData(a, e) {
    const database = client.db('deletions');
    const collection = database.collection('requests');

    // Sample data to be inserted
    const data = {
        appName: a,
        emailAddress: e,
    };

    // Insert the data into the collection
    const result = await collection.insertOne(data);
    console.log(`Inserted ${result.insertedCount} document into the collection`);
}

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/css', express.static('css'));

app.get('/', (_req, _res) => {
    _res.sendFile(path.join(__dirname, '/html/index.html'))
});

app.get('/about.html', (_req, _res) => {
    _res.sendFile(path.join(__dirname, '/html/about.html'))
})


app.post('/', async (req, res) => {
    const formData = req.body;
    insertData(formData['appname'], formData['email'])
    res.sendFile(path.join(__dirname, '/html/t.html'))
});


app.listen(port, () => {
    console.log('running on port 3000')
})


