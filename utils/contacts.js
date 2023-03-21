const { log } = require("console");
const fs = require("fs");

// ambil semua data dari contacts.json
const loadContact = (nama, noHP) => {
  const path = "./contacts.json";
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, "[]", "utf-8");
  }

  const readData = fs.readFileSync("./contacts.json", "utf-8");
  const contacts = JSON.parse(readData);
  return contacts;
};

const findContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => nama === contact.nama);
  return contact;
};

const saveContacts = (contacts) => {
  fs.writeFileSync("./contacts.json", JSON.stringify(contacts, null, 4));
};

const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContacts(contacts);
};

// Cek nama yang duplikat
const checkDuplicate = (nana) => {
  const contacts = loadContact();
  return contacts.find((contact) => contact.nama === nama);
};

module.exports = { loadContact, findContact, addContact, checkDuplicate };
