const fs = require('fs')
const client = require('mongodb').MongoClient('mongodb+srv://api-client:pRZbCQqPo1zpcZLA@cluster0-jjlqh.mongodb.net/api-polygons?retryWrites=true', { useNewUrlParser: true })
const file = process.argv[2]

const content = fs.readFileSync(file, 'utf8')

const { features } = JSON.parse(content)

client.connect( error => {
    if (error) {
        console.log(error)
        process.exit(1)
    }

    const collection = client.db('api-polygons').collection('polygons')

    collection.insertMany(features, (err, result) => {
        if (err) console.log(err)
        console.log(`${result.result.n} inserts`)
        client.close()
        process.exit(0)
    })
})
