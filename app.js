const express = require("express");
const app = express();
const port = 2004;

const {
  loadContact,
  findContact,
  addContact,
  checkDuplicate,
} = require("./utils/contacts.js");
const { body, validationResult, check } = require("express-validator");

// ejs view engine
const ejs = require("ejs");

app.use(express.urlencoded({ extended: true }));

// menggunakan layout ejs
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

// menjalankan ejs view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { title: "HOME PAGE", layout: "layouts/main-layout" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "ABOUT PAGE", layout: "layouts/main-layout" });
});

app.get("/contact", (req, res) => {
  const contacts = loadContact();
  res.render("contact", {
    title: "CONTACT PAGE",
    layout: "layouts/main-layout",
    contacts,
  });
});

app.get("/contact/add", (req, res) => {
  res.render("addContact", {
    title: "Tambah Contact",
    layout: "layouts/main-layout",
  });
});

app.post(
  "/contact",
  check("noHP", "Nomor HP tidak valid").isMobilePhone("id-ID"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("addContact", {
        title: "Form Tambah Data",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      res.redirect("/contact");
    }
  }
);

app.get("/contact/:nama", (req, res) => {
  const paramsContact = req.params.nama;
  const contact = findContact(paramsContact);
  res.render("detail", {
    title: "Detail Contact",
    layout: "layouts/main-layout",
    paramsContact,
    contact,
  });
});

app.use((req, res) => {
  res.send("<h1>error bro</h1>");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
