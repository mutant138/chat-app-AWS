const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const sequelize = require('./util/database')


const userRoutes = require('./routes/user')
const chatRoutes = require('./routes/chat')



const User = require('./models/user');
const Chat = require('./models/chat')




dotenv.config()
const app = express()
app.use(cors({
    origin : '*',
    methods: ['GET' , 'POST']
}) );
app.use(express.static('public'));
app.use(express.json());


app.use(userRoutes)
app.use(chatRoutes)




User.hasMany(Chat)
Chat.belongsTo(User)


sequelize.sync({force : false}).then(()=>{
    console.log("Database synchronized")
}).catch((err)=>{
    console.log("Error syncing in DB :" , err)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});