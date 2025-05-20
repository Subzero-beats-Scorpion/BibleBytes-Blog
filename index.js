import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import nodemailer from "nodemailer";
import expressLayouts from "express-ejs-layouts";
import dotenv from "dotenv";
dotenv.config({ path: "./vlad.env" });

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressLayouts);
app.set("layout", "layout");

app.set("view engine", "ejs");

let posts = [];

/* ============================
   Nodemailer Configuration
   ============================ */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

/* ============================
   Route: Send Message (POST)
   ============================ */
app.post("/send-message", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: "vladvalentinebert@gmail.com",
    subject: `New message from ${name}`,
    text: `
        You have received a new message from BibleBytes Contact Form:
        ----------------------------------------------------------
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("❌ Error sending the message:", error.message);
      res.status(500).send("Error sending message.");
    } else {
      console.log("✅ Email succesfully sent! Answer:", info.response);
      res.redirect("/contact?sent=true");
    }
  });
});

/* ============================
   Helper functions
   ============================ */

// Load posts from JSON file
const loadPosts = () => {
  try {
    const data = fs.readFileSync("posts.json", "utf-8");
    posts = JSON.parse(data);
  } catch (err) {
    console.log("Error loading posts:", err.message);
  }
};

// Save posts to JSON file
const savePosts = () => {
  fs.writeFileSync("posts.json", JSON.stringify(posts, null, 2));
};

/* ============================
   Load initial posts
   ============================ */
loadPosts();

/* ============================
   Route: Home Page
   ============================ */
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

/* ============================
   Route: Blog Page
   ============================ */
app.get("/blog", (req, res) => {
  res.render("blog", { posts, title: "Blog" });
});

/* ============================
   Route: About Page
   ============================ */
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

/* ============================
   Route: Contact Page
   ============================ */
app.get("/contact", (req, res) => {
  const sent = req.query.sent; // Check if was sent from URL
  res.render("contact", { title: "Contact", sent });
});

/* ============================
   Route: Single Post
   ============================ */
app.get("/post/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts[postId];

  if (post) {
    res.render("post", {
      post: { ...post, id: postId },
      title: post.title, // ✅ Send the post title as the page title.
    });
  } else {
    res.status(404).send("Post not found");
  }
});

/* ============================
   Route: Create New Post
   ============================ */
app.post("/blog", (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });
  savePosts(); // Save to JSON
  res.redirect("/blog");
});

/* ============================
   Route: Edit Post
   ============================ */
app.get("/edit/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts[postId];

  if (post) {
    res.render("post", {
      post: { ...post, id: postId },
      title: `Edit: ${post.title}`, // ✅ send title
      editMode: true, //
    });
  } else {
    res.status(404).send("Post not found");
  }
});

/* ============================
   Route: Save Edited Post
   ============================ */
app.post("/edit/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, content } = req.body;

  if (posts[postId]) {
    posts[postId].title = title;
    posts[postId].content = content;
    savePosts(); // save the edit in Json
    res.redirect(`/post/${postId}`);
  } else {
    res.status(404).send("Post not found");
  }
});

/* ============================
   Route: Delete Post
   ============================ */
app.get("/delete/:id", (req, res) => {
  const postId = parseInt(req.params.id);

  if (posts[postId]) {
    posts.splice(postId, 1);
    savePosts(); // Save changes to JSON
    res.redirect("/blog");
  } else {
    res.status(404).send("Post not found");
  }
});

/* ============================
   Start the server
   ============================ */
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
