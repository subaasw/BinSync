# BinSync – Community Waste Management System

BinSync is a simple and user-friendly community waste management app. It helps local communities organize waste pickups, report issues, stay updated with notifications, and manage user information. Admins get a clean dashboard with charts (powered by Recharts), community tools, and full system control.

This repository contains two main parts:

- **api/** – Node.js + Express + MongoDB backend  
- **app/** – React + React Router + shadcn/ui frontend  

---

### Preview Video

[Watch the video](https://youtu.be/v6xIxguT3LA)

---


## 🚀 Tech Stack

### Backend
- Node.js (Express)
- MongoDB
- JWT Authentication
- bcryptjs
- cookie-parser
- cors
- nodemon

### Frontend
- React.js
- React Router
- shadcn/ui
- Tailwind CSS
- Recharts (for dashboard charts & reports)
- pnpm

---

## 👥 User Roles

### 1. Community Members
Can schedule pickups, report issues, view history, manage their profile, and receive notifications.

### 2. Admin
Can manage communities, users, issues, pickups, and view dashboard statistics.

---

## 🌟 Features

### Community Member Features
- 🗑 **Schedule Pickup** (date, time, waste type, notes)  
- 🛠 **Report Issues** (with GPS location + optional images)  
- 📜 **Pickup History** with filters  
- 🔔 **Notifications** for events/actions  
- 👤 **Profile Update**

### Admin Features
- 🧩 Manage **Communities** (add, edit, delete)  
- 🗑 Manage **Pickups**  
- 🚨 Manage **Issues**  
- 👥 Manage **Users**  
- 📊 Dashboard + Reports (Recharts visualizations)

---

## 🧭 Location + Image Upload
- Uses browser geolocation (Lat/Lng)
- Supports multiple image uploads for reporting

---

## 📂 Project Structure
```
BinSync/
├── README.md
├── api/
│   ├── .env.sample
│   ├── .gitignore
│   ├── package.json
│   ├── pnpm-lock.yaml
│   └── src/
│       ├── configs/
│       │   ├── db.js
│       │   └── index.js
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── base64ImageUploader.js
│       │   ├── communityController.js
│       │   ├── notificationsController.js
│       │   ├── pickupRequestController.js
│       │   ├── reportsController.js
│       │   ├── uploader.js
│       │   └── userController.js
│       ├── events/
│       │   ├── notificationEvents.js
│       │   └── notificationService.js
│       ├── middleware/
│       │   └── authenticate.js
│       ├── models/
│       │   ├── adminModel.js
│       │   ├── communityModel.js
│       │   ├── notificationModel.js
│       │   ├── pickupRequestModel.js
│       │   ├── reportModel.js
│       │   └── userModel.js
│       ├── routes/
│       │   ├── adminRoutes.js
│       │   ├── authRoutes.js
│       │   ├── index.js
│       │   └── userRoutes.js
│       ├── server.js
│       └── utils/
│           ├── cookies.js
│           ├── jwt.js
│           ├── password.js
│           └── validation.js
└── app/
    ├── .env.sample
    ├── .gitignore
    ├── components.json
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── pnpm-lock.yaml
    ├── public/
    │   ├── fonts/
    │   │   └── InterVariable.woff2
    │   └── vite.svg
    ├── src/
    │   ├── App.tsx
    │   ├── assets/
    │   │   └── react.svg
    │   ├── components/
    │   │   ├── Header/
    │   │   │   ├── AdminHeader.tsx
    │   │   │   └── UserHeader.tsx
    │   │   └── ui/
    │   │       ├── avatar.tsx
    │   │       ├── badge.tsx
    │   │       ├── button.tsx
    │   │       ├── calendar.tsx
    │   │       ├── card.tsx
    │   │       ├── checkbox.tsx
    │   │       ├── dialog.tsx
    │   │       ├── dropdown-menu.tsx
    │   │       ├── input.tsx
    │   │       ├── label.tsx
    │   │       ├── popover.tsx
    │   │       ├── radio-group.tsx
    │   │       ├── select.tsx
    │   │       ├── sheet.tsx
    │   │       ├── sonner.tsx
    │   │       ├── table.tsx
    │   │       ├── tabs.tsx
    │   │       └── textarea.tsx
    │   ├── context/
    │   │   ├── AdminAuthContext.tsx
    │   │   └── UserAuthContext.tsx
    │   ├── hooks/
    │   │   └── use-mobile.tsx
    │   ├── index.css
    │   ├── lib/
    │   │   └── utils.ts
    │   ├── main.tsx
    │   ├── pages/
    │   │   ├── 404Page.tsx
    │   │   ├── __tests__/
    │   │   │   ├── 404page.test.tsx
    │   │   │   ├── LoginPage.test.tsx
    │   │   │   └── admin-login.test.tsx
    │   │   ├── admin-login.tsx
    │   │   ├── admin/
    │   │   │   ├── communities/
    │   │   │   │   ├── add-community.tsx
    │   │   │   │   ├── edit-community.tsx
    │   │   │   │   ├── index.tsx
    │   │   │   │   ├── loading.tsx
    │   │   │   │   └── view-members.tsx
    │   │   │   ├── index.tsx
    │   │   │   ├── issues.tsx
    │   │   │   ├── layout.tsx
    │   │   │   ├── notifications.tsx
    │   │   │   ├── pickups.tsx
    │   │   │   ├── profile.tsx
    │   │   │   ├── reports.tsx
    │   │   │   └── users.tsx
    │   │   ├── login.tsx
    │   │   ├── register.tsx
    │   │   └── user/
    │   │       ├── index.tsx
    │   │       ├── layout.tsx
    │   │       ├── notifications.tsx
    │   │       ├── pickup-history.tsx
    │   │       ├── profile.tsx
    │   │       ├── report-issues.tsx
    │   │       └── schedule-pickup.tsx
    │   ├── routes.tsx
    │   ├── types/
    │   │   └── serverCall.ts
    │   ├── utils/
    │   │   ├── adminAuth.ts
    │   │   ├── apiConstant.ts
    │   │   ├── base64Image.ts
    │   │   ├── localStorage.ts
    │   │   ├── serverCall.ts
    │   │   └── userAuth.ts
    │   └── vite-env.d.ts
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    ├── vitest.config.ts
    └── vitest.setup.ts
```

---

## 🔐 Environment Variables

### Backend `.env.sample`
```
MANGODB_URI=
MANGODB_DBNAME=
JWT_SECRET=
PORT=

SUPER_ADMIN_EMAIL=
SUPER_ADMIN_PASS=
```

### Frontend `.env.sample`
```
VITE_API_URL=
```

---

## 🛠 Running Locally

### Backend
```bash
cd api
pnpm install
cp .env.sample .env
pnpm run dev
```

### Frontend
```bash
cd app
pnpm install
cp .env.sample .env
pnpm run dev
```
