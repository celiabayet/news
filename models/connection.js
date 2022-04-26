var mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const BDD_LOGIN = process.env.BDD_LOGIN;
const BDD_PASSWORD = process.env.BDD_PASSWORD;

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
}


mongoose.connect(`mongodb+srv://${BDD_LOGIN}:${BDD_PASSWORD}@cluster0.ifwas.mongodb.net/morningNews?retryWrites=true&w=majority`,
    options,
    function(err){
        console.log(err);
    }
)

module.exports = mongoose
