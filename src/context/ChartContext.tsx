'use client'

import { createContext, useContext, useState } from 'react';

const ChartContext = createContext<any>(null);

export function ChartProvider({ children }: { children: React.ReactNode }) {
  const [chartData, setChartData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <ChartContext.Provider value={{ 
      chartData, 
      setChartData, 
      userData, 
      setUserData,
      analysisData,
      setAnalysisData 
    }}>
      {children}
    </ChartContext.Provider>
  );
}

export const useChartContext = () => useContext(ChartContext);
