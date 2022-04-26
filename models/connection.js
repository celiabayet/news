var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
}


mongoose.connect('mongodb+srv://celia_capsule:vFPFH6nIy8KsXQ7a@cluster0.ifwas.mongodb.net/morningNews?retryWrites=true&w=majority',
    options,
    function(err){
        console.log(err);
    }
)

module.exports = mongoose
