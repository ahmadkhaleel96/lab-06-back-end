'use strict'

const express = require('express');
const server = express();

const cors = require('cors');
server.use(cors());

require('dotenv').config();
const PORT = process.env.PORT;

server.listen(PORT, () => console.log('Listening to PORT 5500'));