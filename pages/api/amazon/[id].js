import { paapi5, client, api, request } from '@/lib/amazon'

export default function handler(req, res) {
  const { id } = req.query

  client.accessKey = process.env.AMAZON_API_KEY
  client.secretKey = process.env.AMAZON_API_SECRET
  client.host = 'webservices.amazon.com'
  client.region = 'us-east-1'

  request['PartnerTag'] = process.env.AMAZON_PARTNER_TAG
  request['PartnerType'] = 'Associates'
  request['ItemIds'] = [id]
  request['Resources'] = [
    'Images.Primary.Large',
    'ItemInfo.Title',
    'ItemInfo.Features',
    'Offers.Listings.Price',
  ]

  return new Promise((resolve, reject) => {
    try {
      api.getItems(request, (error, data) => {
        if (error) {
          res.status(500).send(error)
        } else {
          const response = paapi5.GetItemsResponse.constructFromObject(data)

          if (response['ItemsResult'] !== undefined) {
            res.json(response['ItemsResult']['Items'][0])
          }

          if (response['Errors'] !== undefined) {
            res.status(500).send(response['Errors'][0])
          }
        }

        resolve()
      })
    } catch (error) {
      res.status(500).send(error)
      return reject()
    }
  })
}
