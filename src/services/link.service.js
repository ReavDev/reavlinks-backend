const httpStatus = require('http-status');
const { Link } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new short link
 * @param {User} user - The user creating the link
 * @param {Object} linkBody - The link data
 * @returns {Promise<Link>}
 */
const createLink = async (user, linkBody) => {
    if (linkBody.slug && (await Link.isSlugTaken(linkBody.slug))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Slug is already taken');
    }

    // Generate a unique slug if none is provided
    if (!linkBody.slug) {
        let slugGenerated = false;
        while (!slugGenerated) {
            const potentialSlug = generateRandomSlug();
            if (!(await Link.isSlugTaken(potentialSlug))) {
                linkBody.slug = potentialSlug;
                slugGenerated = true;
            }
        }
    }

    const link = new Link({
        ...linkBody,
        user: user.id,
    });
    await link.save();
    return link;
};

/**
 * Query for links
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options (e.g., pagination)
 * @returns {Promise<QueryResult>}
 */
const queryLinks = async (filter, options) => {
    const links = await Link.paginate(filter, options);
    return links;
};

/**
 * Get link by id
 * @param {ObjectId} id
 * @returns {Promise<Link>}
 */
const getLinkById = async (id) => {
    return Link.findById(id);
};

/**
 * Update link by id
 * @param {ObjectId} linkId
 * @param {Object} updateBody
 * @returns {Promise<Link>}
 */
const updateLinkById = async (linkId, updateBody) => {
    const link = await getLinkById(linkId);
    if (!link) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Link not found');
    }

    if (updateBody.slug && (await Link.isSlugTaken(updateBody.slug, linkId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Slug is already taken');
    }

    Object.assign(link, updateBody);
    await link.save();
    return link;
};

/**
 * Delete link by id
 * @param {ObjectId} linkId
 * @returns {Promise<Link>}
 */
const deleteLinkById = async (linkId) => {
    const link = await getLinkById(linkId);
    if (!link) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Link not found');
    }
    await link.remove();
    return link;
};

/**
 * Generate a random slug
 * @returns {string}
 */
const generateRandomSlug = () => {
    return Math.random().toString(36).substr(2, 8);
};

module.exports = {
    createLink,
    queryLinks,
    getLinkById,
    updateLinkById,
    deleteLinkById,
};
