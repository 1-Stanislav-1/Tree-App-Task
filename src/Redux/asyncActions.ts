import { TDispatch } from "../Types/reduxTypes";
import axios from "axios";
import {TRootReducer, ITree} from "../Types/reduxTypes";
import {sliceTree} from "./sliceTree";
import {sliceModal} from "./sliceModal";

export const getTree = () => async (dispatch:TDispatch) => {
	const {setTree} = sliceTree.actions;
	const response = await axios.post("https://test.vmarmysh.com/api.user.tree.get?treeName=TestTree");
	const result:ITree = response.data;
	return dispatch(setTree(result));
}

export const createNode = () => async (dispatch:TDispatch, getState: () => TRootReducer) => {
	const tree = getState().sliceTree;
	const newNodeName = getState().sliceModal.create;
	const {setNodeName, setAlert} = sliceModal.actions;
	axios.post(`https://test.vmarmysh.com/api.user.tree.node.create?treeName=${tree.name}&parentNodeId=${tree.selected.id}&nodeName=${newNodeName}`)
		.then(() => {
			document.querySelector(".ModalCreateNode")!.classList.add("hidden");
			dispatch(setNodeName(""));
			return dispatch(getTree());
		}).catch(error => {
			document.querySelector(".ModalCreateNode")!.classList.add("hidden");
			document.querySelector(".ModalAlert")!.classList.remove("hidden");
			dispatch(setAlert("Duplicate name"));
			return dispatch(setNodeName(""));
		});
}

export const renameNode = () => async (dispatch:TDispatch, getState: () => TRootReducer) => {
	const tree = getState().sliceTree;
	const newNodeName = getState().sliceModal.rename;
	const {updateNodeName, setAlert} = sliceModal.actions;
	axios.post(`https://test.vmarmysh.com/api.user.tree.node.rename?treeName=${tree.name}&nodeId=${tree.selected.id}&newNodeName=${newNodeName}`)
		.then(() => {
			document.querySelector(".ModalRenameNode")!.classList.add("hidden");
			dispatch(updateNodeName(""));
			return dispatch(getTree());
		}).catch(error => {
			document.querySelector(".ModalRenameNode")!.classList.add("hidden");
			document.querySelector(".ModalAlert")!.classList.remove("hidden");
			dispatch(setAlert("Duplicate name"));
			return dispatch(updateNodeName(""));
		});
}

export const removeNode = () => async (dispatch:TDispatch, getState: () => TRootReducer) => {
	const tree = getState().sliceTree;
	const {select} = sliceTree.actions;
	const {setAlert} = sliceModal.actions;
	axios.post(`https://test.vmarmysh.com/api.user.tree.node.delete?treeName=${tree.name}&nodeId=${tree.selected.id}`)
		.then(() => {
			document.querySelector(".ModalRemoveNode")!.classList.add("hidden");
			dispatch(select({id: null, name: ""}));
			return dispatch(getTree());
		}).catch(error => {
			document.querySelector(".ModalRemoveNode")!.classList.add("hidden");
			document.querySelector(".ModalAlert")!.classList.remove("hidden");
			return dispatch(setAlert("You have to delete all children nodes first"));
		});
}