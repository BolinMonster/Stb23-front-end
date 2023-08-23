import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllOperations } from './service'

export const fetchAllOperations = createAsyncThunk('stb/fetchAllOperations', async () => {
	return await getAllOperations()
})

const helpSlice = createSlice({
	name: 'help',
	initialState: {
		data: null,
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllOperations.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchAllOperations.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.data = action.payload
			})
			.addCase(fetchAllOperations.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
	}
})

export default helpSlice.reducer
