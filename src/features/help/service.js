import api from '../../service/api'

export const getAllOperations = async () => {
  const response = await api.get('/help')
	return response.data
}