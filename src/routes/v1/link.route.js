const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const linkValidation = require('../../validations/link.validation');
const linkController = require('../../controllers/link.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageLinks'), validate(linkValidation.createLink), linkController.createLink)
  .get(auth('getLinks'), validate(linkValidation.getLinks), linkController.getLinks);

router
  .route('/:linkId')
  .get(auth('getLinks'), validate(linkValidation.getLink), linkController.getLink)
  .patch(auth('manageLinks'), validate(linkValidation.updateLink), linkController.updateLink)
  .delete(auth('manageLinks'), validate(linkValidation.deleteLink), linkController.deleteLink);

module.exports = router;
