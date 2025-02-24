
// // controllers/ipvController.js

// const crypto = require("crypto");
// const QRCode = require("qrcode");
// const os = require('os');
// const redisClient = require('../config/redis');

// // Get local IP for QR code
// function getLocalIP() {
//     const interfaces = os.networkInterfaces();
//     for (const name of Object.keys(interfaces)) {
//         for (const interface of interfaces[name]) {
//             if (interface.family === 'IPv4' && !interface.internal) {
//                 return interface.address;
//             }
//         }
//     }
//     return 'localhost';
// }

// exports.generateQRLink = async (req, res) => {
//     try {
//         const { phone, email } = req.body;

//         if (!phone || !email) {
//             return res.status(400).json({ error: "Phone and email are required." });
//         }

//         // Generate unique token
//         const token = crypto.randomBytes(20).toString("hex");
//         const localIP = getLocalIP();
        
//         // Create mobile capture URL
//         const verificationLink = `http://${localIP}:8000/mobile/${token}`;

//         // Generate QR code
//         const qrImage = await QRCode.toDataURL(verificationLink);

//         // Store session in Redis with 15 min expiry
//         await redisClient.setEx(
//             `session:${token}`,
//             900,
//             JSON.stringify({ phone, email, timestamp: Date.now() })
//         );

//         res.json({ 
//             qrImage, 
//             verificationLink,
//             message: "QR Code generated successfully" 
//         });

//     } catch (error) {
//         console.error("QR Generation Error:", error);
//         res.status(500).json({ error: "Failed to generate QR code" });
//     }
// };

// exports.renderMobileCapture = async (req, res) => {
//     try {
//         const { token } = req.params;
        
//         // Verify token exists in Redis
//         const sessionData = await redisClient.get(`session:${token}`);
//         if (!sessionData) {
//             return res.render('error', { 
//                 message: 'Invalid or expired session. Please generate a new QR code.' 
//             });
//         }

//         res.render('mobileCapture', { token });
//     } catch (error) {
//         console.error("Mobile Render Error:", error);
//         res.render('error', { message: 'Failed to load mobile capture page' });
//     }
// };

// exports.handleImageCapture = async (req, res) => {
//     try {
//         const { token } = req.params;
//         const { image } = req.body;

//         // Validate token from Redis
//         const sessionData = await redisClient.get(`session:${token}`);
//         if (!sessionData) {
//             return res.status(404).json({ error: "Session expired or invalid" });
//         }

//         // Emit image to laptop screen
//         req.app.get('io').emit('updateLaptopScreen', { 
//             image,
//             sessionData: JSON.parse(sessionData)
//         });

//         // Delete session after successful capture
//         await redisClient.del(`session:${token}`);

//         res.json({ success: true, message: "Image captured successfully" });
//     } catch (error) {
//         console.error("Image Capture Error:", error);
//         res.status(500).json({ error: "Failed to process image" });
//     }
// };



// ***************************************************************************************************************************************************************************************************************************************************************************************************************************************************


// // controllers/ipvController.js
// const crypto = require("crypto");
// const QRCode = require("qrcode");
// const os = require('os');
// const redisClient = require('../config/redis');

// // Generate hash from email and phone
// function generateHash(email, phone) {
//     return crypto
//         .createHash('sha256')
//         .update(`${email}${phone}${Date.now()}`)
//         .digest('hex');
// }

// // Get local IP for QR code
// function getLocalIP() {
//     const interfaces = os.networkInterfaces();
//     for (const name of Object.keys(interfaces)) {
//         for (const interface of interfaces[name]) {
//             if (interface.family === 'IPv4' && !interface.internal) {
//                 return interface.address;
//             }
//         }
//     }
//     return 'localhost';
// }

// // Initialize session and store user data
// exports.initializeSession = async (req, res) => {
//     try {
//         const { email, phone } = req.body;

//         if (!email || !phone) {
//             return res.status(400).json({ error: "Email and phone are required" });
//         }

//         // Generate unique hash from email and phone
//         const userHash = generateHash(email, phone);
        
//         // Store in Redis with 15 minutes expiry
//         await redisClient.setEx(
//             `user:${userHash}`,
//             900, // 15 minutes
//             JSON.stringify({
//                 email,
//                 phone,
//                 timestamp: Date.now(),
//                 verified: false
//             })
//         );

//         res.json({ 
//             success: true, 
//             userHash,
//             message: "Session initialized successfully"
//         });

//     } catch (error) {
//         console.error("Session Initialization Error:", error);
//         res.status(500).json({ error: "Failed to initialize session" });
//     }
// };

// // Generate QR code using stored hash
// exports.generateQRLink = async (req, res) => {
//     try {
//         const { userHash } = req.params;

//         // Verify hash exists in Redis
//         const userData = await redisClient.get(`user:${userHash}`);
//         if (!userData) {
//             return res.status(404).json({ error: "Invalid or expired session" });
//         }

//         const localIP = getLocalIP();
//         const verificationLink = `http://${localIP}:8000/mobile/${userHash}`;

//         // Generate QR code
//         const qrImage = await QRCode.toDataURL(verificationLink);

//         res.json({ 
//             qrImage, 
//             verificationLink,
//             message: "QR Code generated successfully" 
//         });

//     } catch (error) {
//         console.error("QR Generation Error:", error);
//         res.status(500).json({ error: "Failed to generate QR code" });
//     }
// };

