import { get } from "../../utils/request"

export const FETCH_DATA = 'FETCH DATA'

export default store => next => action => {
  const callAPI = action[FETCH_DATA]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const { endpoint, schema, types } = callAPI
  if (typeof endpoint !== 'string') {
    throw new Error('endpoint must be string')
  }
  if (!schema) {
    throw new Error('scheme does not exist')
  }
  if (!Array.isArray(types) && types.length !== 3) {
    throw new Error('need an array which includes 3 action types')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('action type must be string')
  }

  const actionWith = data => {
    const finalAction = { ...action, ...data }
    delete finalAction[FETCH_DATA]
    return finalAction
  }

  const [requestType, successType, failureType] = types

  next(actionWith({ type: requestType }))
  return fetchData(endpoint, schema).then(
    response => next(actionWith({
      type: successType,
      response
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Get data failed'
    }))
  )
}

const fetchData = (endpoint, schema) => {
  return get(endpoint).then(data => {
    return normalizeData(data, schema)
  })
}

const normalizeData = (data, schema) => {
  const { id, name } = schema
  let kvObj = {}
  let ids = []
  if (Array.isArray(data)) {
    data.forEach(item => {
      kvObj[item[id]] = item
      ids.push(item[id])
    })
  } else {
    kvObj[data[id]] = data
    ids.push(data[id])
  }
  return {
    [name]: kvObj,
    ids
  }
}
