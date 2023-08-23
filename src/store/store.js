import { configureStore } from '@reduxjs/toolkit'
import homeReducer from '../features/home/slice'
import helpReducer from '../features/help/slice'
import stbReducer from '../features/stb/slice'

export const store = configureStore({
	reducer: {
		homeReducer: homeReducer,
		helpReducer: helpReducer,
		stbReducer: stbReducer
	}
})