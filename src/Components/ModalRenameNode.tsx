import React, {SyntheticEvent} from "react";
import {useTypedDispatch, useTypedSelector} from "../Hooks/reduxHooks";
import {renameNode} from "../Redux/asyncActions";
import {sliceModal} from "../Redux/sliceModal";

export default function ModalRenameNode() {

	const inputValue = useTypedSelector(state => state.sliceModal.rename);
	const {updateNodeName} = sliceModal.actions;
	const dispatch = useTypedDispatch();

	function close():void {
		document.querySelector(".ModalRenameNode")!.classList.add("hidden");
	}

	function changeInputValue(event:React.ChangeEvent<HTMLInputElement>):void {
		dispatch(updateNodeName(event.currentTarget.value));
	}

	function renameNodeClick():void {
		dispatch(renameNode());
	}

	return <div className="ModalRenameNode hidden">
		<div className="ModalRenameNode-container">
			<div className="ModalRenameNode-close" onClick={close}>&#215;</div>
			<h2>Rename node</h2>
			<form onSubmit={(event:React.FormEvent<HTMLFormElement>) => event.preventDefault()}>
				<label>
					Enter new node name:
					<input type="text" value={inputValue || ""} placeholder="New node name" onChange={changeInputValue}/>
				</label>
				<button onClick={renameNodeClick}>Confirm</button>
			</form>
		</div>
	</div>
}