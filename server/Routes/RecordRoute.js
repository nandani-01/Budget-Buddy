const { CreateRecord, GetRecord ,DeleteRecord , UpdateRecord } = require("../Controllers/RecordController");
const {userVerification } = require("../Middlewares/AuthMiddleware");


const router = require("express").Router();

router.post("/" , userVerification , CreateRecord);
router.get("/transactions" , userVerification , GetRecord)
router.delete("/transaction/:id", DeleteRecord);

module.exports = router;