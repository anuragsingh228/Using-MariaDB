const express = require('express');
const dotenv = require('dotenv');

dotenv.config({path: '.env-local'});
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
    res.status(200).json({name: "Anurag", title: "Singh"})
})

const userRouter = require('./routes/user');

app.use('/user', userRouter);
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
