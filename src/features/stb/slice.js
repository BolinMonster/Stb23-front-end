import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllStb, getStbById, getAllStbXML, getStbByIdXML, deleteStbById, getStbByTitleAndValidationDateXML, postStb } from './service'

export const fetchAllStb = createAsyncThunk('stb/fetchAllStb', async () => {
	return await getAllStb()
})

export const fetchStbById = createAsyncThunk('stb/fetchStbById', async (id) => {
  return await getStbById(id)
})

export const fetchAllStbXML = createAsyncThunk('stb/fetchAllStbXML', async () => {
	return await getAllStbXML()
})

export const fetchStbByIdXml = createAsyncThunk('stb/fetchStbByIdXml', async (id) => {
	return await getStbByIdXML(id)
})

export const removeStbById = createAsyncThunk('stb/removeStbById', async (id) => {
	return await deleteStbById(id)
})

export const fetchStbByTitleAndValidationDateXml = createAsyncThunk('stb/fetchStbByTitleAndValidationDateXml', async ({ title, validationDate }) => {
	return await getStbByTitleAndValidationDateXML(title, validationDate)
})

export const sendStbXML = createAsyncThunk('stb/sendStbXML', async ({ xmlStb }) => {
	console.log(xmlStb)
	return await postStb(xmlStb)

})


const stbSlice = createSlice({
	name: 'stb',
	initialState: {
		data: {
			stbs: [],
			stb: {},
			xmlStbs: '',
			xmlStb: '',
			xmlStbSent: '',
			removeStb: ''
		},
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			
			.addCase(fetchAllStb.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchAllStb.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.data.stbs = action.payload
			})
			.addCase(fetchAllStb.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})

			.addCase(fetchStbById.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchStbById.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.data.stb = action.payload.stb ?? state.data.stb
				state.data.error = 'errorId' in action.payload ? {
					errorId: 'errorId' in action.payload ? action.payload.errorId : null,
					status: 'status' in action.payload ? action.payload.status : null,
				} : null
			})
			.addCase(fetchStbById.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			
			.addCase(fetchAllStbXML.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchAllStbXML.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.data.xmlStbs = action.payload
			})
			.addCase(fetchAllStbXML.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
		
			.addCase(fetchStbByIdXml.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchStbByIdXml.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.data.xmlStb = action.payload
			})
			.addCase(fetchStbByIdXml.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
		
			.addCase(sendStbXML.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(sendStbXML.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.data.xmlStbSent = action.payload
			})
			.addCase(sendStbXML.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			
			.addCase(removeStbById.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(removeStbById.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.data.removeStb = action.payload
			})
			.addCase(removeStbById.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
		
			.addCase(fetchStbByTitleAndValidationDateXml.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchStbByTitleAndValidationDateXml.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.data.xmlStbs = action.payload
			})
			.addCase(fetchStbByTitleAndValidationDateXml.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			
		
	}
})

// to do : faire delete, et les fetch xml

export default stbSlice.reducer
