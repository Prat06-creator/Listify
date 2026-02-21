import mongoose from 'mongoose';
const noteSchema = new mongoose.Schema({
    
    text: String,
    color:String,
    x:Number,
    y:Number,
    width:Number,
    height: Number,
    zIndex:Number,

});

const connectionSchema= new mongoose.Schema({
   
    fromNoteId: String,
    toNoteId: String,
    
});

const boardSchema= new mongoose.Schema({  //board._id
    name:{
        type: String,
        required: true,
    },
    notes: [noteSchema],
    connections : [connectionSchema],
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Linking to User collection
    required: true
  }
}, {timestamps: true});


export const Board= mongoose.model('Board',boardSchema);