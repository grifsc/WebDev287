const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const PORT = 4000;

// Set up body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/offered-services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'offered-services.html'));
});

// Home page route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'home.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
