# Deployment Guide

## 🚀 Heroku Backend Deployment

### 1. Prerequisites
- Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
- Have a Heroku account
- MongoDB Atlas database ready

### 2. Create Heroku App
```bash
heroku create your-app-name-backend
```

### 3. Set Root Directory (Important!)
Since we're using the Backend folder as root:
1. Go to Heroku Dashboard → Your App → Settings
2. Set **Root Directory** to `Backend` 
3. Or use Heroku CLI:
```bash
heroku config:set PROJECT_PATH=Backend
```

### 4. Set Environment Variables in Heroku
Go to Heroku Dashboard → Your App → Settings → Config Vars and add:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp
JWT_SECRET=your_super_secure_jwt_secret_key_here
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_APP_PASSWORD=your_gmail_app_password
FRONTEND_URL=https://your-frontend.vercel.app
```

### 5. Deploy to Heroku
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

**Note**: Since Backend is set as root, Heroku will automatically find the `Procfile` and `package.json` in the Backend folder.

### 6. Enable Auto-Deployment
1. Go to Heroku Dashboard → Deploy tab
2. Connect to GitHub
3. Enable automatic deploys from main branch

---

## 🎯 Vercel Frontend Deployment

### 1. Prerequisites
- Have a Vercel account
- Connect your GitHub repository

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` ← **Important: Set this to frontend folder**
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

**Note**: By setting Root Directory to `frontend`, Vercel will treat the frontend folder as the project root and ignore other folders.

### 3. Set Environment Variables in Vercel
Go to Vercel Dashboard → Project → Settings → Environment Variables:

```
VITE_API_URL=https://your-heroku-app.herokuapp.com/api
NODE_ENV=production
```

### 4. Auto-Deployment
Vercel automatically sets up GitHub integration. Every push to main branch triggers deployment.

---

## 🔧 Post-Deployment Updates

### 1. Update CORS Origins
After getting your Vercel URL, update `Backend/server.js`:

```javascript
const corsOptions = {
  origin: [
    'https://your-actual-frontend.vercel.app', // Replace with actual URL
    'http://localhost:5173', // Keep for development
  ],
  credentials: true,
};
```

### 2. Update Environment Variables
Replace placeholder URLs with actual deployment URLs:

**Heroku Config Vars:**
```
FRONTEND_URL=https://your-actual-frontend.vercel.app
```

**Vercel Environment Variables:**
```
VITE_API_URL=https://your-actual-backend.herokuapp.com/api
```

### 3. Test Deployment
- Frontend: `https://your-frontend.vercel.app`
- Backend: `https://your-backend.herokuapp.com`
- Backend Health Check: `https://your-backend.herokuapp.com/`

---

## 📁 File Structure for Deployment

```
To-Do/
├── Backend/                 # ← Heroku Root Directory
│   ├── Procfile            # ← Heroku process file
│   ├── package.json        # ← Heroku package.json with engines
│   ├── server.js           # ← Entry point
│   └── ...other files
├── frontend/               # ← Vercel Root Directory  
│   ├── package.json        # ← Vercel package.json
│   ├── vite.config.js      # ← Build configuration
│   ├── vercel.json         # ← Vercel routing config
│   └── ...other files
└── package.json           # ← Development only
```

### Deployment Configuration:

**Heroku Settings:**
- Root Directory: `Backend`
- Buildpack: Node.js (auto-detected)
- Process: `web: node server.js` (from Backend/Procfile)

**Vercel Settings:**
- Root Directory: `frontend`
- Framework: Vite (auto-detected)
- Build Command: `npm run build`
- Output Directory: `dist`

---

## 📝 Deployment Checklist

**Heroku Setup:**
- [ ] Backend/Procfile created
- [ ] Backend/package.json updated with engines
- [ ] Heroku root directory set to `Backend`
- [ ] Environment variables set in Heroku Config Vars
- [ ] MongoDB Atlas connection string ready

**Vercel Setup:**
- [ ] Vercel root directory set to `frontend`
- [ ] Frontend API URLs configured for production
- [ ] Environment variables set in Vercel dashboard
- [ ] vercel.json routing configured

**General:**
- [ ] Backend server updated for production (CORS, health check)
- [ ] GitHub repository connected to both services
- [ ] Auto-deployment enabled
- [ ] SSL certificates working (automatic)
- [ ] API endpoints accessible from frontend

---

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Errors**: Update CORS origins in backend
2. **API Connection Failed**: Check VITE_API_URL environment variable
3. **Build Failures**: Check build logs in deployment dashboards
4. **Database Connection**: Verify MongoDB Atlas connection string

### Logs:
- **Heroku**: `heroku logs --tail`
- **Vercel**: Check deployment logs in Vercel dashboard
