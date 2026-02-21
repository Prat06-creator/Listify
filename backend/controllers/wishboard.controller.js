import {WishBoard} from '../models/wishboard.model.js';

export const getBoards= async(req,res)=>{
    try {
       const boards= await WishBoard.find({userId: req.user._id});
       res.status(200).json(boards); 
    } catch (error) {
       res.status(500).json({ error:error.message }); 
    }
}

export const createBoard = async (req,res)=>{
    try {
        const user = req.user;
        if (!user) return res.status(404).json({error: 'User not found'});
        const {type,period}= req.body;
        const defaultNames = {
      year: ["Vision Board", "Goals & Dreams", "Inspiration Hub", "Life Canvas"],
      month: ["Monthly Moodboard", "This Month", "Goals", "Inspiration"],
    }
    const backgroundColors = [
  '#FFF5F5', '#FFF5EB', '#FFFBEB', '#FEF3C7', '#FEF9C3',
  '#ECFCCB', '#DCFCE7', '#D1FAE5', '#CCFBF1', '#CFFAFE',
  '#E0F2FE', '#DBEAFE', '#E0E7FF', '#EDE9FE', '#F3E8FF',
  '#FAE8FF', '#FCE7F3', '#FFE4E6', '#FFFFFF', '#F8F8F8'
];
const backgroundPatterns = [
  'dots', 'grid', 'diagonal', 'stripes', 'diamond', 'none'
];
    const randomPattern = backgroundPatterns[Math.floor(Math.random() * backgroundPatterns.length)];
     const randomBg = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    const boardCount = await WishBoard.countDocuments({
      userId: user._id,
      type: type,
      period: period,
    });
    const name = defaultNames[type][boardCount % defaultNames[type].length];
        const newBoard = await WishBoard.create({
            name, type, period,randomBg, 
            style:{
                backgroundColor: randomBg,
                pattern: randomPattern,
            },
            items: [],
            userId: user._id
        });
        console.log('New Board Created:', newBoard);
        res.status(201).json(newBoard);
    } catch (error) {
       res.status(500).json({ error: error.message }); 
    }
}
export const updateBoard = async (req, res)=>{
    try {
        const {boardId}= req.params;
        const updatedData={};
    if (req.body.style?.backgroundColor) {
  updatedData["style.backgroundColor"] = req.body.style.backgroundColor;
}

if (req.body.style?.pattern) {
  updatedData["style.pattern"] = req.body.style.pattern;
}
 
if (req.body.items) {
        updatedData.items = req.body.items;
        }

       if (req.body.name) {
       updatedData.name = req.body.name.trim();
       }
        const updatedBoard= await WishBoard.findOneAndUpdate(
            {_id: boardId, userId: req.user._id},
            {$set: updatedData},
            {new: true}
        );
        if (!updatedBoard) return res.status(404).json({ error: 'Board not found' });
        console.log('Board Updated:', updatedBoard);
        res.status(200).json(updatedBoard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const deleteBoard = async (req,res)=>{
    try {
         const {boardId}= req.params;
         const deleteBoard = await WishBoard.findOneAndDelete({_id:boardId, userId: req.user._id});
         if (!deleteBoard) return res.status(404).json({ error: 'Board not found' });
         res.status(200).json(deleteBoard)
    } catch (error) {
       res.status(500).json({ error: error.message }); 
    }
}
export const addItem=async(req,res)=>{
    try {
        const {boardId}= req.params;
        const newItem= req.body;
        const board = await WishBoard.findOne({_id: boardId, userId: req.user._id});
        if (!board) return res.status(404).json({ error: 'Board not found' });
        board.items.push(newItem);
        await board.save();
        res.status(200).json(board);
    } catch (error) {
        console.error('Error adding item:', error);
       res.status(500).json({ error: error.message }); 
    }
}
export const updateItem= async(req,res)=>{
    try {
        const {boardId,itemId}= req.params;
        const updates = req.body;
        const board = await WishBoard.findOne({_id: boardId, userId: req.user._id});
        if (!board) return res.status(404).json({ error: 'Board not found' });
        const item = board.items.id(itemId);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        Object.assign(item, updates);
        await board.save();
        res.status(200).json(board);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const deleteItem= async(req,res)=>{
    try {
        const {boardId,itemId}= req.params;
        const board = await WishBoard.findOne({_id: boardId, userId: req.user._id});
        if (!board) return res.status(404).json({ error: 'Board not found' });
        board.items= board.items.filter(i=> i._id.toString() !== itemId);
        await board.save();
        res.status(200).json(board);
    } catch (error) {
       res.status(500).json({ error: error.message }); 
    }
}
