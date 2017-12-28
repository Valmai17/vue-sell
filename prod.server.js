
var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/', function (req, res, next) {
    req.url = './index.html';
    next();
});

app.use(router);

//手动添加静态数据
var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

//路由api(接口)
var apiRoutes = express.Router();
//商家接口
apiRoutes.get('/seller',function(req,res){
  res.json({
    errno:0,
    data:seller
  });
});
//商品接口
apiRoutes.get('/goods',function(req,res){
  res.json({
    errno:0,
    data:goods
  });
});
//评论接口
apiRoutes.get('/ratings',function(req,res){
  res.json({
     errno:0,
     data:ratings
  });
});

app.use('/api',apiRoutes);

app.use(express.static('./dist'));  // 定义static目录

module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:' + port + '\n')
})
