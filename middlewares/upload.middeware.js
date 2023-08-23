const multer = require('multer')

//storage middleware
const storage = multer.memoryStorage();
      
const upload = multer({ storage: storage });

module.exports= multer({ storage: storage })