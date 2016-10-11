var express = require('express');
var app = express();
var mysql = require('mysql');
var words=require('./lib/fortune');
var settings = require('./js/config');
var data = require('./lib/data');
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = LocalStorage('./scratch', Number.MAX_VALUE);
var bodyParser = require('body-parser');
var path = require('path');
var md5 = require('md5');
  
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }))
//app.use(sendViewMiddleware);

var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });// 设置默认布局为main

app.set('port',process.env.PORT||8000);  //设置端口号
app.use(express.static(__dirname + '/public')); //设置静态目录的入口


app.engine('handlebars',handlebars.engine);// 将express模板引擎配置成handlebars
app.set('view engine', 'handlebars');

//app.set('view engine', 'html'); //用来设置加载纯静态的html界面

app.set('view cache', true);  //设置缓存
app.set('views', path.join(__dirname, 'views'));

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
});
app.use('/hello',function(req,res){
		res.sendView('hello.html');;
});
app.use('/login',function(req,res){
	if (!req.body) return res.sendStatus(400);
	res.render('login',{title:"欢迎来到登陆界面！"});
	
});
app.use('/loginHandle',function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	var conn = mysql.createConnection(settings.db);
	if(username!=""&&password!==""){
		conn.query("select count(*) as count from user WHERE username='"+username +"'", function(err, datas) {
		if (err) throw err;
		if(datas[0].count ===1){
			console.log("select success")
			res.send('hello,'+req.body.username);
		}else{
			console.log("用户名或者密码有误！");
		}
		
	});
	}else{
		console.log("用户名或者密码不能为空！");
	}
 

});

app.use('/register',function(req,res){
	if (!req.body) return res.sendStatus(400);
	res.render('register',{title:"欢迎来到注册界面！"});
})

app.use('/registerHandle',function(req,res){
	var username = req.body.username;
	var password = req.body.pwd;
	var checkPwd = req.body.checkPwd;
	var conn = mysql.createConnection(settings.db);
	if(username!=""&&password!==""&&checkPwd!==""){
		if(password == checkPwd){
			var str = md5(password);
			conn.query('insert into user (username,password ) values ("'+ username +'" ,"' +str+'")', function(err){
			if(err) return false;
		    	res.send('hello,'+req.body.username);
			});
		}else{
			
			res.render('register',{title:"密码和重复密码必须一致！"});
		}
	}else{
		
		res.render('register',{title:"用户名或者密码不能为空！"});
	}
})

app.use(function(req,res,next){
	res.status(404);
	res.render('404');
});

app.use(function(req,res,next){
	console.error(err.stack);
	res.status(500);
	res.render('500');

});
app.use(function(req, res, next){ 
	console.log(res);

	
});
app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
});
//关于静态界面的显示静态文件的公共用方法
// function sendViewMiddleware(req, res, next) {
//     res.sendView = function(view) {
//         return res.sendFile(__dirname + "/views/" + view);
//     }
//     next();
// }