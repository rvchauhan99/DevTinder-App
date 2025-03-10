const router = require("express").Router();
router.get("/ab*c", function (req, res) {
    res.send("Fun Routes Called ");
})
router.get("/*fly$/", function (req, res) {
    res.send("Fun Route Fly  ");
})

module.exports = router