const express = require("express");
const crypto = require("crypto");

const router = express.Router();

const UserSchema = require("./schema");

router.get("/", (req, res) => {
  res.send({
    success: true,
    routes: {
      POST: [
        {
          path: "/verify",
          data: [
            {
              id: "String",
              password: "String",
            },
          ],
        },
      ],
    },
  });
});

router.post("/", async (req, res) => {
  const { id, password } = req.body;
  console.log("> id: ", id ,);

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

module.exports = router;
