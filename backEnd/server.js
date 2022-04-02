import express from 'express';
import data from './data.js'
import cors from 'cors'
import bodyParser from 'body-parser';


const app = express();
const port = 4000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true  }));

app.get('/api/products', (req,res) => {
    res.send(data.products);
});

app.get('/', (req, res) => {
    res.send('server runs');
});
app.listen(port, () => {
    console.log(`server is running at port ${port}`);
});