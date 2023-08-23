import api from '../../service/api'

export const getAllStb = async () => {
  const response = await api.get('/stb23/resume')
	return response.data
}

export const getStbById = async (id) => {
  const encodedId = encodeURIComponent(id)
  const response = await api.get(`/stb23/html/${encodedId}`)
	return response.data
}

export const getAllStbXML = async () => {
  const response = await api.get('/stb23/resume/xml')
  return response.data
}

export const getStbByIdXML = async (id) => {
  const encodedId = encodeURIComponent(id)
  const response = await api.get(`/stb23/xml/${encodedId}`)
  return response.data
}

export const deleteStbById = async (id) => {
  const encodedId = encodeURIComponent(id)
  const response = await api.delete(`/stb23/delete/${encodedId}`)
  return response.data
}

export const getStbByTitleAndValidationDateXML = async (title, validationDate) => {
  const encodedTitle = encodeURIComponent(title)
  const encodedValidationDate = encodeURIComponent(validationDate)
  const response = await api.get(`/stb23/search?title=${encodedTitle}&validationDate=${encodedValidationDate}`)
  return response.data
}

export const postStb = async (xmlStb) => {
  const config = {
    headers: {
      'Content-Type': 'application/xml',
    },
  }
  try {
    const response = await api.post('/stb23/insert', xmlStb, config)
    return response.data
  } catch (error) {
    if (error.response) {
      if (error.response.data) return error.response.data
      return JSON.stringify(error.response)
    } else if (error.request) {
      return JSON.stringify(error.request)
    } else {
      return error.message.toString()
    }
  }
}
