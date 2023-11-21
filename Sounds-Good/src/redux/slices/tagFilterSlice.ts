import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface FilterTagsState {
  value: string[]
}

const initialState: FilterTagsState = {
  value: [],
}

export const filterTagsSlice = createSlice({
  name: 'filterTags',
  initialState,
  reducers: {
    updateTags: (state, action) => {
      state.value = action.payload
    },
    // updateTags: (state, action: PayloadAction<string[]>) => {
    //   state.value = action.payload // Updating the state with the array of strings
    // },
  },
})

export const { updateTags } = filterTagsSlice.actions
export const selectFilterTags = (state: RootState) => state.filterTags.value
export default filterTagsSlice.reducer
