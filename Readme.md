# 📖 BibleBytes Blog

A simple full-stack blog application built with **Node.js**, **Express**, and **EJS**, allowing users to create, read, update, and delete articles. This project was developed as part of the [Angela Yu Web Development Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/), and refined through personal learning and customization.

---

## ✨ Features

- 📝 Create new blog posts using a simple form
- 📄 View full individual articles
- ✏️ Edit and update existing posts
- ❌ Delete posts with client-side confirmation
- 📧 Contact form with working email integration via Nodemailer
- 📱 Responsive design using Bootstrap 5
- 💾 Data stored locally in `posts.json`
- 🧩 Modular views using EJS partials and layouts
- 🧠 Clean code structure, mobile-friendly navigation, and dynamic page titles

---

## 🛠️ Built With

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [EJS (Embedded JavaScript)](https://ejs.co/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Nodemailer](https://nodemailer.com/)
- [Express-EJS-Layouts](https://www.npmjs.com/package/express-ejs-layouts)

---

## 🧠 What I Learned

- How to build a dynamic Express.js app with server-side rendering
- How to modularize pages with EJS partials and layouts
- How to manage form data and persist it in a JSON file
- How to use Bootstrap for responsive, clean UI
- How to integrate Nodemailer to send emails securely
- How to apply Git and GitHub for project version control

---

## 🚀 How to Run Locally

To run the project locally:

1. Clone the repo
2. Install dependencies with `npm install`
3. Start the app with `node index.js`
4. Open `http://localhost:3000` in your browser

> Optional: To enable the contact form, create a `.env` file with your Gmail credentials.

## 📁 Folder Structure

BibleBytes-Blog/
├── public/ → CSS, images, static files
├── views/
│ ├── partials/ → header.ejs, footer.ejs, layout.ejs
│ ├── blog.ejs → blog listing page
│ ├── post.ejs → single post + edit form
│ └── about.ejs → about page
├── posts.json → data storage
├── index.js → main server file
├── .env → environment variables (ignored)
├── README.md

## 📬 Contact

Have questions, suggestions, or want to connect?

👉 Feel free to send a message directly through the [Contact Form](http://localhost:3000/contact) available in the app.
