import React from "react";
import { Column } from "@ant-design/plots";
import "../App.css";


export default function FeelNoPainGraph({ data }) {

  // Build frequency table for count
  const countData = React.useMemo(() => {
    const freq = {};
    data.forEach(r => {
      const h = r.fnpcount ?? 0;
      freq[h] = (freq[h] || 0) + 1;
    });
  
    return Object.entries(freq).map(([fnpcount, count]) => ({
      fnpcount: Number(fnpcount),
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
  const fnpcountData = React.useMemo(() => {
    if (countData.length === 0) return [];
  
    const values = countData.map(d => d.fnpcount);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
  
    const range = [];
    for (let i = minValue; i <= maxValue; i++) {
      const existing = countData.find(d => d.fnpcount === i);
      range.push({
        fnpcount: i,
        count: existing ? existing.count : 0,
      });
    }
  
    return range;
  }, [countData]);
    //Graph configuration
    const countConfig = {
        data: countData,
        xField: 'fnpcount',
        yField: 'count',
        axis: {
          x: {
            title: 'Number of successful FNP/Shroud',
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