const mongoose = require('mongoose')

    mongoose.connect('mongodb+srv://administrador:n0m3l0@cluster0-ubiut.mongodb.net/test?retryWrites=true&w=majority',{
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    .then(db => console.log('Database is connect'))

