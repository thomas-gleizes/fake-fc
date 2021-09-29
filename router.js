const express = require("express");
const crypto = require("crypto");

const router = express.Router();

const UserSchema = require("./schema");

router.post("/verify", async (req, res) => {
  const { id, password } = req.body;
  const user = await UserSchema.findOne({ id: id, password: password });

  if (!user) {
    res.status(404).send();
    return;
  }

  const content = {
    id: crypto
      .createHash("sha256")
      .update(`${user.id}-${user.name}-${user.firstname}`)
      .digest("base64"),
    name: user.name,
    firstname: user.firstname,
    email: user.email,
    phone: user.phone,
  };

  res.send({ success: true, user: content });
});

router.post("/post", async (req, res) => {
  res.send(501);
  return;

  const user = new UserSchema({
    id: "OsfkzAkfksJFke",
    name: "Ladet",
    firstname: "Tanguy",
    phone: "0600000000",
    email: "thomasgleizes34@gmail.com",
    password: "azerty123",
  });

  user.save();

  res.send();
});

module.exports = router;
