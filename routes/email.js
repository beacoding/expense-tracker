var nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
// var transporter = nodemailer.createTransport('smtps://'+process.env.SMTP_LOGIN+':'+process.env.SMTP_PASSW+'@smtp.mailgun.org');
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var Email = require('../models/Email');
var authMiddleware = require('../middleware/auth.middleware');
var emailMiddleware = require('../middleware/email.middleware');

router.post('/requestEmail', [authMiddleware.isLoggedIn, emailMiddleware.findEmail], function(req, res, next) {
  if (req.error != undefined) {
    console.log("unbroken");
    console.log(req);
    console.log("BREAK");
    console.log(req.claimee_email);
    console.log(req.approver_email[0].email);
    res.status(500);
    res.send({error: req.error});
  } else {
    console.log("broken");
    console.log(req);
    console.log("BREAK");
    console.log(req.claimee_email);
    console.log(req.approver_email[0].email);
    res.send({ claimee_email: req.claimee_email,
            approver_email: req.approver_email});
  }
});

router.post('/sendClaimeeCreatedEmail', function(req,res) {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'cpsc319test@gmail.com',
        pass: 'ubccpsc319'
      }
    });
    let mailOptions = {
      from: '"Coast Capital Management" <cpsc319test@gmail.com>', // sender address
      to: 'cpsc319test@gmail.com', // list of receivers {req.body.claimee_email.email}
      subject: 'Hello ' + req.user.first_name + " " + req.user.last_name , // Subject line
      text: "Your claim has been created and will be sent to " + req.user.manager_name + " when submitted. Their email is "
      + req.body.approver_email.email, // plain text body
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.send(500);
        console.log("didn't send");
        return console.log(error);
      }
      else
        console.log('Message sent: %s', info.messageId);
      console.log("break");
      console.log(req.body);
      console.log(req.approver_email);
    });
});

router.post('/sendClaimeeSubmittedEmail', function(req,res) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'cpsc319test@gmail.com',
      pass: 'ubccpsc319'
    }
  });
  let mailOptions = {
    from: '"Coast Capital Management" <cpsc319test@gmail.com>', // sender address
    to: 'cpsc319test@gmail.com', // list of receivers {req.body.claimee_email.email}
    subject: 'Hello ' + req.user.first_name + " " + req.user.last_name , // Subject line
    text: "Your claim has been submitted to " + req.user.manager_name + ". Your email has been sent to "
    + req.body.approver_email.email, // plain text body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send(500);
      console.log("didn't send");
      return console.log(error);
    }
    else
      console.log('Message sent: %s', info.messageId);
    console.log("break");
    console.log(req.body);
    console.log(req.approver_email);
  });
});

router.post('/sendClaimeeForwardedEmail', function(req,res) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'cpsc319test@gmail.com',
      pass: 'ubccpsc319'
    }
  });
  let mailOptions = {
    from: '"Coast Capital Management" <cpsc319test@gmail.com>', // sender address
    to: 'cpsc319test@gmail.com', // list of receivers {req.body.claimee_email.email}
    subject: 'Hello ' + req.body.claimee_email, // Subject line
    text: "Your claim has been forwarded to " + req.body.approver_email.email + ". Your email has been sent to "
    + req.body.approver_email.email, // plain text body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send(500);
      console.log("didn't send");
      return console.log(error);
    }
    else
      console.log('Message sent: %s', info.messageId);
    console.log("break");
    console.log(req.body);
    console.log(req.body.approver_email);
  });
});

router.post('/sendClaimeeApprovedEmail', function(req,res) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'cpsc319test@gmail.com',
      pass: 'ubccpsc319'
    }
  });
  let mailOptions = {
    from: '"Coast Capital Management" <cpsc319test@gmail.com>', // sender address
    to: 'cpsc319test@gmail.com', // list of receivers {req.body.claimee_email.email}
    subject: 'Hello ' + req.body.claimee_email, // Subject line
    text: "Your claim has been approved by " + req.body.approver_email // plain text body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send(500);
      console.log("didn't send");
      return console.log(error);
    }
    else
      console.log('Message sent: %s', info.messageId);
    console.log("break");
    console.log(req.body);
    console.log(req.approver_email);
  });
});

router.post('/sendClaimeeDeclinedEmail', function(req,res) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'cpsc319test@gmail.com',
      pass: 'ubccpsc319'
    }
  });
  let mailOptions = {
    from: '"Coast Capital Management" <cpsc319test@gmail.com>', // sender address
    to: 'cpsc319test@gmail.com', // list of receivers {req.body.claimee_email.email}
    subject: 'Hello ' + req.body.claimee_email, // Subject line
    text: "Your claim has been declined by " + req.body.approver_email // plain text body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send(500);
      console.log("didn't send");
      return console.log(error);
    }
    else
      console.log('Message sent: %s', info.messageId);
    console.log("break");
    console.log(req.body);
    console.log(req.approver_email);
  });
});

router.post('/sendNewApproverEmail', function(req,res) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'cpsc319test@gmail.com',
      pass: 'ubccpsc319'
    }
  });
  let mailOptions = {
    from: '"Coast Capital Management" <cpsc319test@gmail.com>', // sender address
    to: 'cpsc319test@gmail.com', // list of receivers:{req.body.approver_email}
    subject: 'Hello ' + req.body.approver_email.email, // Subject line
    text: "You have been forwarded a claim belonging to " + req.body.claimee_email, // plain text body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send(500);
      console.log("didn't send");
      return console.log(error);
    }
    else
      console.log('Message sent: %s', info.messageId);
    console.log("break");
    console.log(req.body);
    console.log(req.body.approver_email);
  });
});

router.post('/sendApproverEmail', function(req,res) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'cpsc319test@gmail.com',
      pass: 'ubccpsc319'
    }
  });
  let mailOptions = {
    from: '"Coast Capital Management" <cpsc319test@gmail.com>', // sender address
    to: 'cpsc319test@gmail.com', // list of receivers:{req.body.approver_email.email}
    subject: 'Hello ' + req.user.manager_name, // Subject line
    text: "You have received a claim from " + req.user.first_name + " " + req.user.last_name +
    " awaiting your action. Their email is " + req.body.claimee_email.email, // plain text body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send(500);
      console.log("didn't send");
      return console.log(error);
    }
    else
      console.log('Message sent: %s', info.messageId);
    console.log("break");
    console.log(req.body);
    console.log(req.approver_email);
  });
});

module.exports = router;