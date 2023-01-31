const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'parleg100rs@gmail.com',
		pass: 'sR001GelraP'
	}
});

const token = jwt.sign({
		data: 'Token Data' 
	}, 'ourSecretKey', { expiresIn: '10m' }
);	

const mailConfigurations =(sendTo)= {

	// It should be a string of sender/server email
	from: 'parleg10rs@gmail.com',

	to: 'adeshgadekar98@gmail.com',

	// Subject of Email
	subject: 'Email Verification',
	
	// This would be the text of email body
	text: `Hi! There, You have recently visited
		our website and entered your email.
		Please follow the given link to verify your email
		http://localhost:3000/verify/${token}
		Thanks`
	
};

transporter.sendMail(mailConfigurations, function(error, info){
	if (error) throw Error(error);
	console.log('Email Sent Successfully');
	console.log(info);
});
