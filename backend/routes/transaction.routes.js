import express from "express";
import {
   loadData,
   listTransactions,
   getStatistics,
   getBarChartData,
   getPieChartData,
   getCombinedData,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.get("/load-data", loadData);
router.get("/transactions", listTransactions);
router.get("/statistics", getStatistics);
router.get("/bar-chart-data", getBarChartData);
router.get("/pie-chart-data", getPieChartData);
router.get("/combined-data", getCombinedData);

export default router;
