const express = require('express');
const mysql = require('mysql');
const path = require('path');
const session = require('express-session');
const { createReadStream } = require('fs');
const app = express();
const PORT = 8000;

// Database connection setup
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "WebDev287" 
});

// Handles error if database is not properly connected
db.connect((err) => {
    if (err) {
        console.log('Error connecting to the database.');
    } else {
        console.log("Connected to the database.");
    }
});

// Set up body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

//Set up the session
app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

// Home page route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'home.html'));
});

// Serve different HTML pages (from the /html folder)
app.get('/admin-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'admin-dashboard.html'));
});

app.get('/admin-customers', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'admin-customers.html'));
});

app.get('/admin-manage-services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'admin-manage-services.html'));
});

app.get('/admin-settings', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'admin-settings.html'));
});

app.get('/client-finance', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'client-finance.html'));
});

app.get('/client-home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'client-home.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'contact.html'));
});

app.get('/display-services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'display-services.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'home.html'));
});

app.get('/login-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'login.html'));
});

app.get('/manage-orders', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'manage-orders.html'));
});

app.get('/modify-website', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'modify-website.html'));
});

app.get('/modify-services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'modify-services.html'));
});

app.get('/offered-services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'offered-services.html'));
});

/**
 * 
 * Using session for the login
 */
app.post('/login', (req,res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM Users WHERE email = ? and password = ?';
    db.query(query, [email, password], (err,results) => {
        if(err){
            console.error('Error logging in: ', err);
            return res.status(500).json({success: false});
        }

        if(results.length > 0){
            const user = results[0];
            req.session.userId = user.id;
            req.session.isAdmin = user.admin === 1;

            //Redirect depending on role
            if(user.admin){
                return res.redirect('/html/admin-dashboard.html');
            }else{
                return res.redirect('/html/client-home.html');
            }
        }else{
            res.status(401).json({messsage: 'Invalid email or password'});
        }
    });
});

//Logout
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            return res.status(500).json({success: false});
        }
        res.redirect('/html/home.html')
    }); 
});

/**
 * 
 * Services Access
 * 
*/
//Get all services
app.get('/services', (req, res) => {
    const query = 'SELECT * FROM Services';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving services from database: ', err);
            return res.status(500).send('Internal Server Error');
        }
        res.json(results);
    });
});

