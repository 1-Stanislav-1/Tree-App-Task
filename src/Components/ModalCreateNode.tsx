import React, {SyntheticEvent} from "react";
import {useTypedDispatch, useTypedSelector} from "../Hooks/reduxHooks";
import {sliceModal} from '../Redux/sliceModal';
import {createNode} from "../Redux/asyncActions";

export default function ModalCreateNode() {

	const inputValue = useTypedSelector(state => state.sliceModal.create);
	const {setNodeName} = sliceModal.actions;
	const dispatch = useTypedDispatch();

	function close():void {
		document.querySelector(".ModalCreateNode")!.classList.add("hidden");
	}

	function changeInputValue(event:React.ChangeEvent<HTMLInputElement>):void {
		dispatch(setNodeName(event.currentTarget.value));
	}

	function createNodeClick():void {
		dispatch(createNode());
	}

	return <div className="ModalCreateNode hidden">
		<div className="ModalCreateNode-container">
			<div className="ModalCreateNode-close" onClick={close}>&#215;</div>
			<h2>Create node</h2>
			<form onSubmit={(event:React.FormEvent<HTMLFormElement>) => event.preventDefault()}>
				<label>
					Enter new node name:
					<input type="text" value={inputValue || ""} placeholder="New node name" onChange={changeInputValue}/>
				</label>
				<button onClick={createNodeClick}>Confirm</button>
			</form>
		</div>
	</div>
}