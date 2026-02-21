import mongoose from 'mongoose'
const EntryItemSchema = new mongoose.Schema({
   title: {type: String, required: true},
   category: {type: String, enum: ['travel', 'food', 'finance', 'emotions', 'general'], default: 'general'},
    content: {type: String},
    photos: {type: [String], default: []},
    backgroundColor: {type: String, default: '#E0F2FE'},
    date: {type: Date, default: Date.now},
    bold : {type: Boolean, default: false},
    italic : {type: Boolean, default: false},
    underline : {type: Boolean, default: false},
     userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Linking to User collection
      required: true
    }
}, {timestamps: true})

export const BrainDump= mongoose.model('BrainDump', EntryItemSchema);
