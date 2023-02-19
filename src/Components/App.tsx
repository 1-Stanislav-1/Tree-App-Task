import React, {useEffect} from 'react';
import { useTypedSelector, useTypedDispatch } from '../Hooks/reduxHooks';
import {getTree} from "../Redux/asyncActions"
import Tree from "./Tree";
import ModalCreateNode from "./ModalCreateNode";
import ModalRenameNode from "./ModalRenameNode";
import ModalRemoveNode from "./ModalRemoveNode";
import ModalAlert from "./ModalAlert";

function App() {

	const tree = useTypedSelector(state => state.sliceTree);
	const dispatch = useTypedDispatch();

	useEffect(() => {
		dispatch(getTree());
	}, []);

	return (
		<div className="App">
			<h1>tree-app-task</h1>
			<Tree/>
			<ModalCreateNode/>
			<ModalRenameNode/>
			<ModalRemoveNode/>
			<ModalAlert/>
		</div>
	);
}

export default App;
