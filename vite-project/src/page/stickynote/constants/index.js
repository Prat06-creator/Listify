export const StickyNote = {
  id: '',
  x: 0,
  y:0,
  width: 0,
  height: 0,
  text: '',
  color: '',
  boardId: '',
}

export const Connection= {
  id: '',
  fromNoteId: '',
  toNoteId: '',
  boardId: '',
}

export const Board ={
  id: '',
  name: '',
  notes: [StickyNote],
  connections: [Connection],
}

export const Position ={
  x: 0,
  y: 0,
}