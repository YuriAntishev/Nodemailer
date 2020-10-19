const express = require('express');
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('welcome to my forma');
})

app.post('/api/feedback', (req, res) => {
    const output =
        `<p>You have a new message</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Surname: ${req.body.surname}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>`;

    let smtpTransport = nodemailer.createTransport({
        host: 'mail.hosting.reg.ru',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'test@egida-taganrog.ru', // generated ethereal user
            pass: '123@bc%'  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: '"Nodemailer Message" <test@egida-taganrog.ru>', // sender address
        to: 'yantyshev@gmail.com', // list of receivers
        subject: 'Node Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
        if (error) {
            res.send(error)
        }
        else {
            res.send('Success')
        }

        smtpTransport.close();
    })

})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`server listening at port ${PORT}`);
})