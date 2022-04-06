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
app.get('/api/products/:id', (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({message: 'Product Not Found'});
    }
});

app.get('/', (req, res) => {
    res.send('server runs');
});
app.listen(port, () => {
    console.log(`server is running at port ${port}`);
});