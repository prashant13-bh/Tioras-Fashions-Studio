# TioraS Fashions Studio 🧵✨

> **Premium Custom Apparel | Zero-Trust Secure Platform**

TioraS Fashions Studio is a high-end e-commerce platform specializing in premium embroidery and custom printing. Built with **Next.js 14**, **Tailwind CSS**, and **PocketBase**, it features a sophisticated "Zero Trust" security architecture and a simplified, user-friendly customization workflow.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![PocketBase](https://img.shields.io/badge/PocketBase-v0.25-blue?logo=pocketbase)](https://pocketbase.io/)
[![License](https://img.shields.io/badge/License-Proprietary-red)](#)

---

## 🌟 Key Features

### 🎨 Seamless Customization
- **File Upload Flow**: Replaces complex design studios with a simple drag-and-drop system.
- **Customization Types**: Support for both **DTG Printing** and **Premium Embroidery**.
- **Placement Notes**: Customers can specify exactly where they want their designs.

### 🛡️ Zero-Trust Security
- **AES-256-GCM Encryption**: Sensitive customer data (names, addresses, phone numbers) is encrypted at the application level before being stored.
- **JWT Authentication**: Secure, short-lived tokens with refresh logic.
- **XSS Sanitization**: Robust input cleaning on all public-facing API routes.

### 💎 Premium UX/UI
- **Modern Aesthetic**: Deep Royal Blue & Gold theme with smooth Framer Motion animations.
- **Mobile-First**: Fully responsive design optimized for mobile shopping.
- **Fast Performance**: Static generation and optimized image loading.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, Framer Motion, Lucide Icons.
- **Styling**: Tailwind CSS, shadcn/ui.
- **Backend**: Next.js API Routes (Serverless).
- **Database**: PocketBase (via PocketHost.io).
- **Payments**: Razorpay (India).
- **Communication**: Integrated WhatsApp Business floating chat.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/prashant13-bh/Tioras-Fashions-Studio.git
cd Tioras-Fashions-Studio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root and fill in the following:

```env
# PocketBase
NEXT_PUBLIC_POCKETBASE_URL=https://your-app.pockethost.io

# Hostinger Ecommerce API
NEXT_PUBLIC_ECOMMERCE_API_URL=https://api-ecommerce.hostinger.com
NEXT_PUBLIC_ECOMMERCE_STORE_ID=your_store_id

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# Security (Zero Trust)
ENCRYPTION_KEY=64_character_hex_key
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

### 4. Run Development Server
```bash
npm run dev
```

---

## 📦 Deployment (Hostinger)

This project is optimized for **Hostinger Business/Node.js** hosting:

1. Connect your GitHub repository to Hostinger hPanel.
2. Set the Application Root to `/`.
3. Add all environment variables in the Hostinger dashboard.
4. Run `npm run build` followed by `npm start`.

---

## 📜 License

**Proprietary License**  
Copyright (c) 2024 TioraS Fashions Studio. All rights reserved.  
Unauthorized copying, modification, or distribution is strictly prohibited. See the [LICENSE](LICENSE) file for details.

---

## 📞 Support

For any technical issues or business inquiries, contact us:
- **Email**: tyoras9686@gmail.com
- **Phone**: +91 7353676454
- **WhatsApp**: [Chat Now](https://wa.me/917353676454)
