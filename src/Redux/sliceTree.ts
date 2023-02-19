import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDefaultTreeState, ITree, TSelect} from "../Types/reduxTypes";

const initialState: IDefaultTreeState = {
    id: null,
	name: "",
    children: [],
	showChildren: [],
	selected: {
		id: null,
		name: ""
	}
}

export const sliceTree = createSlice({
	name: "tree",
	initialState,
	reducers: {
		setTree(state, action: PayloadAction<ITree>) {
			state.id = action.payload.id;
			state.name = action.payload.name;
			state.children = action.payload.children;
		},
		showChildren(state, action: PayloadAction<number>) {
			state.showChildren.push(action.payload);
		},
		hideChildren(state, action: PayloadAction<number>) {
			state.showChildren.splice(state.showChildren.indexOf(action.payload), 1);
		},
		select(state, action: PayloadAction<TSelect>) {
			state.selected = action.payload;
		}
	}
})

export default sliceTree.reducer;