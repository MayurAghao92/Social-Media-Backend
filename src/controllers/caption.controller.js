// controllers/caption.controller.js
import  generateCaption  from '../services/ai.service.js';

const generateCaptionController = async (req, res) => {
  try {
    const file = req.file;
    const base64Image = file.buffer.toString("base64");
    const caption = await generateCaption(base64Image);

    res.status(200).json({ caption });
  } catch (err) {
    console.error("Error in generateCaptionController:", err);
    res.status(500).json({ message: "Failed to generate caption" });
  }
};

export default generateCaptionController ;
