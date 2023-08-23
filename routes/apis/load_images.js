var express = require('express');
var router = express.Router();
var host = require('../../helpers/host');

const fs = require('fs');
const path = require('path');

const imageFolder = path.join(__dirname, 'public', 'uploads', 'images', 'slides');

router.get('/get-all', (req, res) => {
    fs.readdir(imageFolder, (err, files) => {
      if (err) {
        console.error('Lỗi>>>>', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      const imageFiles = files.filter(file => {
        const extname = path.extname(file).toLowerCase();
        return extname === '.jpg' || extname === '.png' || extname === '.jpeg' || extname === '.gif';
      });

      const imagePaths = imageFiles.map(imageFile => {
        return `${host}/uploads/images/slides/${imageFile}`;
      });
      res.json({ images: imagePaths });
    });
  });
module.exports = router;