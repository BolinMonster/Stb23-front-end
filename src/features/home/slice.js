import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getHomeData } from './service'

export const fetchHome = createAsyncThunk('home/fetchHome', async () => {
	// Récupère les données du Home
	const response = await getHomeData()
  return response
})

const homeSlice = createSlice({
	name: 'home',
	initialState: {
		data: null,
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchHome.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchHome.fulfilled, (state, action) => {
				state.status = 'succeeded'
				// affecte à l'état pour son champ de data (homeData), le contenu de la réponse
				state.data = action.payload
			})
			.addCase(fetchHome.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
	}
})

export default homeSlice.reducer