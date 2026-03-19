// components/HitGraph.jsx
import React from "react";
import { Column } from "@ant-design/plots";


export default function HitGraph({ data }) {

    // Build frequency table for hcount
    const hcountData = React.useMemo(() => {
      const freq = {};
      data.forEach(r => {
        const h = r.hcount ?? 0;
        freq[h] = (freq[h] || 0) + 1;
      });

      return Object.entries(freq).map(([hcount, count]) => ({
        hcount,
        count,
      }));
    }, [data]);

    //Maximum number in dataset for graph customisation
    const maxCount = React.useMemo(() => {
      return hcountData.length
        ? Math.max(...hcountData.map(d => d.count))
        : 0;
    }, [hcountData]);

    //Average value of data set
    const averageValue = hcountData.reduce((sum, d) => sum + d.hcount * d.count, 0) /
                     hcountData.reduce((sum, d) => sum + d.count, 0);

    //Graph configuration
    const hcountConfig = {
        data: hcountData,
        xField: 'hcount',
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
          <Column {...hcountConfig} />
        </div>
        
    );
}