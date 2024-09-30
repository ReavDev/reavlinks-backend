const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { linkService } = require('../services');
const ApiError = require('../utils/ApiError');

const createLink = catchAsync(async (req, res) => {
  const link = await linkService.createLink(req.user, req.body);
  res.status(httpStatus.CREATED).send(link);
});

const getLinks = catchAsync(async (req, res) => {
  const filter = { user: req.user.id };
  const options = {
    sortBy: req.query.sortBy,
    limit: req.query.limit,
    page: req.query.page,
  };
  const result = await linkService.queryLinks(filter, options);
  res.send(result);
});

const getLink = catchAsync(async (req, res) => {
  const link = await linkService.getLinkById(req.params.linkId);
  if (!link) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Link not found');
  }
  // Authorization check
  if (link.user.toString() !== req.user.id && req.user.role !== 'admin') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  res.send(link);
});

const updateLink = catchAsync(async (req, res) => {
  const link = await linkService.getLinkById(req.params.linkId);
  if (!link) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Link not found');
  }
  // Authorization check
  if (link.user.toString() !== req.user.id && req.user.role !== 'admin') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  const updatedLink = await linkService.updateLinkById(req.params.linkId, req.body);
  res.send(updatedLink);
});

const deleteLink = catchAsync(async (req, res) => {
  const link = await linkService.getLinkById(req.params.linkId);
  if (!link) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Link not found');
  }
  // Authorization check
  if (link.user.toString() !== req.user.id && req.user.role !== 'admin') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  await linkService.deleteLinkById(req.params.linkId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createLink,
  getLinks,
  getLink,
  updateLink,
  deleteLink,
};
