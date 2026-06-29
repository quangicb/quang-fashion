# QUANG FASHION — Luxury Fashion Website

A high-end luxury fashion showcase website built with Node.js + Express + EJS.

## Tech Stack
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Template Engine:** EJS
- **Fonts:** Google Fonts (Playfair Display, Inter, Cormorant Garamond)
- **Images:** Unsplash (replace with actual brand photography)

## Pages
- `/` — Homepage (Hero, Collections Preview, Brand Story, Lookbook Preview)
- `/collections` — All Collections Grid
- `/collections/:id` — Collection Detail with Gallery
- `/lookbook` — Full Masonry Lookbook
- `/about` — Brand Story, Timeline, Team
- `/contact` — Contact Form

## Language Support
Add `?lang=vi` or `?lang=en` to any URL to switch language.

## Local Development

```bash
npm install
npm run dev     # with auto-reload (nodemon)
# or
npm start       # production
```

Open http://localhost:3000

## Deploy to Hostinger

### Option 1: Hostinger VPS (Recommended)

1. **Purchase** a Hostinger VPS plan (KVM 2 or higher recommended)
2. **Connect** via SSH: `ssh root@YOUR_SERVER_IP`
3. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
4. **Install PM2** (process manager):
   ```bash
   npm install -g pm2
   ```
5. **Clone your repo:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/quang-fashion.git
   cd quang-fashion
   npm install --production
   ```
6. **Start with PM2:**
   ```bash
   pm2 start server.js --name "quang-fashion"
   pm2 startup
   pm2 save
   ```
7. **Setup Nginx reverse proxy:**
   ```nginx
   server {
     listen 80;
     server_name yourdomain.com www.yourdomain.com;
     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```
8. **SSL with Certbot:**
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

### Option 2: Hostinger Shared Hosting (Node.js App)

1. Go to **hPanel → Websites → Node.js**
2. Set **Application Root:** `/public_html/quang-fashion`
3. Set **Application URL:** your domain
4. Set **Application Startup File:** `server.js`
5. Upload files via File Manager or Git
6. Click **Run NPM Install**
7. Click **Restart**

## Environment Variables

Create a `.env` file for production:
```
PORT=3000
NODE_ENV=production
```

## GitHub Setup

```bash
git init
git add .
git commit -m "Initial commit: QUANG FASHION luxury website"
git remote add origin https://github.com/YOUR_USERNAME/quang-fashion.git
git branch -M main
git push -u origin main
```

## Customization

- **Images:** Replace Unsplash URLs in `server.js` with actual brand photography
- **Content:** Update `siteData` object in `server.js`
- **Colors:** Edit CSS variables in `public/css/style.css` (`:root` section)
- **Logo:** Add `public/images/logo.svg` and update nav partial

---

© 2025 QUANG FASHION. All rights reserved.
