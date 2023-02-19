import React from "react";
import {useTypedDispatch, useTypedSelector} from "../Hooks/reduxHooks";
import {removeNode} from "../Redux/asyncActions";

export default function ModalRemoveNode() {

	const selected = useTypedSelector(state => state.sliceTree.selected);
	const dispatch = useTypedDispatch();

	function close():void {
		document.querySelector(".ModalRemoveNode")!.classList.add("hidden");
	}

	function removeNodeClick():void {
		dispatch(removeNode());
	}

	return <div className="ModalRemoveNode hidden">
		<div className="ModalRemoveNode-container">
			<div className="ModalRemoveNode-close" onClick={close}>&#215;</div>
			<h2>Remove node</h2>
			<p>Do you want to delete {selected.name}?</p>
			<button onClick={removeNodeClick}>Confirm</button>
		</div>
	</div>
}