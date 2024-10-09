// import React, { useState, useEffect } from "react";
// import "./App.css";
// // import MyBarChart from "./components/MyBarChart";
// import {
//    BarChart,
//    Bar,
//    XAxis,
//    YAxis,
//    CartesianGrid,
//    Tooltip,
//    ResponsiveContainer,
// } from "recharts";

// const App = () => {
//    const [combinedData, setCombinedData] = useState(null);
//    const [search, setSearch] = useState("");
//    const [month, setMonth] = useState("March"); // Set default month to March
//    const [months, setMonths] = useState([
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//    ]);

//    useEffect(() => {
//       loadData();
//    }, []);

//    useEffect(() => {
//       fetchCombinedData();
//    }, [search, month]);

//    const loadData = async () => {
//       try {
//          const response = await fetch("http://localhost:5000/api/load-data");
//          if (response.ok) {
//             console.log("Data loaded successfully");
//             fetchCombinedData(); // Fetch combined data after loading data
//          } else {
//             console.error("Failed to load data");
//          }
//       } catch (error) {
//          console.error("Error loading data:", error);
//       }
//    };

//    const fetchCombinedData = async () => {
//       try {
//          const params = new URLSearchParams({ search, month });
//          const response = await fetch(
//             `http://localhost:5000/api/combined-data?${params}`
//          );
//          const data = await response.json();
//          setCombinedData(data);
//       } catch (error) {
//          console.error("Error fetching combined data:", error);
//       }
//    };

//    return (
//       <div className="app">
//          <div className="search-bar">
//             <input
//                type="text"
//                placeholder="Search transactions..."
//                value={search}
//                onChange={(e) => setSearch(e.target.value)}
//             />
//             <select value={month} onChange={(e) => setMonth(e.target.value)}>
//                {months.map((m) => (
//                   <option key={m} value={m}>
//                      {m}
//                   </option>
//                ))}
//             </select>
//          </div>
//          {combinedData && (
//             <>
//                <table className="transactions-table">
//                   <thead>
//                      <tr>
//                         <th>ID</th>
//                         <th>Title</th>
//                         <th>Price</th>
//                         <th>Description</th>
//                         <th>Category</th>
//                         <th>Sold</th>
//                         <th>Image</th>
//                      </tr>
//                   </thead>
//                   <tbody>
//                      {combinedData.transactions.map((transaction) => (
//                         <tr key={transaction.id}>
//                            <td>{transaction.id}</td>
//                            <td>{transaction.title}</td>
//                            <td>{transaction.price}</td>
//                            <td>{transaction.description}</td>
//                            <td>{transaction.category}</td>
//                            <td>{transaction.sold ? "Yes" : "No"}</td>
//                            <td>
//                               <img
//                                  src={transaction.image}
//                                  alt={transaction.title}
//                                  width="100"
//                               />
//                            </td>
//                         </tr>
//                      ))}
//                   </tbody>
//                </table>
//                <div className="statistics">
//                   <h3>Statistics for {combinedData.month}</h3>
//                   <p>
//                      Total Sale Amount:{" "}
//                      {combinedData.statistics.totalSaleAmount}
//                   </p>
//                   <p>
//                      Total Sold Items: {combinedData.statistics.totalSoldItems}
//                   </p>
//                   <p>
//                      Total Unsold Items:{" "}
//                      {combinedData.statistics.totalUnsoldItems}
//                   </p>
//                </div>
//                <div className="charts">
//                   <h3>Bar Chart Data</h3>
//                   {/* <MyBarChart priceRangeCounts={combinedData.barChartData} /> */}

