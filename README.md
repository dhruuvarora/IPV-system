# 🚀 IPV-System (In-Person Verification System)

A real-time identity verification system using **WebSockets** and **QR-based authentication**.

## 🔹 Overview
The **IPV-System** allows users to **capture their photo for verification**. If the user's **laptop camera is unavailable**, a **QR code is generated**, which can be scanned via mobile. This enables users to **capture their image through mobile**, and the system **instantly transfers the image to the laptop using WebSockets**.

## 🔹 Features
✅ **Live Photo Capture** – Users can take a photo using their laptop camera.  
✅ **QR-Based Mobile Capture** – If the laptop camera is unavailable, a QR code is generated.  
✅ **Secure Hashing & Redis Storage** – User details (email & phone number) are **hashed and stored in Redis** before generating the QR link.  
✅ **Real-Time Image Transfer** – WebSockets ensure **instant image transfer** from mobile to the laptop.  

## 🔹 Tech Stack
- **Backend:** Node.js, Express.js  
- **Frontend:** EJS, HTML, CSS, JavaScript  
- **Database:** PostgreSQL, Redis  
- **Real-Time Communication:** WebSockets (Socket.io)  
- **QR Code Generation:** QR Code API  

## 🔹 How It Works
1. **User enters email & phone number** – The system **hashes** and **stores** them in Redis.
2. **QR Code Generation** – A secure link is generated from the hashed data and turned into a QR code.
3. **User scans the QR code on mobile** – Redirects to a capture page.
4. **User takes a photo on mobile** – The captured image is **instantly transferred to the laptop** via **WebSockets**.
5. **Verification Process** – The image is stored in **PostgreSQL** for validation.

## 🔹 Installation & Setup
```sh
# Clone the repository
git clone https://github.com/yourusername/IPV-System.git
cd IPV-System

# Install dependencies
npm install

# Start Redis (Ensure Redis is running on your system)
redis-server

# Start the server
node index.js
