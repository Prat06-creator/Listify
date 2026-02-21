import mongoose from 'mongoose';
import {BudgetTracker} from '../models/budgetTracker.model.js';

export const getBudgetTracker = async (req, res) => {
    try {
        const expenses = await BudgetTracker.find({ userId: req.user._id });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const addBudget=async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) return res.status(404).json({ error: 'User not found' });
    const { month, year, budget } = req.body;
    const updatedBudget= await BudgetTracker.findOneAndUpdate(
      {userId,month,year}, {budget}, {new:true,upsert:true}
    );
    console.log('New Budget Added:', updatedBudget); 
    res.status(201).json(updatedBudget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export const addExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) return res.status(404).json({ error: 'User not found' });
    const { month, year, date, amount, description, category } = req.body;
    const budgetTracker = await BudgetTracker.findOne({ userId, month, year });
    if (!budgetTracker) {
      return res.status(404).json({ error: 'Budget not found for the specified month and year' });
    }
    budgetTracker.expenses.push({ date, amount, description, category });
    await budgetTracker.save();
    res.status(201).json(budgetTracker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export const deleteExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    const { expenseId } = req.params;
    const {month, year} = req.query;
    const budgetTracker = await BudgetTracker.findOne({ userId, month, year });
    if (!budgetTracker) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    budgetTracker.expenses.pull(expenseId);
    await budgetTracker.save();

    res.status(200).json(budgetTracker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
