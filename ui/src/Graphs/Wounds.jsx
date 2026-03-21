// components/HitGraph.jsx
import React from "react";
import { Column } from "@ant-design/plots";
import "../App.css"


export default function WoundGraph({ data }) {

  // Build frequency table for count
  const countData = React.useMemo(() => {
    const freq = {};
    data.forEach(r => {
      const h = r.wcount ?? 0;
      freq[h] = (freq[h] || 0) + 1;
    });
  
    return Object.entries(freq).map(([wcount, count]) => ({
      wcount: Number(wcount),
      count,
    }));
  }, [data]);

  //Max Value Memo for having it as a global
  const maxCount = React.useMemo(() => {
    return countData.length
      ? Math.max(...countData.map(d => d.count))
      : 0;
  }, [countData]);

  // Build full range from min to max
  const wcountData = React.useMemo(() => {
    if (countData.length === 0) return [];
  
    const values = countData.map(d => d.wcount);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
  
    const range = [];
    for (let i = minValue; i <= maxValue; i++) {
      const existing = countData.find(d => d.wcount === i);
      range.push({
        wcount: i,
        count: existing ? existing.count : 0,
      });
    }
  
    return range;
  }, [countData]);

    //Graph configuration
    const countConfig = {
        data: countData,
        xField: 'wcount',
        yField: 'count',
        markBackground: {
          style: {
            fill: '#eee',
          },
        },

        //Scale
        scale: {
            y: {
            domain: [0, (maxCount + (maxCount * .25))],
            nice: false,     // prevents auto rounding the top
            padding: 0,      // removes extra headroom
          },
        },
        legend: false,
    };

    //======================
    //Actual Return
    //======================
    return(
        <div className="graph-wrapper">
          <Column {...countConfig} />
        </div>
        
    );
}