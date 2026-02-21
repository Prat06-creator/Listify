import mongoose from 'mongoose';
import {Board} from '../models/sticky.model.js'

import { User } from '../models/User.model.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
export const getAllBoards = async (req, res) => {
    try {
      const boards = await Board.find({ userId: req.user._id });
      res.status(200).json(boards);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export const createBoard = async(req, res)=>{
    try {
         const user = req.user;
    
        if (!user) return res.status(404).json({ error: 'User not found' });
        const newBoard = await Board.create({
            name: "Untitled",
            notes:[],
            connections:[],
            userId: user._id
        });
        console.log('New Board Created:', newBoard); //
        res.status(201).json(newBoard);
    } catch (error) {
      console.error('Error creating board:', error);
        res.status(500).json({error: error.message});
    }
};

export const renameBoard = async(req,res)=>{
  const {boardId}= req.params;
  const {name}=req.body;
  try {
    if (!name || !name.trim()) return res.status(400).json({ error: 'Board name cannot be empty' });
    const updateBoard = await Board.findByIdAndUpdate(
      {_id:boardId, userId: req.user._id},
      {name:name.trim()},
      {new:true},
    );
    if (!updateBoard) return res.status(404).json({ error: 'Board not found' });
    console.log('Board Renamed:', updateBoard); //
    res.status(200).json(updateBoard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const boardChange = async(req,res)=>{
    try {
        const {boardId}=req.params;
        const board= await Board.findOne({_id:boardId, userId: req.user._id});
        if (!board) return res.status(404).json({error:"Board not found"});
        console.log('Board Fetched:', board); //
        res.status(200).json(board);
    } catch (error) {
        console.error('Error fetching board:', error);
        res.status(500).json({error: error.message});
    }
};

export const deleteBoard = async(req,res)=>{
    try {
        const {boardId}= req.params;
        const deleteBoard = await Board.findOneAndDelete({_id:boardId, userId: req.user._id});
        if (!deleteBoard) return res.status(404).json({ error: 'Board not found' });
        res.status(200).json(deleteBoard)
    } catch (error) {
        console.error('Error deleting board:', error);
        res.status(500).json({error: error.message});
    }
};

export const createNote = async(req,res)=>{
    try {
        const {boardId} = req.params;
        const {x,y,color,text,width,height,zIndex} = req.body;
        const board = await Board.findOne({_id:boardId, userId: req.user._id});
        if (!board) return res.status(404).json({ error: 'Board not found' });
        const newNote={
            _id: new mongoose.Types.ObjectId(),
            x,y,
            text:text||"",color:color||"#fef3c7", 
            width: width || 200,
            height: height || 150,
            zIndex: zIndex || 1,
        };
        board.notes.push(newNote);
        await board.save();
        console.log('New Note Created:', newNote); //
        res.status(201).json(newNote);
    } catch (error) {
       console.error('Error creating note:', error);
        res.status(500).json({error: error.message}); 
    }
};
 export const updateNote = async(req,res)=>{
    try {
        const {boardId, noteId} = req.params;
        const {text,color,x,y,height,width} = req.body;
        const board = await Board.findOne({_id:boardId, userId: req.user._id});
        if (!board) return res.status(404).json({ error: 'Board not found' });
           const note = board.notes.id(noteId);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
        note.text = text ?? note.text;
        note.color = color ?? note.color;
        note.x = x ?? note.x;
        note.y = y ?? note.y;
        note.height = height ?? note.height;
        note.width = width ?? note.width;
        
          await board.save();
          console.log('Note Updated:', note); //
        res.status(200).json(note);
  
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({error: error.message});
    }
 }; 
export const deleteNote = async (req, res) => {
  try {
    const { boardId, noteId } = req.params;
    const board = await Board.findOne({_id:boardId, userId: req.user._id});
    if (!board) return res.status(404).json({ error: 'Board not found' });
    
    const note = board.notes.id(noteId);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    
     board.notes.pull({ _id: noteId })
    await board.save();
    
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: error.message });
  }
};
export const createConnection = async (req,res) =>{
    try {
      console.log(req.user)
        const { boardId } = req.params;
        const {fromNoteId,toNoteId} = req.body;
        if (fromNoteId==toNoteId) return res.status(400).json({ error: 'Cannot connect a note to itself' });
        const board = await Board.findOne({_id:boardId, userId: req.user._id});
        if (!board) return res.status(404).json({ error: 'Board not found' });
        const existingConnection = board.connections.find(
      (conn) =>
        conn.fromNoteId.toString() === fromNoteId &&
        conn.toNoteId.toString() === toNoteId
    );

    if (existingConnection) {
      return res.status(400).json({ error: "Connection already exists" });
    }
       board.connections.push({fromNoteId,toNoteId});
       await board.save();
       const createdConnection =
  board.connections[board.connections.length - 1];

       res.status(201).json(createdConnection);

        
    } catch (error) {
       console.error('Error creating connection:', error);
        res.status(500).json({error: error.message}); 
    }
};

export const deleteConnection = async (req,res)=>{
    try {
       const { boardId, connectionId} = req.params;
    
       const board = await Board.findOne({_id:boardId, userId: req.user._id});
       if (!board) return res.status(404).json({ error: 'Board not found' });
       
        const connection = board.connections.id(connectionId);
    if (!connection) {
      return res.status(404).json({ error: 'Connection not found' });
    }
    board.connections.pull({ _id: connectionId });
    await board.save();
    console.log('Connection Deleted:', connectionId);
       res.status(200).json({ message: 'Connection deleted successfully', connectionId });
    } catch (error) {
        console.error('Error deleting connection:', error);
        res.status(500).json({error: error.message});
    }
}
