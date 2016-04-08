import {GET} from '@tetris/http'

/**
 * call load plans API
 * @param {Object} config fetch request config
 * @returns {Promise.<Array>} promise that resolves with requested plans
 */
export function loadPlans (config) {
  return GET(`${process.env.USER_API_URL}/plans`, config)
}

export default loadPlans
