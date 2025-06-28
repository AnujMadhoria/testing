const fs = require('fs');
const { runYoloModel } = require('../utils/yoloUtils');

exports.detectVegetables = async (req, res) => {
  try {
    const filePath = req.file.path;

    const veggies = await runYoloModel(filePath);

    // Respond first, then delete the file
    res.json({ detected: veggies });

    // Delete the file asynchronously
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Failed to delete uploaded file:", err.message);
      } else {
        console.log("Uploaded file deleted:", filePath);
      }
    });

  } catch (err) {
    console.error("Detection error:", err);
    res.status(500).json({ message: 'Detection failed' });
  }
};
