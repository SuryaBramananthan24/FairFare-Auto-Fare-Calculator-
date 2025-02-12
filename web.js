const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {body,validationResult} = require('express-validator');

mongoose.connect(
  '<YourMongoDBURL>tls=true&tlsInsecure=true',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.on('open',()=>{
	console.log("Connected to MongoDB");
});
mongoose.connection.on('error',(err)=>{
	console.log(err);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

app.route('/')
	.get((req,res)=>{
	  res.sendFile(path.join(__dirname,'public','Home.html'));
	});	
app.route('/usl')
	.get((req,res)=>{
	  res.sendFile(path.join(__dirname,'public','usl.html'));
	});
app.route('/usm')
	.get((req,res)=>{
	  res.sendFile(path.join(__dirname,'public','usm.html'));
	});
app.route('/dsm')
	.get((req,res)=>{
	  res.sendFile(path.join(__dirname,'public','dsm.html'));
	});
app.route('/uss')
	.get((req,res)=>{
	  res.sendFile(path.join(__dirname,'public','uss.html'));
	});
app.route('/drs')
	.get((req,res)=>{
	  res.sendFile(path.join(__dirname,'public','drs.html'));
	});
app.route('/drl')
	.get((req,res)=>{
	  res.sendFile(path.join(__dirname,'public','drl.html'));
	});
app.route('/p')
	.get((req,res)=>{
	  res.sendFile(path.join(__dirname,'public','payment.html'));
	});
app.route('/pd')
	.get((req,res)=>{
	  res.sendFile(path.join(__dirname,'public','pd.html'));
	});

app.post('/uss',
    [
        body('email').isEmail().withMessage('Invalid email format'),
        body('phoneno').isNumeric().withMessage('Phone number must be numeric'),
        body('username').notEmpty().withMessage('Username is required'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
        }
        const { email, phoneno, username, password } = req.body;
        bcrypt.hash(password, 10)
            .then(hashedPassword => {
                mongoose.connection.db.collection('uss').insertOne({ email, phoneno, username, password: hashedPassword })
                    .then(result => {
                        console.log(" User - Signup Data inserted on:", result.insertedId);
                        res.redirect('usl'); 
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).send("Error inserting data into the database");
                    });
            })
            .catch(err => {
                console.error('Error hashing password:', err);
                res.status(500).send("Error hashing password");
            });
    }
);

app.post('/drs',
   [
    body('email').isEmail().withMessage('Invalid Email'),
	body('phoneno').isNumeric().withMessage('Invalid Phone No'),
    body('username').notEmpty().withMessage('Provide Username'),
	body('password').isLength({ min: 8 }).withMessage('Password length must be atleast 8'),
	body('autono').isLength({ min : 4 }).withMessage('Auto No length must be atleast 4'),
	],
  (req, res) => {
     const errors = validationResult(req);
        if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
        }
	const {email,phoneno,username,password,autono} = req.body;
	bcrypt.hash(password, 10)
            .then(hashedPassword => {
                mongoose.connection.db.collection('dss').insertOne({ email, phoneno, username, password:hashedPassword,autono })
                    .then(result => {
                        console.log(" Driver-Signup Data inserted on:", result.insertedId);
                        res.redirect('drl'); 
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).send("Error inserting data into the database");
                    });
            })
            .catch(err => {
                console.error('Error hashing password:', err);
                res.status(500).send("Error hashing password");
            });
    }
);
	
app.post('/usl', (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    mongoose.connection.db.collection('uss').findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" }); 
            }
            bcrypt.compare(password, user.password)
                .then(isPasswordValid => {
                    if (!isPasswordValid) {
                        return res.status(401).json({ error: "Invalid password" });
                    }
                    mongoose.connection.db.collection('usl').insertOne({ email, password })
                        .then(result => {
                            console.log("User Login - Data inserted:", result.insertedId);
                            res.redirect('/usm');
                        })
                        .catch(err => {
                            console.error("Error inserting login data:", err);
                            res.status(500).send("Error inserting login data into the database");
                        });
                })
                .catch(err => {
                    console.error('Error comparing passwords:', err);
                    res.status(500).send("Error comparing passwords");
                });
        })
        .catch(err => {
            console.error("Error finding user:", err);
            res.status(500).send("Error finding user in the database");
        });
});

app.post('/drl', (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    mongoose.connection.db.collection('dss').findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" }); 
            }
            bcrypt.compare(password, user.password)
                .then(isPasswordValid => {
                    if (!isPasswordValid) {
                        return res.status(401).json({ error: "Invalid password" }); 
                    }
                    mongoose.connection.db.collection('dsl').insertOne({ email, password })
                        .then(result => {
                            console.log("Driver Login - Data inserted:", result.insertedId);
                            res.redirect('/usm');
                        })
                        .catch(err => {
                            console.error("Error inserting login data:", err);
                            res.status(500).send("Error inserting login data into the database");
                        });
                })
                .catch(err => {
                    console.error('Error comparing passwords:', err);
                    res.status(500).send("Error comparing passwords");
                });
        })
        .catch(err => {
            console.error("Error finding user:", err);
            res.status(500).send("Error finding user in the database");
        });
});


app.post('/usm',(req,res)=>{
	const data = req.body;
	mongoose.connection.db.collection('usm').insertOne(data)
		.then(result =>{console.log('Data inserted Succesful',result.insertedId); res.redirect('/p');})
		.catch(err =>{console.log(err);});
});

app.post('/p',(req,res)=>{
	const data = req.body;
	mongoose.connection.db.collection('pay').insertOne(data)
		.then(result=>{console.log("Data Inserted : ",result.insertedId); res.redirect('/pd');})
		.catch(err =>{console.error(err);});
});

app.listen(5000,()=>{
	console.log("Server running on `http://localhost:5000`");
});
