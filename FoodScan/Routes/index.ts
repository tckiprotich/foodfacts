import { Router } from "express";
import HomeController from "../Controllers/HomeController";

const router = Router();

// Home Route
router.get("/", HomeController.Hero);
router.get("/scan", HomeController.Scan);
router.post("/scan", HomeController.ScanBarCode);



// Export the router
export default router;