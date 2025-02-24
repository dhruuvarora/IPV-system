// // routes/ipvRoutes.js

// const express = require("express");
// const router = express.Router();
// const { 
//     generateQRLink, 
//     handleImageCapture,
//     renderMobileCapture 
// } = require("../controllers/ipvController");

// // Generate QR code endpoint
// router.post('/generate-qr', generateQRLink);

// // Mobile capture endpoints
// router.get('/mobile/:token', renderMobileCapture);
// router.post('/capture/:token', handleImageCapture);

// module.exports = router;



// ************************************************************************************************************************************************************************8



// // routes/ipvRoutes.js
// const express = require("express");
// const router = express.Router();
// const { 
//     initializeSession,
//     generateQRLink, 
//     handleImageCapture 
// } = require("../controllers/ipvController");

// // Initialize session with user data
// router.post('/init-session', initializeSession);

// // Generate QR code using hash
// router.get('/generate-qr/:userHash', generateQRLink);

// // Handle image capture
// router.post('/capture/:userHash', handleImageCapture);

// module.exports = router;



// ************************************************************************************************************************************************************************8// ************************************************************************************************************************************************************************8// ************************************************************************************************************************************************************************8



// // routes/ipvRoutes.js
// const express = require("express");
// const router = express.Router();
// const { 
//     initializeSession,
//     generateQRLink,
//     verifyQRCode,
//     handleImageCapture 
// } = require("../controllers/ipvController");

// // Initialize session
// router.post('/init-session', initializeSession);

// // Generate QR code
// router.get('/generate-qr/:userHash', generateQRLink);

// // Mobile capture routes
// router.get('/mobile/:userHash', verifyQRCode);
// router.post('/capture/:userHash', handleImageCapture);

// module.exports = router;



// // routes/ipvRoutes.js
// const express = require("express");
// const router = express.Router();
// const { 
//     initializeSession,
//     generateQRLink,
//     renderMobileCapture,  // Make sure this is imported
//     handleImageCapture 
// } = require("../controllers/ipvController");

// // Initialize session with user data
// router.post('/init-session', initializeSession);

// // Generate QR code using hash
// router.get('/generate-qr/:userHash', generateQRLink);

// // Mobile capture routes
// router.get('/mobile/:userHash', renderMobileCapture);  // This was the issue
// router.post('/capture/:userHash', handleImageCapture);

// module.exports = router;



// routes/ipvRoutes.js
const express = require("express");
const router = express.Router();
const { 
    initializeSession,
    generateQRLink,
    handleImageCapture 
} = require("../controllers/ipvController");

// Initialize session with user data
router.post('/init-session', initializeSession);

// Generate QR code using hash
router.get('/generate-qr/:userHash', generateQRLink);

// Handle image capture
router.post('/capture/:userHash', handleImageCapture);

module.exports = router;