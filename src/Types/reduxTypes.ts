import {rootReducer, setStore} from "../Redux/store";

export interface IDefaultTreeState {
	id: number | null,
	name: TBranchName,
	children: ITree[] | [],
	showChildren: number[],
	selected: TSelect
}

export interface ITree {
	id: number,
	name: TBranchName,
	children: ITree[] | []
}

type TBranchName = string | null;

export interface TSelect {
	id: number | null,
	name: string | null
}

export interface IDefaultModalState {
	create: TCreate,
	rename: TRename,
	alert: TAlert
}

export type TCreate = string | null;

export type TRename = string | null;

export type TAlert = string | null;

export type TRootReducer = ReturnType<typeof rootReducer>;

type TStore = ReturnType<typeof setStore>;

export type TDispatch = TStore["dispatch"];