//Add new service
app.post('/add-service', (req, res) => {
    const { name, popular, price, description, image} = req.body;
    const query = 'INSERT INTO Services (name, popular, price, description, image) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, popular, price, description, image], (err, result) => {
        if (err) {
            console.error('Error adding service: ', err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

//Edit service
app.post('/edit-service', (req, res) => {
    const { id, name, popular, price, description, image } = req.body;
    const query = 'UPDATE Services SET name = ?, popular = ?, price = ?, description = ?, image = ? WHERE id = ?';
    db.query(query, [name, popular, price, description, image, id], (err, result) => {
        if (err) {
            console.error('Error updating service: ', err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

//Delete service
app.delete('/delete-service/:id', (req, res) => {
    const serviceId = req.params.id;
    const query = 'DELETE FROM Services WHERE id = ?';
    db.query(query, [serviceId], (err, result) => {
        if (err) {
            console.error('Error deleting service: ', err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

//Extra method to check how many popular service is checked
app.get('/get-popular-services', (req,res) => {
    const query = 'SELECT COUNT(*) AS popularCount FROM Services Where popular = 1';
    db.query(query, (err, results) => {
        if(err){
            console.error('Error getting popular service count');
            return res.status(500).json({ success: false });
        }
        res.json({ success: true, popularCount: results[0].popularCount });
    });
});

/**
 * 
 * Bookings Access
 * 
*/
//Get all booking
app.get('/bookings', (req, res) => {
    const sortBy = req.query.sortBy;
    let query = 'SELECT * FROM Bookings';

    switch (sortBy) {
        case 'name':
            //originally was ORDER BY name but name doesnt exist still need this
            break;
        case 'service':
            query += ' ORDER BY service ASC';
            break;
        case 'oldestDate':
            query += ' ORDER BY date ASC';
            break;
        case 'newestDate':
            query += ' ORDER BY date DESC';
            break;
        case 'price':
            query += ' ORDER BY price ASC';
            break;
        case 'status':
            query += ' ORDER BY status ASC';
            break;
        case 'payment':
            query += ' ORDER BY payment ASC';
            break;
        default:
            break; //no sorting
    }

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching bookings:', err);
            return res.status(500).json({ success: false });
        }
        res.json(results);
    });
});

//Add new booking
app.post('/add-booking', (req, res) => {
    const { id, clientID, service, status, payment, price, date, time} = req.body;
    const query = 'INSERT INTO Bookings (clientID, service, status, payment, price, date, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [clientID, service, status, payment, price, date, time, id], (err, result) => {
        if (err) {
            console.error('Error adding booking: ', err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

//Edit booking
app.post('/edit-booking', (req, res) => {
    const { id, clientID, service, status, payment, price, date, time } = req.body;
    const query = 'UPDATE Bookings SET clientID = ?, service = ?, status = ?, payment = ?, price = ?, date = ?, time = ? WHERE id = ?';
    db.query(query, [clientID, service, status, payment, price, date, time, id], (err, result) => {
        if (err) {
            console.error('Error updating booking: ', err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

//Delete booking
app.delete('/delete-booking/:id', (req, res) => {
    const bookingId = req.params.id;
    const query = 'DELETE FROM Bookings WHERE id = ?';
    db.query(query, [bookingId], (err, result) => {
        if (err) {
            console.error('Error deleting booking: ', err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

//Client-Bookings 
app.get('/client-bookings', (req, res) => {
    //Check if the user is login
    if(!req.session.userId){
        return res.status(401).json({ success: false });
    }

    const clientID = req.session.userId;
    const query = 'SELECT * FROM Bookings WHERE clientID = ?';
    db.query(query, [clientID], (err, results) => {
        if(err){
            console.error('Error fetching client bookings: ', err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

/**
 * 
 * Users Access
 * 
*/
//Get all users
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM Users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving users from database: ', err);
            return res.status(500).send('Internal Server Error');
        }
        res.json(results);
    });
});

//Add new user
app.post('/add-user', (req, res) => {
    const { id, admin, first, last, email, password } = req.body;
    const query = 'INSERT INTO Users (admin, first, last, email, password) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [admin, first, last, email, password, id], (err, result) => {
        if (err) {
            console.error('Error adding user: ', err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

//Edit user
app.post('/edit-user', (req, res) => {
    const { id, admin, first, last, email, password} = req.body;
    const query = 'UPDATE Users SET admin = ?, first = ?, last = ?, email = ?, password = ? WHERE id = ?';
    db.query(query, [admin, first, last, email, password, id], (err, result) => {
        if (err) {
            console.error('Error updating user: ', err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

//Delete user
app.delete('/delete-user/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'DELETE FROM Users WHERE id = ?';
    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error('Error deleting user: ', err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

/**
 * 
 * Website Access
 * 
*/

//Home Page Access
//Get all home page information
app.get('/home-page-info/:id', (req, res) => {
    const { id } = req.params; 
    const query = 'SELECT * FROM HomePage WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error retrieving home page information from database: ', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ message: 'Home page information not found' });
        }
    });
});


//Edit home page information
app.post('/edit-home-page', (req, res) => {
    const { id, name, logo, welcome, hook, why, reason1, description1, reason2, description2, reason3, description3, reason4, description4, backgroundImg, slide1, slide2, slide3, slide4, caption1, caption2, caption3, caption4 } = req.body;
    const query = 'UPDATE HomePage SET name = ?, logo = ?, welcome = ?, hook = ?, why = ?, reason1 = ?, description1 = ?, reason2 = ?, description2 = ?, reason3 = ?, description3 = ?, reason4 = ?, description4 = ?, backgroundImg = ?, slide1 = ?, slide2 = ?, slide3 = ?, slide4 = ?, caption1 = ?, caption2 = ?, caption3 = ?, caption4 = ? WHERE id = ?';
    db.query(query, [name, logo, welcome, hook, why, reason1, description1, reason2, description2, reason3, description3, reason4, description4, backgroundImg, slide1, slide2, slide3, slide4, caption1, caption2, caption3, caption4, id], (err, result) => {
        if (err) {
            console.error('Error updating home page: ', err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

//Contact 
//Get all contact information
app.get('/contact-info/:id', (req, res) => {
    const { id } = req.params; 
    const query = 'SELECT * FROM Contact WHERE id = ?';
    db.query(query,[id], (err, results) => {
        if (err) {
            console.error('Error retrieving contact information from database: ', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ message: 'Contact information not found' });
        }
    });
});

//Edit contact information
app.post('/edit-contact', (req, res) => {
    const { id, description, email, phone, address, city, state, zipcode } = req.body;
    const query = 'UPDATE Contact SET description = ?, email = ?, phone = ?, address = ?, city = ?, state = ?, zipcode = ? WHERE id = ?';
    db.query(query, [description, email, phone, address, city, state, zipcode, id], (err, result) => {
        if (err) {
            console.error('Error updating contact information: ', err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

//Footer Information
//Get all footer information
app.get('/footer-info/:id', (req, res) => {
    const { id } = req.params; 
    const query = 'SELECT * FROM Footer WHERE id = ?';
    db.query(query,[id], (err, results) => {
        if (err) {
            console.error('Error retrieving footer information from database: ', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ message: 'Footer information not found' });
        }
    });
});

//Edit user
app.post('/edit-footer', (req, res) => {
    const { id, aboutUs, facebook, instagram, twitter} = req.body;
    const query = 'UPDATE Footer SET aboutUs = ?, facebook = ?, instagram = ?, twitter = ? WHERE id = ?';
    db.query(query, [aboutUs, facebook, instagram, twitter, id], (err, result) => {
        if (err) {
            console.error('Error updating footer information: ', err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

//Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});