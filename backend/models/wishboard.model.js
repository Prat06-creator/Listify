import mongoose from 'mongoose'
const ItemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["text", "image", "sticker"],
    required: true,
  },
  content:{ type: String,  },
  position: {
    x: { type: Number, default: 100 },
    y: { type: Number, default: 100 },
  },

  size: {
    width: { type: Number, default: 200 },
    height: { type: Number, default: 200 },
  },
  zIndex: { type: Number, default: 1 },
  rotation: { type: Number, default: 0 },

  style: {fontSize: Number,
    fontFamily: String,
    color: String,
    width: Number,
    height: Number}
}, { _id: true, timestamps: true });

const BoardItemSchema = new mongoose.Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Linking to User collection
      required: true
    },
  
  name: {type: String,required: true,},

  type: {
    type: String,
    enum: ["year", "month"],
    required: true,
  },

  period: {
    type: String, required: true,
  },
style: {
    backgroundColor: { type: String, enum:['#FFF5F5', '#FFF5EB', '#FFFBEB', '#FEF3C7', '#FEF9C3','#ECFCCB', '#DCFCE7', '#D1FAE5', '#CCFBF1', '#CFFAFE','#E0F2FE', '#DBEAFE', '#E0E7FF', '#EDE9FE', '#F3E8FF','#FAE8FF', '#FCE7F3', '#FFE4E6', '#FFFFFF', '#F8F8F8'] },
    pattern: { type: String, enum: ["dots", "grid", "diagonal", "stripes", "diamond", "none"], },
  },
  items: [ItemSchema],

  
  }, {timestamps: true})

export const WishBoard= mongoose.model('WishBoard',BoardItemSchema);