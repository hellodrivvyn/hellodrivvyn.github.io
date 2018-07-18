var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var MailChimp = require('mailchimp-api-v3');
var dialog = require('dialog');


var app = express();

var mailchimp = new MailChimp('60090b8a87835bd25300586dabed866b-us18');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
	res.render('index', {title: 'Drivvyn | Your Career Development Assistant', header: 'Achieve Your Greatness'});
});

// app.get('/about', function(req, res) {
// 	res.render('about', {title: 'About Career Path'});
// });

// app.get('/contact', function(req, res) {
// 	res.render('contact', {title: 'Contact', message: 'Tell me when it\'s live!'});
// });

app.post('/', function(req, res) {
	// adds an email address to my list in mailchimp
	mailchimp.post('/lists/3be882c5ec/members', {
		email_address: req.body.email,
		status: 'subscribed'
	})
	.then(() => {
		console.log('Email added');
		res.redirect('/thanks');
	})
	.catch((err) => {
		dialog.err('Try using a different email address.', 'Hmm, something is up', () => {
			res.redirect('/#sign-up');
		});
	})
});

app.get('/thanks', function(req, res) {
	res.render('thanks', {title: 'Drivvyn | Thank You!', header: 'Do Your Have One More Minute?'});
});

app.listen(process.env.PORT || 3000);
console.log('Server is running on port 3000');