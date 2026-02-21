import mongoose from 'mongoose'
import {BrainDump} from '../models/brainDump.model.js';

export const getEntries = async (req,res)=>{
    try {
        const entries = await BrainDump.find({ userId: req.user._id });
        res.status(200).json(entries);
    } catch (error) {
       res.status(500).json({ error: 'Internal server error' }); 
    }
}

export const createEntry = async (req,res)=>{
    try {
        const user = req.user;
        if (!user) return res.status(404).json({ error: 'User not found' });
        const newEntry = await BrainDump.create({
            title: req.body.title,
            content: req.body.content || '',
            photos:[],
            backgroundColor:req.body.backgroundColor||'#E0F2FE',
            category:'general',
            date: new Date(),
            bold:req.body.bold||false,
            italic:req.body.italic||false,
            underline:req.body.underline||false,
            userId: user._id
        });
        console.log('New Entry Created:', newEntry); //
        res.status(201).json(newEntry);
    } catch (error) {
        console.error('Error creating entry:', error); //
        res.status(500).json({ error: error.message }); 
    }
}
export const updateEntry = async (req,res)=>{
    try {
        const {id} = req.params;
        const entry = await BrainDump.findOneAndUpdate({ _id: id, userId: req.user._id });
        if (!entry) return res.status(404).json({ error: 'Entry not found' });
        entry.title = req.body.title || entry.title;
        entry.content = req.body.content || entry.content;
        entry.photos = req.body.photos || entry.photos;
        entry.backgroundColor = req.body.backgroundColor || entry.backgroundColor;
        entry.category = req.body.category || entry.category;
        await entry.save();
        console.log('Entry Updated:', entry); 
        res.status(200).json(entry);
    } catch (error) {
        console.error('Error updating entry:', error); //
        res.status(500).json({ error: 'Internal server error' }); 
    }
}
export const entryChange = async (req,res)=>{
    try {
        const {entryId}=req.params;
        const entry= await BrainDump.findOne({_id:entryId, userId: req.user._id});
        if (!entry) return res.status(404).json({error:"Entry not found"});
        console.log('Entry Fetched:', entry);
        res.status(200).json(entry);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
export const deleteEntry = async (req,res)=>{
    try {
        const {id} = req.params;
        const entry = await BrainDump.findOneAndDelete({ _id: id, userId: req.user._id });
        if (!entry) return res.status(404).json({ error: 'Entry not found' });
        console.log('Entry Deleted:', entry); 
        res.status(200).json({ message: 'Entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}