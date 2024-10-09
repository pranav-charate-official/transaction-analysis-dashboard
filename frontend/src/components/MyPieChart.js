import * as React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const getRandomColor = () => {
   const letters = "0123456789ABCDEF";
   let color = "#";
   for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
   }
   return color;
};

const MyPieChart = ({ pieChartData }) => {
   return (
      <div>
         {pieChartData.length > 0 && (
            <ResponsiveContainer width="100%" height={400}>
               <PieChart>
                  <Tooltip />
                  <Pie
                     data={pieChartData}
                     dataKey="count"
                     nameKey="category"
                     cx="50%"
                     cy="50%"
                     outerRadius={100}
                     fill="#8884d8"
                     label
                  >
                     {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getRandomColor()} />
                     ))}
                  </Pie>
               </PieChart>
            </ResponsiveContainer>
         )}
      </div>
   );
};

export default MyPieChart;
