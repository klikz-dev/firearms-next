const paapi5 = require('paapi5-nodejs-sdk')

const client = paapi5.ApiClient.instance
const api = new paapi5.DefaultApi()
const request = new paapi5.GetItemsRequest()

export { paapi5, client, api, request }
