const express = require('express');
const mysql = require('mysql');
const path = require('path');
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

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'login.html'));
});

app.get('/manage-orders', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'manage-orders.html'));
});

app.get('/modify-website', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'modify-website.html'));
});

//Connect external file for modify-services
app.get('/modify-services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'modify-services.html'));
});

app.get('/offered-services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'offered-services.html'));
});

/**
 * 
 * Services Access
 * 
*/
// Get all services
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

// Add new service
app.post('/add-service', (req, res) => {
    const { name, price, description, image} = req.body;
    const query = 'INSERT INTO Services (name, price, description, image) VALUES (?, ?, ?, ?)';
    db.query(query, [name, price, description, image], (err, result) => {
        if (err) {
            console.error('Error adding service: ', err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

// Edit service
app.post('/edit-service', (req, res) => {
    const { id, name, price, description, image } = req.body;
    const query = 'UPDATE Services SET name = ?, price = ?, description = ?, image = ? WHERE id = ?';
    db.query(query, [name, price, description, image, id], (err, result) => {
        if (err) {
            console.error('Error updating service: ', err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

// Delete service
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


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});