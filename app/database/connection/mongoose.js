let mongoose = require('mongoose');
let mongoConfig = require('../../../config/mongo');

mongoose.connect(`mongodb+srv://oleg_paryshkura:RRRO4jZTbxmX@cluster0-dfcdm.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true });
