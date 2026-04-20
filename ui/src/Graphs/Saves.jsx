import React from "react";
import { Column } from "@ant-design/plots";
import "../App.css";


export default function SaveGraph({ data }) {

  // Build frequency table for count
  const countData = React.useMemo(() => {
    const freq = {};
    data.forEach(r => {
      const h = r.scount ?? 0;
      freq[h] = (freq[h] || 0) + 1;
    });
  
    return Object.entries(freq).map(([scount, count]) => ({
      scount: Number(scount),
      count,
    }));
  }, [data]);
  //Max Value Memo for having it as a global
  const maxValue = React.useMemo(() => {
    return countData.length
      ? Math.max(...countData.map(d => d.count))
      : 0;
  }, [countData]);
  // Build full range from min to max
  const scountData = React.useMemo(() => {
    if (countData.length === 0) return [];
  
    const values = countData.map(d => d.scount);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
  
    const range = [];
    for (let i = minValue; i <= maxValue; i++) {
      const existing = countData.find(d => d.scount === i);
      range.push({
        scount: i,
        count: existing ? existing.count : 0,
      });
    }
  
    return range;
  }, [countData]);
    //Graph configuration
    const countConfig = {
        data: countData,
        xField: 'scount',
        yField: 'count',
        axis: {
          x: {
            title: 'Number of Successful Saves',
          },
          y: {
            title: 'Frequency',
          }
        },
        markBackground: {
          style: {
            fill: '#eee',
          },
        },

        //Scale
        scale: {
            y: {
            domain: [0, (maxValue + (maxValue * .25))],
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