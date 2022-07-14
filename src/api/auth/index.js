import axios from 'axios'
import { dev_api } from '../../settings/config'
import { buildHeaders } from '../../utils/helpers'

export async function login(data) {
  const headers = buildHeaders()
  const url = dev_api + '/Users/loginUsers'

  return await axios.post(url, data, headers)
}