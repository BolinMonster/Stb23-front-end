import api from '../../service/api'

export const getHomeData = async () => {
	const response = await api.get('/home')
	return response.data
}
