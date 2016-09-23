var express = require('express');
var app = express();
var mysql = require('mysql');
var words=require('./lib/fortune');
var settings = require('./js/config');
var data = require('./lib/data');
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = LocalStorage('./scratch', Number.MAX_VALUE);

var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });// 设置默认布局为main

app.set('port',process.env.PORT||3000);  //设置端口号
app.use(express.static(__dirname + '/public'));


app.engine('handlebars',handlebars.engine);// 将express模板引擎配置成handlebars
app.set('view engine', 'handlebars');

app.set('view cache', true);  //设置缓存


app.get('/',function(req,res){
	res.render('home',{words:words.getFortune()});
});

app.get('/about',function(req,res){
	res.render('about',{sum:words.add(Math.random()*10,Math.random()*20)})
});

app.get('/show',function(req,res){
	if(!res.locals.partials) res.locals.partials = {};
	if(!res.locals.images) res.locals.images = {};
	res.locals.partials.weather = data.data();
	var conn = mysql.createConnection(settings.db);
	conn.connect(function(){
		console.log('mysql connect success!');
	});
	conn.query('select * from wallpaper', function(err, datas) {
	 	if (err) throw err;
 	 	localStorage.setItem("data",datas);
 	 	res.locals.images.imgs = datas;
 	 // 	console.log(res.locals.images.imgs);
	 	// if(!res.locals.images.imgs){
	 	// 	res.locals.images.imgs = localStorage.getItem('data');
	 	// }  
	 	res.render('show',{content:res.locals.partials.weather,image:res.locals.images});
	});
	
})
app.use(function(req,res,next){
	res.status(404);
	res.render('404');
	next();
});

app.use(function(req,res,next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
	next();
});
app.use(function(req, res, next){ 
	console.log(res);

	
});
app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
});