//                   <div>
//                      {console.log(combinedData.barChart)}
//                      {combinedData.barChart.length > 0 && (
//                         <ResponsiveContainer width="70%" height={400}>
//                            <BarChart
//                               data={combinedData.barChart} // No layout needed, default is vertical
//                            >
//                               <CartesianGrid strokeDasharray="3 3" />
//                               <XAxis
//                                  dataKey="range"
//                                  label={{
//                                     value: "Price Range",
//                                     position: "insideBottom",
//                                     offset: -5,
//                                  }}
//                               />
//                               <YAxis
//                                  type="number"
//                                  domain={[0, 10]} // Domain from 0 to 100
//                                  ticks={[0, 2, 4, 6, 8, 10]} // Custom ticks
//                                  label={{
//                                     value: "Number of Items",
//                                     position: "insideLeft",
//                                     angle: -90,
//                                  }}
//                               />
//                               <Tooltip />
//                               <Bar dataKey="count" fill="#05445e" />
//                            </BarChart>
//                         </ResponsiveContainer>
//                      )}
//                   </div>

//                   <h3>Pie Chart Data</h3>
//                   <ul>
//                      {combinedData.pieChart.map((category) => (
//                         <li key={category.category}>
//                            {category.category}: {category.count}
//                         </li>
//                      ))}
//                   </ul>
//                </div>
//             </>
//          )}
//       </div>
//    );
// };

// export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import MyBarChart from "./components/MyBarChart";
import MyPieChart from "./components/MyPieChart";

const App = () => {
   const [combinedData, setCombinedData] = useState(null);
   const [search, setSearch] = useState("");
   const [month, setMonth] = useState("March"); // Set default month to March
   const [months, setMonths] = useState([
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
   ]);

   useEffect(() => {
      loadData();
   }, []);

   useEffect(() => {
      fetchCombinedData();
   }, [search, month]);

   const loadData = async () => {
      try {
         const response = await fetch("http://localhost:5000/api/load-data");
         if (response.ok) {
            console.log("Data loaded successfully");
            fetchCombinedData(); // Fetch combined data after loading data
         } else {
            console.error("Failed to load data");
         }
      } catch (error) {
         console.error("Error loading data:", error);
      }
   };

   const fetchCombinedData = async () => {
      try {
         const params = new URLSearchParams({ search, month });
         const response = await fetch(
            `http://localhost:5000/api/combined-data?${params}`
         );
         const data = await response.json();
         setCombinedData(data);
      } catch (error) {
         console.error("Error fetching combined data:", error);
      }
   };

   return (
      <div className="app">
         <div className="search-bar">
            <input
               type="text"
               placeholder="Search transactions..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
            />
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
               {months.map((m) => (
                  <option key={m} value={m}>
                     {m}
                  </option>
               ))}
            </select>
         </div>
         {combinedData && (
            <>
               <table className="transactions-table">
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Sold</th>
                        <th>Image</th>
                     </tr>
                  </thead>
                  <tbody>
                     {combinedData.transactions.map((transaction) => (
                        <tr key={transaction.id}>
                           <td>{transaction.id}</td>
                           <td>{transaction.title}</td>
                           <td>{transaction.price}</td>
                           <td>{transaction.description}</td>
                           <td>{transaction.category}</td>
                           <td>{transaction.sold ? "Yes" : "No"}</td>
                           <td>
                              <img
                                 src={transaction.image}
                                 alt={transaction.title}
                                 width="100"
                              />
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
               <div className="statistics">
                  <h3>Statistics for {combinedData.month}</h3>
                  <p>
                     Total Sale Amount:{" "}
                     {combinedData.statistics.totalSaleAmount}
                  </p>
                  <p>
                     Total Sold Items: {combinedData.statistics.totalSoldItems}
                  </p>
                  <p>
                     Total Unsold Items:{" "}
                     {combinedData.statistics.totalUnsoldItems}
                  </p>
               </div>
               <div className="charts">
                  <h3>Bar Chart Data</h3>
                  <MyBarChart priceRangeCounts={combinedData.barChart} />
                  <h3>Pie Chart Data</h3>
                  <MyPieChart pieChartData={combinedData.pieChart} />
               </div>
            </>
         )}
      </div>
   );
};

export default App;
