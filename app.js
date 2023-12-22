const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')












dotenv.config()
const app = express()
app.use(cors());
app.use(express.static('public'));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});