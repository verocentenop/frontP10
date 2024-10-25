import { response } from 'express'

const localUrl = 'http://localhost:3000/api/v1'

export const api = async ({
  endpoint,
  method = 'GET',
  body,
  isJSON = true
}) => {
  const headers = {}

  isJSON ? (headers['Content-Type'] = 'application/json') : null

  const res = await fetch(localUrl + endpoint, {
    body: isJson ? JSON.stringify(body) : body,
    method
  })

  const response = await res.json()
  return response
}
