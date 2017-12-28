/*
* @Author: Marte
* @Date:   2017-12-28 09:53:33
* @Last Modified by:   Marte
* @Last Modified time: 2017-12-28 09:58:08
*/

var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();