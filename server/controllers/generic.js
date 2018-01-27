const {SC} = require('../constants')

module.exports = {

  /**
   * Endpoint to check is server alive
   * @param req - request object
   * @param res - response object
   * @returns {Promise.<void>}
   */
  healthCheck: (req, res) => {
    // send health check response
    return res.status(SC.SUCCESS).json({success: true, message: 'alive'})
  },
  /**
   * generic get endpoint
   * @param headers
   * @param query
   * @param params
   * @param res
   * @param next
   * @returns {Promise.<void>}
   */
  genericGET: async ({headers, query, params}, res, next) => {
    res.status(SC.SUCCESS).json()
  },
  /**
   * generic post endpoint
   * @param headers
   * @param query
   * @param params
   * @param res
   * @param next
   * @returns {Promise.<void>}
   */
  genericPOST: async ({headers, body, query, params}, res, next) => {
    res.status(SC.SUCCESS).json()
  },
  /**
   * generic put endpoint
   * @param headers
   * @param query
   * @param params
   * @param res
   * @param next
   * @returns {Promise.<void>}
   */
  genericPUT: async ({headers, body, query, params}, res, next) => {
    res.status(SC.SUCCESS).json()
  },
  /**
   * generic delete endpoint
   * @param headers
   * @param query
   * @param params
   * @param res
   * @param next
   * @returns {Promise.<void>}
   */
  genericDELETE: async ({headers, query, params}, res, next) => {
    res.status(SC.SUCCESS).json()
  }
}
