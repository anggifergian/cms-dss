import axios from 'axios'
import { dev_api } from '../../settings/config'
import { buildHeaders } from '../../utils/helpers'

export async function getCompanies(data) {
  const headers = buildHeaders()
  const url = dev_api + '/company/getCompany'

  return await axios.post(url, data, headers)
}

export async function addCompany(data) {
  const headers = buildHeaders()
  const url = dev_api + '/company/addNewCompany'

  return await axios.post(url, data, headers)
}

export async function updateCompany(data) {
  const headers = buildHeaders()
  const url = dev_api + '/company/updateCompany'

  return await axios.post(url, data, headers)
}

export async function deleteCompany(data) {
  const headers = buildHeaders()
  const url = dev_api + '/company/deleteCompany'

  return await axios.post(url, data, headers)
}