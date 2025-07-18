# 🏨 CampusBite - Hostel Management System

**Live Site URL:** [https://campusbite-3dd62.web.app](https://campusbite-3dd62.web.app)  
**Admin Login Email:** admin@gmail.com  
**Admin Password:** 123456

---

## 🌟 Overview

CampusBite is a full-stack **Hostel Management System** designed for universities to efficiently manage student meals, reviews, and premium subscriptions. Built with the **MERN Stack**, it streamlines admin and student workflows with responsive design and real-time interactions.

---

## 🚀 Key Features

✅ **User Roles and Authentication**  
- Login/Register with email & social login  
- Persistent login using JWT  
- Role-based dashboard for Admin and Users  

✅ **Meal Management**  
- Admins can add, update, delete, and publish meals  
- Upcoming Meals with like-based publishing logic  
- Students can request meals and post reviews  

✅ **Stripe Integration**  
- Purchase premium badges (Silver, Gold, Platinum)  
- Checkout page with secure Stripe payment gateway  
- Payment history tracking  

✅ **Real-Time Notifications**  
- SweetAlerts and toast notifications for all actions  
- No default browser alerts used  

✅ **Advanced Search & Filtering**  
- Server-side filtering by category, price, and full-text search  
- Server-side pagination and infinite scroll on meals  

✅ **Admin Dashboard**  
- Manage Users with admin promotion  
- View and delete reviews, serve requested meals  
- Add and publish upcoming meals via modal form  

✅ **User Dashboard**  
- My Profile, Requested Meals, My Reviews, and Payment History  
- Cancel requests or edit/delete reviews  

✅ **Fully Responsive Design**  
- Optimized for mobile, tablet, and desktop  
- Responsive admin & user dashboard  

✅ **Modern Tech Stack**  
- MERN: MongoDB, Express.js, React.js, Node.js  
- Tailwind CSS, DaisyUI, TanStack Query, React Hook Form, Stripe  
- Lottie, Framer Motion, Toastify, SweetAlert2, etc.

✅ **Secure and Clean Code**  
- Environment variables hidden via `.env`  
- Interceptor with Axios for secure API calls  

---

## 🧰 Tech Stack

- **Frontend**: React, TailwindCSS, DaisyUI, React Router, Stripe, Axios  
- **Backend**: Node.js, Express.js, MongoDB, JWT  
- **Authentication**: Firebase Auth  
- **State Management**: React Query  
- **Payment**: Stripe  
- **Form Handling**: React Hook Form  
- **Notifications**: React Hot Toast, SweetAlert2  
- **Image Hosting**: ImgBB  

---

## 🛠️ Project Setup

### 🔹 Client Side

```bash
cd client
npm install
npm run dev
