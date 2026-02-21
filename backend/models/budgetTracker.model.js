import mongoose from 'mongoose';
const BudgetTrackerSchema=new mongoose.Schema({
    month : { type: Number, required: true },
    year : { type: Number, required: true },
    budget : { type: Number, required: true },
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    expenses : [
        {
            date : { type: Date, required: true },
            amount : { type: Number, required: true },
            description : { type: String, required: true },
            category : { type: String, required: true },
        }
    ]
})
export const BudgetTracker= mongoose.model('BudgetTracker', BudgetTrackerSchema);

