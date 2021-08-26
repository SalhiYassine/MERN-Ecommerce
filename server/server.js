import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import path from 'path';
import morgan from 'morgan';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running..');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
const folder = path.resolve();
app.use('/uploads', express.static(path.join(folder, '/uploads')));

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Running on port ${PORT}`.yellow.bold));

const jumbleNumbersMethod = (arr) => {
  let numZ = 0;
  let numW = 0;
  let numG = 0;
  let numX = 0;
  let numV = 0;
  let numO = 0;
  let numS = 0;
  let numF = 0;
  let numH = 0;
  let numI = 0;
  let numU = 0;

  for (let i = 0; i < arr.length; i++) {
    let char = arr[i].toUpperCase();
    switch (char) {
      case 'Z':
        numZ += 1;
        break;
      case 'W':
        numW += 1;
        break;
      case 'G':
        numG += 1;
        break;
      case 'X':
        numX += 1;
        break;
      case 'V':
        numV += 1;
        break;
      case 'O':
        numO += 1;
        break;
      case 'S':
        numS += 1;
        break;
      case 'F':
        numF += 1;
        break;
      case 'H':
        numH += 1;
        break;
      case 'I':
        numI += 1;
        break;
      case 'U':
        numU += 1;
        break;

      default:
        break;
    }
  }

  let num0 = numZ;
  let num2 = numW;
  let num4 = numU;
  let num6 = numX;
  let num8 = numG;
  let num1 = Math.abs(numO - (num2 + num4 + num0));
  let num7 = Math.abs(numS - num6);
  let num5 = Math.abs(numF - num7);
  let num3 = Math.abs(numH - num8);
  let num9 = Math.abs(numI - (num5 + num6 + num8));

  let string = `${stringReturn(0, num0)}${stringReturn(1, num1)}${stringReturn(
    2,
    num2
  )}${stringReturn(3, num3)}${stringReturn(4, num4)}${stringReturn(
    5,
    num5
  )}${stringReturn(6, num6)}${stringReturn(7, num7)}${stringReturn(
    8,
    num8
  )}${stringReturn(9, num9)}`;
  return string;
};

const stringReturn = (number, amount) => {
  let string = '';
  for (let i = 0; i < amount; i++) {
    string += `${number}`;
  }
  return string;
};
