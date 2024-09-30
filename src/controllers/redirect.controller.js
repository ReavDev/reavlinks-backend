const httpStatus = require('http-status');
const { Link } = require('../models');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

const redirectToOriginalUrl = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const link = await Link.findOne({ slug });

  if (!link || !link.isActive) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Link not found or inactive');
  }

  if (link.expirationDate && link.expirationDate < Date.now()) {
    // Deactivate expired link
    link.isActive = false;
    await link.save();
    throw new ApiError(httpStatus.GONE, 'Link has expired');
  }

  // If link is password-protected
  if (link.password) {
    // Check if password is provided
    const password = req.body.password || req.query.password;
    if (!password) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password required');
    }
    const isMatch = await link.isPasswordMatch(password);
    if (!isMatch) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
    }
  }

  // Update click count
  link.clickCount += 1;
  await link.save();

  // Let's record analytics data here

  // Redirect to the original URL
  return res.redirect(link.originalUrl);
});

module.exports = {
  redirectToOriginalUrl,
};
