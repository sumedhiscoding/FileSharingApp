const mongoose = require('mongoose');
const FileSchema= mongoose.Schema({

    path:{
        type: 'string',
        required: true,
    },
    originalName: {
        type:'string',
        required: true,
    },
    password: String,
    downloadCount:{
        type:'Number',
        required: true,
        default:0,
    }

})
module.exports=mongoose.model('File', FileSchema); 
// name,schema