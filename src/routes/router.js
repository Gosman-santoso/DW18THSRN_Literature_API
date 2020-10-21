const router = express.Router();

const { authenticated: auth } = require("../middleware/authentication");
const { register, login, checkAuth } = require("./../controller/auth");
const { getUsers, getDetail, editUser } = require("../controller/userData");
const {
    getLiterature,
    addLiterature,
    getDetailLiterature,
    getAdmLiterature
} = require("../controller/literaturData");
const {
    getLibrary,
    detailLibrary,
    addLibrary,
    removeLibrary
} = require("./../controller/libraryData");

// User
router.get("/users", auth, getUsers);
router.get("/user/:id", auth, getDetail);
router.patch("/user/:id", auth, editUser);

// Library
router.get("/libraries", auth, getLibrary);
router.get("/library/:id", auth, detailLibrary);
router.post("/libraries", auth, addLibrary);
router.delete("/library/:id", auth, removeLibrary);

// Literature
router.get("/literatures", auth, getLiterature);
router.get("/literature/:id", auth, getDetailLiterature);
router.post("/literatures", auth, addLiterature);
router.get("/AdmLiteratures", auth, getAdmLiterature);

// Auth Login & Register
router.post("/register", register);
router.post("/login", login);
router.get("/auth", auth, checkAuth);

module.exports = router;