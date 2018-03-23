var nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
// var transporter = nodemailer.createTransport('smtps://'+process.env.SMTP_LOGIN+':'+process.env.SMTP_PASSW+'@smtp.mailgun.org');
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var Employee = require('../models/Employee');
var authMiddleware = require('../middleware/auth.middleware');
var emailMiddleware = require('../middleware/email.middleware');

router.post('/send_claimant_email', [authMiddleware.isLoggedIn], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'cpsc319test@gmail.com',
        pass: 'ubccpsc319'
      }
    });
    
    let claim = req.body.claim;

    let bodyText = '';
    let subjectText = '';
    let claimant_name = claim.claimant_first_name + ' ' + claim.claimant_last_name;
    let approver_name = claim.approver_first_name + ' ' + claim.approver_last_name;

    switch(req.body.action) {
      case "S":
        subjectText = 'Claim Sent for Review';
        bodyText = 'Hello ' + claimant_name + ', ' + 'your claim has been sent to ' + approver_name + ' for review.';
        break;
      case "A":
        subjectText = 'Claim Approved';      
        bodyText = 'Hello ' + claimant_name + ', ' + 'your claim has been approved by ' + approver_name + '.';
        break;
      case "D":
        subjectText = 'Claim Declined';      
        bodyText = 'Hello ' + claimant_name + ', ' + 'your claim has been declined by ' + approver_name + '.';
        break;
      case "F":
        subjectText = 'Claim Forwarded for Review';      
        bodyText = 'Hello ' + claimant_name + ', ' + approver_name + ' has forwarded your claim for further review.';
        break;
      default:
        // skip email sending if an invalid action is passed through
        return;
    }

    let mailOptions = {
      from: '"Coast Capital Expense Claims System" <cpsc319test@gmail.com>', // sender address
      to: 'cpsc319test@gmail.com', // list of receivers {claimant_email}
      subject: subjectText, // Subject line
      text: bodyText // plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500);
        res.send({error: req.error});
      } else {
        // email sent successfully
        res.status(200);
        res.send({});
      }
    });
  }
});

router.post('/send_approver_email', [authMiddleware.isLoggedIn, emailMiddleware.findApproverUser], function(req, res, next) {
  if (req.error != undefined) {
    res.status(500);
    res.send({error: req.error});
  } else {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'cpsc319test@gmail.com',
        pass: 'ubccpsc319'
      }
    });
    
    let claim = req.body.claim;
    let approver = req.approver;

    let bodyText = '';
    let subjectText = '';
    let claimant_name = claim.claimant_first_name + ' ' + claim.claimant_last_name;
    let old_approver_name = claim.approver_first_name + ' ' + claim.approver_last_name;
    let approver_name = approver.first_name + ' ' + approver.last_name;

    switch(req.body.action) {
      case "S":
        subjectText = 'Claim Pending Your Review';
        bodyText = 'Hello ' + approver_name + ', ' + claimant_name + ' has submitted a claim for your review.';
        break;
      case "F":
        subjectText = 'Forwarded Claim Pending Your Review';      
        bodyText = 'Hello ' + approver_name + ', a claim by ' + claimant_name + ' has been forwarded to you for review by ' + old_approver_name + '.';
        break;
      default:
        // skip email sending if an invalid action is passed through
        return;
    }

    let mailOptions = {
      from: '"Coast Capital Expense Claims System" <cpsc319test@gmail.com>', // sender address
      to: 'cpsc319test@gmail.com', // list of receivers {approver_email}
      subject: subjectText, // Subject line
      text: bodyText // plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500);
        res.send({error: req.error});        
      } else {
        // email sent successfully
        res.status(200);
        res.send({});
      }
    });
  }
});

// router.post('/requestEmail', [authMiddleware.isLoggedIn, emailMiddleware.findEmail], function(req, res, next) {
//   if (req.error != undefined) {
//     res.status(500);
//     res.send({error: req.error});
//   } else {
//     res.send({
//       claimant_email: req.claimant_email,
//       approver_email: req.approver_email
//     });
//   }
// });

// router.post('/sendClaimantCreatedEmail', function(req,res) {
//     let transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 465,
//       secure: true,
//       auth: {
//         user: 'cpsc319test@gmail.com',
//         pass: 'ubccpsc319'
//       }
//     });
//     let mailOptions = {
//       from: '"Coast Capital Management" <cpsc319test@gmail.com>', // sender address
//       to: 'cpsc319test@gmail.com', // list of receivers {req.body.claimant_email.email}
//       subject: 'Hello ' + req.user.first_name + " " + req.user.last_name , // Subject line
//       text: "Your claim has been created and will be sent to " + req.user.manager_name + " when submitted. Their email is "
//       + req.body.approver_email.email, // plain text body
//     };
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         res.send(500);
//       }
//       else {

