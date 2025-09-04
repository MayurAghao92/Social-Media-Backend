import express from "express";
import { registerController,loginController, logoutController} from "../controllers/auth.controller.js";
import  authMiddleware  from "../middlewares/auth.middleware.js";
import genarateCaptionController  from "../controllers/caption.controller.js";

const router=express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    id: req.user._id,
    username: req.user.username,
  });
});
router.post("/register", registerController)
router.post ("/login", loginController)
router.post("/logout",logoutController)
router.post("/generate-caption", genarateCaptionController)
  
  
  
  export default router;