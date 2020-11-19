const mongoose = require('mongoose');
const nestedSchema = new mongoose.Schema({
    account:[
        {
            accno:[
                {
                    transactiontype:{
                        type:String
                    },
                    account:{
                        type:String
                    }
                }
            ]
        },
        {
            acctype:String
        }
    ]
})

mongoose.model("Nested",nestedSchema)