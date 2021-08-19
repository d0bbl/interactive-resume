const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const MessageModel = require("../models/message.model");


router.get('/', (req, res) => {
    res.render("resumes/index");
});

// process message form
router.post('/', async (req, res) => {

    try {
        const mail = new MessageModel(req.body);
        const data = await mail.save();
        if (data) {
            req.flash("success_msg", "message delivered");
            res.redirect("/resume");
        }

    } catch (err) {
        req.flash("error_msg", "failed to send mail");
        res.redirect("/resume");

    }

});

module.exports = router;
