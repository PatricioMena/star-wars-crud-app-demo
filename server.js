const express = require('express'); 

// Body parser - grab info from our form
const bodyParser = require('body-parser')
const app = express(); 
const MongoClient = require('mongodb').MongoClient


// Connecting to MongoDB, to our external database
const connectionString = 'mongodb+srv://luispatriciomh:ty3WAt8XSi70NoBb@cluster0.xxdxh1x.mongodb.net/?retryWrites=true&w=majority'

// Suddenly we are going to save this file in an env file
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes'); 
    const quotesCollection = db.collection('quotes'); 
    app.set('view engine', 'ejs'); 
    
    // teaching server to read json
    app.use(bodyParser.json())
    // use files in public folder 
    app.use(express.static('public'))
    app.use(bodyParser.urlencoded({ extended: true }))


    app.get('/', (req, res) => {
      quotesCollection.find().toArray().then(results => {        
        res.render('index.ejs', { quotes: results});
      }).catch(err => console.error(err)); 
      // res.sendFile(__dirname + '/index.html')        
    })

    app.post('/quotes', (req, res)  => {
      quotesCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/')
      })
      .catch(error => console.error('error'))
    })

    app.put('/quotes', (req, res) => {
      quotesCollection.findOneAndUpdate( { name: 'Yoda' },
      {
        $set: {
          name: req.body.name,
          quote: req.body.quote,
        },
      },
      {
        upsert: true,
      }).then(result => {
        res.json('Success'); 
      }).catch(err => console.error(err))
    } )

    app.delete('/quotes', (req, res) => {
      quotesCollection.deleteOne({ name: req.body.name }).then(result => {
        if(result.deletedCount === 0){
          return res.json('No quote to delete')
        }
        res.json(`Deleted Darth Vader's quote`)
      
    }).catch(err => console.error('err'))
  })


    app.listen(3000, () => {
      console.log('listening on 3000');
    })
  })
  .catch(error => console.error(error))







