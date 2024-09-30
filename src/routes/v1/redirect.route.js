const express = require('express');
const redirectController = require('../../controllers/redirect.controller');

const router = express.Router();

router.get('/:slug', redirectController.redirectToOriginalUrl);

module.exports = router;
