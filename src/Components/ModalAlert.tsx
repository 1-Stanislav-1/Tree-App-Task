import React from "react";
import {useTypedDispatch, useTypedSelector} from "../Hooks/reduxHooks";
import {sliceModal} from '../Redux/sliceModal';

export default function ModalAlert() {

	const alertValue = useTypedSelector(state => state.sliceModal.alert);
	const {setAlert} = sliceModal.actions;
	const dispatch = useTypedDispatch();

	function close():void {
		document.querySelector(".ModalAlert")!.classList.add("hidden");
        dispatch(setAlert(""));
	}

	return <div className="ModalAlert hidden">
		<div className="ModalAlert-container">
			<div className="ModalAlert-close" onClick={close}>&#215;</div>
			<h2>Message</h2>
			<p className="ModalAlert-message">{alertValue || ""}</p>
		</div>
	</div>
}