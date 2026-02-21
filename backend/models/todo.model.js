
import mongoose from "mongoose";


const monthlyGoalSchema = new mongoose.Schema({
 text:{type: String, required: true},
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  month: { type: Number, required: true }, 
  year: { type: Number, required: true }, 
})
const weeklyPlansSchema = new mongoose.Schema({
    weekNumber : { type: Number, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
   text:{type: String, required: true},
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' }
}
)

const calendarDaySchema = new mongoose.Schema({
  type: { type: String, enum: ['task', 'event'], required: true },
    date: { type: Date, required: true },
   month: { type: Number, required: true },
    year: { type: Number, required: true },
   title:{type: String, required: true},
   description:{ type: String },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  name: { type: String }, // event title
  startTime: { type: String }, // e.g. "14:00"
  endTime: { type: String },
})

const todoSchema = new mongoose.Schema({
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      months : [monthlyGoalSchema],
      weeks: [weeklyPlansSchema],
      days: [calendarDaySchema]
}, {timestamps: true});

export const ToDoList = mongoose.model("ToDoList", todoSchema);