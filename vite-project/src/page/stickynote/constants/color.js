export const STICKY_NOTE_COLORS = [
  '#fef3c7', // yellow
  '#a7f3d0', // green
  '#fed7aa', // orange
  '#fbb6ce', // pink
  '#bfdbfe', // blue
  '#c7d2fe', // indigo
  '#e9d5ff', // purple
  '#f3e8ff', // violet
];

export const getRandomColor = () => {
  return STICKY_NOTE_COLORS[Math.floor(Math.random() * STICKY_NOTE_COLORS.length)];
};