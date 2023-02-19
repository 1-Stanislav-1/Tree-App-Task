import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDefaultModalState} from "../Types/reduxTypes";
import {TCreate, TRename, TAlert} from "../Types/reduxTypes";

const initialState: IDefaultModalState = {
    create: "",
    rename: "",
	alert: ""
}

export const sliceModal = createSlice({
	name: "modal",
	initialState,
	reducers: {
		setNodeName(state, action: PayloadAction<TCreate>) {
			state.create = action.payload;
		},
		updateNodeName(state, action: PayloadAction<TRename>) {
			state.rename = action.payload;
		},
		setAlert(state, action: PayloadAction<TAlert>) {
			state.alert = action.payload;
		}
	}
})

export default sliceModal.reducer;