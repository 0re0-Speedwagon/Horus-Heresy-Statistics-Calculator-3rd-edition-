// components/HitGraph.jsx
import React from "react";
import { Column } from "@ant-design/plots";


export default function CritHitGraph({ data }) {

    // Build frequency table for count
    const countData = React.useMemo(() => {
      const freq = {};
      data.forEach(r => {
        const h = r.ccount ?? 0;
        freq[h] = (freq[h] || 0) + 1;
      });

      return Object.entries(freq).map(([ccount, count]) => ({
        ccount,
        count,
      }));
    }, [data]);

    //Maximum number in dataset for graph customisation
    const maxCount = React.useMemo(() => {
      return countData.length
        ? Math.max(...countData.map(d => d.count))
        : 0;
    }, [countData]);

    //Average value of data set
    const averageValue = countData.reduce((sum, d) => sum + d.ccount * d.count, 0) /
                     countData.reduce((sum, d) => sum + d.count, 0);

    //Graph configuration
    const countConfig = {
        data: countData,
        xField: 'ccount',
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
        <div style={{ width: '700px', margin: '20px auto' }}>
          <Column {...countConfig} />
        </div>
        
    );
}