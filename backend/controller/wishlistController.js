const Wishlist = require('../models/Wishlist');
const fs = require('fs');
const path = require('path');

exports.addToWishlist = async (req, res) => {
  try {
    const { note } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    const safePath = req.file.path.replace(/\\/g, "/");

    const newItem = await Wishlist.create({
      userId: req.user.id,
      imageUrl: safePath, 
      note: note
    });

    res.status(201).json({ 
      success: true,
      message: "Added to wishlist!", 
      item: newItem 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const items = await Wishlist.findAll({ 
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']] 
    });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching wishlist" });
  }
};

exports.deleteWish = async (req, res) => {
    try {
        const { id } = req.params;
        const wish = await Wishlist.findOne({ where: { id, userId: req.user.id } });

        if (!wish) {
            return res.status(404).json({ success: false, message: "Wish not found" });
        }

       
        const filePath = path.join(__dirname, '..', '..', wish.imageUrl); 
        
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (fileErr) {
            console.error("File deletion error (disk):", fileErr.message);
            
        }

        // 2. Delete from Database
        await wish.destroy();
        
        res.status(200).json({ success: true, message: "Wish deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ success: false, message: "Error deleting wish", error: error.message });
    }
};