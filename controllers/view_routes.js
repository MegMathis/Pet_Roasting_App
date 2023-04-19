const router = require("express").Router();

router.get("/", async (req, res) => {
  const test = await res.send("Hello!");
});

module.exports = router;
