import express from 'express';
import bodyParser from 'body-parser';

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log("Listenting on port:", port);
});
