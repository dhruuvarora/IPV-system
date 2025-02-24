// // index.js
// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const path = require("path");
// const ipvRoutes = require("./routes/ipvRoutes");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"]
//     }
// });

// // Set view engine
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // Middleware
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true }));

// // Make io accessible to routes
// app.set('io', io);

// // Serve static files
// app.use(express.static(path.join(__dirname, 'public')));

// // Main route
// app.get('/', (req, res) => {
//     res.render('laptopUI');
// });

// // Mobile capture route - IMPORTANT: This needs to be before the API routes
// app.get('/mobile/:token', (req, res) => {
//     res.render('mobileCapture', { token: req.params.token });
// });

// // API routes
// app.use('/api', ipvRoutes);

// // Socket connection
// io.on("connection", (socket) => {
//     console.log("🔗 New WebSocket Connection");

//     socket.on("imageCaptured", (data) => {
//         console.log("📸 Image Received");
//         io.emit("updateLaptopScreen", data);
//     });

//     socket.on("disconnect", () => {
//         console.log("Client disconnected");
//     });
// });

// const PORT = process.env.PORT || 8000;
// server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT} 🚀`);
//     console.log(`Access the application at: http://localhost:${PORT}`);
// });



// **************************************************************************************************************************8

// index.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const ipvRoutes = require("./routes/ipvRoutes");
const { renderMobileCapture } = require("./controllers/ipvController");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Make io accessible to routes
app.set('io', io);

// Main route
app.get('/', (req, res) => {
    res.render('laptopUI');
});

// Mobile capture route - THIS NEEDS TO BE BEFORE THE API ROUTES
app.get('/mobile/:userHash', renderMobileCapture);

// API routes
app.use('/api', ipvRoutes);

// Socket connection
io.on("connection", (socket) => {
    console.log("🔗 New WebSocket Connection");

    socket.on("imageCaptured", (data) => {
        console.log("📸 Image Received");
        io.emit("updateLaptopScreen", data);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
    console.log(`Access the application at: http://localhost:${PORT}`);
});