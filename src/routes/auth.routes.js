import express from "express";
import { registerController,loginController, logoutController,getProfileController} from "../controllers/auth.controller.js";
import  authMiddleware  from "../middlewares/auth.middleware.js";
import genarateCaptionController  from "../controllers/caption.controller.js";

const router=express.Router();

router.get("/profile", authMiddleware,getProfileController );
router.post("/register", registerController)
router.post ("/login", loginController)
router.post("/logout",logoutController)
router.post("/generate-caption", genarateCaptionController)
  
  
  
  export default router;