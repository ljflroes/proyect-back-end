require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const Server = require('./models/server');

const server = new Server();

server.listen();


