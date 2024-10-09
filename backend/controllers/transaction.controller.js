import Transaction from "../models/transaction.model.js";

const validMonths = [
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
];

const loadData = async (req, res) => {
   try {
      const response = await fetch(
         "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
      );
      const data = await response.json();

      await Transaction.deleteMany({});

      const processedData = data.map((item) => {
         const date = new Date(item.dateOfSale);
         const month = date.toLocaleString("default", { month: "long" });
         return {
            id: item.id,
            title: item.title,
            price: item.price,
            description: item.description,
            category: item.category,
            image: item.image,
            sold: item.sold,
            month: month,
         };
      });

      await Transaction.insertMany(processedData);
      res.status(200).send({ message: "Data loaded successfully" });
   } catch (error) {
      res.status(500).send({ message: "Error loading data", error });
   }
};

const listTransactions = async (req, res) => {
   try {
      const { search = "", page = 1, perPage = 10, month } = req.query;

      let monthFilter = {};
      if (month) {
         if (!validMonths.includes(month)) {
            return res.status(400).json({
               message:
                  "Invalid month provided. Please select a valid month between January and December.",
            });
         }
         monthFilter = { month: month };
      }

      const limit = parseInt(perPage, 10);
      const skip = (parseInt(page, 10) - 1) * limit;

      const searchFilter = {
         ...monthFilter,
         ...(search
            ? {
                 $or: [
                    { title: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } },
                    ...(isNaN(Number(search))
                       ? []
                       : [{ price: Number(search) }]),
                 ],
              }
            : {}),
      };

      const totalTransactions = await Transaction.countDocuments(searchFilter);

      const transactions = await Transaction.find(searchFilter)
         .skip(skip)
         .limit(limit)
         .sort({ id: 1 });

      res.status(200).json({
         currentPage: parseInt(page, 10),
         perPage: limit,
         totalTransactions,
         totalPages: Math.ceil(totalTransactions / limit),
         transactions,
      });
   } catch (error) {
      res.status(500).json({ message: "Server error, please try again later" });
   }
};

const getStatistics = async (req, res) => {
   try {
      const { month } = req.query;

      if (!month || !validMonths.includes(month)) {
         return res.status(400).json({
            message:
               "Invalid or missing month parameter. Please provide a valid month between January and December.",
         });
      }

      const transactions = await Transaction.find({ month });

      const totalSaleAmount = transactions.reduce((acc, transaction) => {
         if (transaction.sold) {
            return acc + transaction.price;
         }
         return acc;
      }, 0);

      const totalSoldItems = transactions.filter(
         (transaction) => transaction.sold
      ).length;
      const totalUnsoldItems = transactions.filter(
         (transaction) => !transaction.sold
      ).length;

      const statistics = {
         month,
         totalSaleAmount,
         totalSoldItems,
         totalUnsoldItems,
      };

      res.status(200).json(statistics);
   } catch (error) {
      res.status(500).json({ message: "Server error, please try again later" });
   }
};

const getBarChartData = async (req, res) => {
   try {
      const { month } = req.query;

      if (!validMonths.includes(month)) {
         return res.status(400).json({
            message:
               "Invalid month provided. Please select a valid month between January and December.",
         });
      }

      const priceRanges = [
         { range: "0-100", min: 0, max: 100 },
         { range: "101-200", min: 101, max: 200 },
         { range: "201-300", min: 201, max: 300 },
         { range: "301-400", min: 301, max: 400 },
         { range: "401-500", min: 401, max: 500 },
         { range: "501-600", min: 501, max: 600 },
         { range: "601-700", min: 601, max: 700 },
         { range: "701-800", min: 701, max: 800 },
         { range: "801-900", min: 801, max: 900 },
         { range: "901-above", min: 901, max: Infinity },
      ];

      const priceRangeCounts = priceRanges.map((range) => ({
         range: range.range,
         count: 0,
      }));

      const transactions = await Transaction.find({ month });

      transactions.forEach((transaction) => {
         const price = transaction.price;

         priceRanges.forEach((range, index) => {
            if (price >= range.min && price <= range.max) {
               priceRangeCounts[index].count++;
            }
         });
      });

      res.status(200).json({
         month: month,
         priceRangeCounts,
      });
   } catch (error) {
      res.status(500).json({ message: "Server error, please try again later" });
   }
};

const getPieChartData = async (req, res) => {
   try {
      const { month } = req.query;

      if (!validMonths.includes(month)) {
         return res.status(400).json({
            message:
               "Invalid month provided. Please select a valid month between January and December.",
         });
      }

      const transactions = await Transaction.find({ month });

      const categoryCounts = {};

      transactions.forEach((transaction) => {
         const category = transaction.category || "Unknown";
         if (categoryCounts[category]) {
            categoryCounts[category]++;
         } else {
            categoryCounts[category] = 1;
         }
      });

      const pieChartData = Object.keys(categoryCounts).map((category) => ({
         category,
         count: categoryCounts[category],
      }));

      res.status(200).json({
         month: month,
         data: pieChartData,
      });
   } catch (error) {
      res.status(500).json({ message: "Server error, please try again later" });
   }
};

const getCombinedData = async (req, res) => {
   try {
      const { month, search = "", page = 1, perPage = 10 } = req.query;

      const [
         transactionsResponse,
         statisticsResponse,
         barChartResponse,
         pieChartResponse,
      ] = await Promise.all([
         fetch(
            `http://localhost:5000/api/transactions?search=${search}&month=${month}&page=${page}&perPage=${perPage}`
         ),
         fetch(`http://localhost:5000/api/statistics?month=${month}`),
         fetch(`http://localhost:5000/api/bar-chart-data?month=${month}`),
         fetch(`http://localhost:5000/api/pie-chart-data?month=${month}`),
      ]);
      const transactions = await transactionsResponse.json();
      const statistics = await statisticsResponse.json();
      const barChartData = await barChartResponse.json();
      const pieChartData = await pieChartResponse.json();

      const combinedData = {
         month: month,
         transactions: transactions.transactions,
         statistics: statistics,
         barChart: barChartData.priceRangeCounts,
         pieChart: pieChartData.data,
      };

      res.status(200).json(combinedData);
   } catch (error) {
      if (!res.headersSent) {
         res.status(500).json({
            message: "Server error, please try again later",
         });
      }
   }
};

export {
   loadData,
   listTransactions,
   getStatistics,
   getBarChartData,
   getPieChartData,
   getCombinedData,
};
