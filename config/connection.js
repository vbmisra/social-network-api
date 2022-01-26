const { connect, connection } = require('mongoose')

const connectionString = 
    process.env.MONGODB_URI || 'mondodb://localhost/usersAndThoughts'

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports = connection