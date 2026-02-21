import { useState, useEffect } from 'react';


export const formatDate = (date) => {
  if (!date) return '';
  if (typeof date === 'string') {
    return date.includes('T') ? date.split('T')[0] : date;
  }
  return date.toLocaleDateString('en-CA').split('T')[0];
};


export const isSameDay = (date1, date2) => {
  return formatDate(date1) === formatDate(date2);
};

export const getMonthName = (date) => {
  return date.toLocaleDateString('en-US', { month: 'long' });
};

export const getYear = (date) => {
  return date.getFullYear();
};

export const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  // Get the day of week for the first day (0 = Sunday)
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const days = [];
  const current = new Date(startDate);
  
  // Generate 6 weeks of days (42 days total)
  for (let i = 0; i < 42; i++) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  
  return days;
};

export const addMonths = (date, months) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};