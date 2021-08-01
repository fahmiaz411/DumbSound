const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth");
const { uploads } = require("../middlewares/file");

// Auth

const { register, login, checkAuth } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);

// User

const { updateUser } = require("../controllers/user");

router.patch("/edit-profile", auth, uploads("image"), updateUser);

// Music

const {
  addMusic,
  addArtist,
  getArtists,
  getMusics,
} = require("../controllers/music");

router.post("/add-music", auth, uploads("thumbnail", "attache"), addMusic);
router.post("/add-artist", auth, addArtist);
router.get("/artists", auth, getArtists);
router.get("/musics", getMusics);

// Payment

const {
  subscribe,
  getTransactions,
  actionPayment,
  deletePayment,
} = require("../controllers/payment");

router.post("/payment", auth, uploads("attache"), subscribe);
router.get("/transaction", auth, getTransactions);
router.patch("/reject", auth, actionPayment);
router.patch("/aprove", auth, actionPayment);
router.delete("/delete-payment", auth, deletePayment);

module.exports = router;
