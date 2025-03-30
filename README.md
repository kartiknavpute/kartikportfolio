
# Kartik Navpute Portfolio

This is a personal portfolio website for Kartik Navpute.

## Project info

**URL**: https://kartiknavpute.github.io/Portfolio

## How to Deploy to GitHub Pages

Since we can't modify package.json directly, follow these manual steps to deploy:

1. Create a repository named "Portfolio" on GitHub
2. Push your code to that repository
3. Build the project using:
   ```sh
   npm run build
   ```
4. Create a new branch called `gh-pages`:
   ```sh
   git checkout -b gh-pages
   ```
5. Move the contents of `dist` folder to the root:
   ```sh
   # On Linux/Mac
   cp -r dist/* .
   
   # On Windows
   xcopy dist\* . /E /Y
   ```
6. Add, commit, and push the changes to the gh-pages branch:
   ```sh
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```
7. Go to your repository settings on GitHub:
   - Navigate to "Pages"
   - Set "Source" to "Deploy from a branch"
   - Select the "gh-pages" branch and save

Your site will be published at `https://kartiknavpute.github.io/Portfolio`

## Alternatively, use GitHub Actions for Automated Deployment

You can set up GitHub Actions for automated deployment. Create a new file `.github/workflows/deploy.yml` in your repository with the following content:

```yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install Dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
          branch: gh-pages
```

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd Portfolio

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