// // Handle image capture from mobile
// exports.handleImageCapture = async (req, res) => {
//     try {
//         const { userHash } = req.params;
//         const { image } = req.body;

//         // Verify hash in Redis
//         const userData = await redisClient.get(`user:${userHash}`);
//         if (!userData) {
//             return res.status(404).json({ error: "Invalid or expired session" });
//         }

//         // Parse user data
//         const userInfo = JSON.parse(userData);

//         // Update verification status
//         userInfo.verified = true;
//         await redisClient.setEx(
//             `user:${userHash}`,
//             900,
//             JSON.stringify(userInfo)
//         );

//         // Emit the image through socket.io
//         req.app.get('io').emit('updateLaptopScreen', { 
//             image,
//             userInfo
//         });

//         res.json({ success: true, message: "Image captured successfully" });

//     } catch (error) {
//         console.error("Image Capture Error:", error);
//         res.status(500).json({ error: "Failed to process image" });
//     }
// };


// *******************************************************************************************************************************************************************************************************************************************************************************************************************************************************


// controllers/ipvController.js
const crypto = require("crypto");
const QRCode = require("qrcode");
const os = require('os');
const redisClient = require('../config/redis');

function generateHash(email, phone) {
    return crypto
        .createHash('sha256')
        .update(`${email}${phone}${Date.now()}`)
        .digest('hex')
        .substring(0, 16); // Make token shorter but still unique
}

function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const interface of interfaces[name]) {
            if (interface.family === 'IPv4' && !interface.internal) {
                return interface.address;
            }
        }
    }
    return 'localhost';
}

// Initialize session
exports.initializeSession = async (req, res) => {
    try {
        const { email, phone } = req.body;

        if (!email || !phone) {
            return res.status(400).json({ error: "Email and phone are required" });
        }

        const userHash = generateHash(email, phone);
        
        // Store initial session data
        await redisClient.setEx(
            `user:${userHash}`,
            900, // 15 minutes
            JSON.stringify({
                email,
                phone,
                timestamp: Date.now(),
                verified: false,
                qrScanned: false
            })
        );

        res.json({ 
            success: true, 
            userHash,
            message: "Session initialized successfully"
        });

    } catch (error) {
        console.error("Session Initialization Error:", error);
        res.status(500).json({ error: "Failed to initialize session" });
    }
};

exports.generateQRLink = async (req, res) => {
    try {
        const { userHash } = req.params;

        // Check if session exists
        const userData = await redisClient.get(`user:${userHash}`);
        if (!userData) {
            return res.status(404).json({ error: "Invalid or expired session" });
        }

        const userInfo = JSON.parse(userData);

        // Check if QR was already scanned and used for capture
        if (userInfo.verified) {
            return res.status(400).json({ 
                error: "QR code has already been used for capture. Please generate a new session." 
            });
        }

        const localIP = getLocalIP();
        // Create mobile capture URL - notice we removed '/api' from the path
        const verificationLink = `http://${localIP}:8000/mobile/${userHash}`;
        const qrImage = await QRCode.toDataURL(verificationLink);

        res.json({ 
            qrImage, 
            verificationLink,
            message: "QR Code generated successfully" 
        });

    } catch (error) {
        console.error("QR Generation Error:", error);
        res.status(500).json({ error: "Failed to generate QR code" });
    }
};

exports.renderMobileCapture = async (req, res) => {
    try {
        const { userHash } = req.params;
        console.log("Rendering mobile capture for hash:", userHash); // Debug log

        // Check if session exists
        const userData = await redisClient.get(`user:${userHash}`);
        if (!userData) {
            return res.render('error', { 
                message: 'Invalid or expired QR code. Please generate a new one.' 
            });
        }

        const userInfo = JSON.parse(userData);

        // If already verified, show error
        if (userInfo.verified) {
            return res.render('error', { 
                message: 'This QR code has already been used for capture. Please generate a new one.' 
            });
        }

        // Mark QR as scanned
        userInfo.qrScanned = true;
        await redisClient.setEx(
            `user:${userHash}`,
            900,
            JSON.stringify(userInfo)
        );

        // Render mobile capture page
        res.render('mobileCapture', { userHash });

    } catch (error) {
        console.error("Mobile Render Error:", error);
        res.render('error', { 
            message: 'An error occurred. Please try again.' 
        });
    }
};

// Handle image capture
exports.handleImageCapture = async (req, res) => {
    try {
        const { userHash } = req.params;
        const { image } = req.body;

        // Verify session exists
        const userData = await redisClient.get(`user:${userHash}`);
        if (!userData) {
            return res.status(404).json({ error: "Session expired or invalid" });
        }

        const userInfo = JSON.parse(userData);

        // Update verification status
        userInfo.verified = true;
        await redisClient.setEx(
            `user:${userHash}`,
            900,
            JSON.stringify(userInfo)
        );

        // Emit the image through socket.io
        req.app.get('io').emit('updateLaptopScreen', { 
            image,
            userInfo: {
                email: userInfo.email,
                phone: userInfo.phone,
                verified: true
            }
        });

        res.json({ success: true, message: "Image captured successfully" });

    } catch (error) {
        console.error("Image Capture Error:", error);
        res.status(500).json({ error: "Failed to process image" });
    }
};