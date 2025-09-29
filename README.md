# CLORIT - Carbon Credit & Blue Carbon Restoration Platform

A comprehensive platform for carbon credit management, blue carbon restoration projects, and sustainability tracking.

## 🚀 Quick Start & Deployment

### Vercel Deployment Instructions

1. **Prerequisites**: Ensure your project builds successfully locally
2. **Environment Variables**: Add to your Vercel project settings:
   ```
   EXAMPLE_NAME=I9JU23NF394R6HH
   ```

3. **Deployment Settings**:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install --legacy-peer-deps`
   - Root Directory: `./`

### 🔐 Demo Login Credentials

**Corporate Buyer**: buyer@company.com  
**Community**: community@example.com  
**NGO**: ngo@example.com  
**Panchayat**: panchayat@example.com  
**Password**: any

## Local Development

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies (with legacy peer deps for compatibility)
npm install --legacy-peer-deps

# Step 4: Start the development server
npm run dev

# Build for production
npm run build
```

## 🛠️ Troubleshooting Vercel Deployment

### Common Issues Fixed:
- ✅ React Three.js dependency conflicts resolved
- ✅ TypeScript interface naming issues fixed  
- ✅ Corporate buyer authentication added
- ✅ Build optimization configured

### If Build Fails:
1. Use `npm install --legacy-peer-deps` 
2. Check all TypeScript errors are resolved
3. Verify environment variables are set

## Project Features

- **Role-based Dashboards**: Community, NGO, Panchayat, Corporate Buyer access
- **Blue Carbon Management**: Site monitoring, restoration tracking  
- **Carbon Credit Marketplace**: Trading platform for verified credits
- **Real-time Analytics**: Impact tracking and sustainability reporting

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/63bf6012-aa3e-415c-b18e-675d1ba5f106) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
