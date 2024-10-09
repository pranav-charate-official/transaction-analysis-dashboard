// import React from "react";
// import {
//    BarChart,
//    Bar,
//    XAxis,
//    YAxis,
//    CartesianGrid,
//    Tooltip,
//    ResponsiveContainer,
// } from "recharts";

// const MyBarChart = ({ priceRangeCounts }) => {
//    const data = priceRangeCounts.map((item) => ({
//       name: item.range,
//       count: item.count,
//    }));

//    console.log(data);
//    return (
//       <div>
//          {data.length > 0 && (
//             <ResponsiveContainer width="70%" height={400}>
//                <BarChart
//                   data={data} // No layout needed, default is vertical
//                >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis
//                      dataKey="name"
//                      label={{
//                         value: "Price Range",
//                         position: "insideBottom",
//                         offset: -5,
//                      }}
//                   />
//                   <YAxis
//                      type="number"
//                      domain={[0, 10]} // Domain from 0 to 100
//                      ticks={[0, 2, 4, 6, 8, 10]} // Custom ticks
//                      label={{
//                         value: "Number of Items",
//                         position: "insideLeft",
//                         angle: -90,
//                      }}
//                   />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#05445e" />
//                </BarChart>
//             </ResponsiveContainer>
//          )}
//       </div>
//    );
// };

// export default MyBarChart;

import * as React from "react";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
} from "recharts";

const MyBarChart = ({ priceRangeCounts }) => {
   const data = priceRangeCounts.map((item) => ({
      priceRange: item.range,
      count: item.count,
   }));

   return (
      <div>
         {data.length > 0 && (
            <ResponsiveContainer width="70%" height={400}>
               <BarChart
                  data={data} // No layout needed, default is vertical
               >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                     dataKey="priceRange"
                     label={{
                        value: "Price Range",
                        position: "insideBottom",
                        offset: -5,
                     }}
                  />
                  <YAxis
                     type="number"
                     domain={[0, 10]} // Domain from 0 to 100
                     ticks={[0, 2, 4, 6, 8, 10]} // Custom ticks
                     label={{
                        value: "Number of Items",
                        position: "insideLeft",
                        angle: -90,
                     }}
                  />
                  <Tooltip />
                  <Bar dataKey="count" fill="#05445e" />
               </BarChart>
            </ResponsiveContainer>
         )}
      </div>
   );
};

export default MyBarChart;
