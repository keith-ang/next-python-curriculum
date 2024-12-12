// lib/DaysContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const DaysContext = createContext();

export const useDays = () => useContext(DaysContext);

export const DaysProvider = ({ children }) => {
  const [days, setDays] = useState([]);

  useEffect(() => {
    const fetchDays = async () => {
      const response = await fetch('/api/days');
      if (response.ok) {
        const data = await response.json();
        setDays(data);
      } else {
        console.error(`Failed to fetch. Status: ${response.status}`);
      }
    };

    if (days.length === 0) {
      fetchDays();
    }
  }, [days]);

  return (
    <DaysContext.Provider value={{ days, setDays }}>
      {children}
    </DaysContext.Provider>
  );
};