//       }
//     });
// });

// router.post('/sendClaimantSubmittedEmail', function(req,res) {
//   let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: 'cpsc319test@gmail.com',
//       pass: 'ubccpsc319'
//     }
//   });
//   let mailOptions = {
//     from: '"Coast Capital Management" <cpsc319test@gmail.com>', // sender address
//     to: 'cpsc319test@gmail.com', // list of receivers {req.body.claimant_email.email}
//     subject: 'Hello ' + req.user.first_name + " " + req.user.last_name , // Subject line
//     text: "Your claim has been submitted to " + req.user.manager_name + ". Your email has been sent to "
//     + req.body.approver_email.email, // plain text body
//   };
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       res.send(500);
//     }
//     else {
      
//     }
//   });
// });

// router.post('/sendClaimantForwardedEmail', function(req,res) {
//   let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: 'cpsc319test@gmail.com',
//       pass: 'ubccpsc319'
//     }
//   });
//   let mailOptions = {
//     from: '"Coast Capital Management" <cpsc319test@gmail.com>', // sender address
//     to: 'cpsc319test@gmail.com', // list of receivers {req.body.claimant_email.email}
//     subject: 'Hello ' + req.body.claimant_email, // Subject line
//     text: "Your claim has been forwarded to " + req.body.approver_email.email + ". Your email has been sent to "
//     + req.body.approver_email.email, // plain text body
//   };
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       res.send(500);
//     }
//     else {

//     }
//   });
// });

// router.post('/sendClaimantApprovedEmail', function(req,res) {
//   let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: 'cpsc319test@gmail.com',
//       pass: 'ubccpsc319'
//     }
//   });
//   let mailOptions = {
//     from: '"Coast Capital Management" <cpsc319test@gmail.com>', // sender address
//     to: 'cpsc319test@gmail.com', // list of receivers {req.body.claimant_email.email}
//     subject: 'Hello ' + req.body.claimant_email, // Subject line
//     text: "Your claim has been approved by " + req.body.approver_email // plain text body
//   };
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       res.send(500);
//     }
//     else {

//     }
//   });
// });

// router.post('/sendClaimantDeclinedEmail', function(req,res) {
//   let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: 'cpsc319test@gmail.com',
//       pass: 'ubccpsc319'
//     }
//   });
//   let mailOptions = {
//     from: '"Coast Capital Management" <cpsc319test@gmail.com>', // sender address
//     to: 'cpsc319test@gmail.com', // list of receivers {req.body.claimant_email.email}
//     subject: 'Hello ' + req.body.claimant_email, // Subject line
//     text: "Your claim has been declined by " + req.body.approver_email // plain text body
//   };
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       res.send(500);
//     }
//     else {

//     }
//   });
// });

// router.post('/sendNewApproverEmail', function(req,res) {
//   let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: 'cpsc319test@gmail.com',
//       pass: 'ubccpsc319'
//     }
//   });
//   let mailOptions = {
//     from: '"Coast Capital Management" <cpsc319test@gmail.com>', // sender address
//     to: 'cpsc319test@gmail.com', // list of receivers:{req.body.approver_email}
//     subject: 'Hello ' + req.body.approver_email.email, // Subject line
//     text: "You have been forwarded a claim belonging to " + req.body.claimant_email, // plain text body
//   };
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       res.send(500);
//     }
//     else {

//     }
//   });
// });

// router.post('/sendApproverEmail', function(req,res) {
//   let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: 'cpsc319test@gmail.com',
//       pass: 'ubccpsc319'
//     }
//   });
//   let mailOptions = {
//     from: '"Coast Capital Management" <cpsc319test@gmail.com>', // sender address
//     to: 'cpsc319test@gmail.com', // list of receivers:{req.body.approver_email.email}
//     subject: 'Hello ' + req.user.manager_name, // Subject line
//     text: "You have received a claim from " + req.user.first_name + " " + req.user.last_name +
//     " awaiting your action. Their email is " + req.body.claimant_email.email, // plain text body
//   };
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       res.send(500);
//     }
//     else {

//     }
//   });
// });

module.exports = router;