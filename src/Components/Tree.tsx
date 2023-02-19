import React, {ReactElement, ReactNode, SyntheticEvent} from "react";
import { useTypedSelector, useTypedDispatch } from "../Hooks/reduxHooks";
import {ITree} from "../Types/reduxTypes";
import { sliceTree } from "../Redux/sliceTree";
import { sliceModal } from "../Redux/sliceModal";

export default function Tree() {

	const tree = useTypedSelector(state => state.sliceTree);
	const {showChildren, hideChildren, select} = sliceTree.actions;
	const {updateNodeName} = sliceModal.actions;
	const dispatch = useTypedDispatch();

	function selectRoot():void {
		dispatch(select({id: tree.id, name: tree.name}));
	}

	function showChildrenClick(event:React.MouseEvent<HTMLElement>, id:number):void {
		if (tree.showChildren.find(item => item === id)) dispatch(hideChildren(id));
		else dispatch(showChildren(id));
	}

	function createNodeClick():void {
		document.querySelector(".ModalCreateNode")!.classList.remove("hidden");
	}

	function selectNode(event:React.MouseEvent<HTMLElement>) {
		let name: string;
		if (event.currentTarget.tagName === "LI") name = event.currentTarget.textContent!.slice(0, event.currentTarget.textContent!.length - 4);
		else name = event.currentTarget.textContent!.slice(1, event.currentTarget.textContent!.length - 4);
		dispatch(select({id: Number(event.currentTarget.id), name}));
	}

	function renameNodeClick():void {
		document.querySelector(".ModalRenameNode")!.classList.remove("hidden");
		dispatch(updateNodeName(tree.selected.name));
	}

	function removeNodeClick():void {
		document.querySelector(".ModalRemoveNode")!.classList.remove("hidden");
	}

	function buildTree(node:ITree):ReactNode {
		if (node.children.length) {
			return <li key={node.id}>
				<div id={String(node.id)} onClick={selectNode} className={`Tree-branch ${tree.selected.id === node.id ? "active" : ""}`}>
					<span className={`Tree-showChildrenButton ${tree.showChildren.find(item => item === node.id) ? "showChildren" : ""}`} onClick={(event) => showChildrenClick(event, node.id)}>&#8711;</span>
					{node.name}
					<span className={`Tree-renameNode ${tree.selected.id === node.id ? "" : "hidden"}`} onClick={renameNodeClick}>&#128394;</span>
					<span className={`Tree-createChildNode ${tree.selected.id === node.id ? "" : "hidden"}`} onClick={createNodeClick}>+</span>
					<span className={`Tree-removeNode ${tree.selected.id === node.id ? "" : "hidden"}`} onClick={removeNodeClick}>&#215;</span>
				</div>
				<ul className={`Tree-ChildNodeList ${tree.showChildren.find(item => item === node.id) ? "" : "hidden"}`}>
					{node.children.map(child => buildTree(child))}
				</ul>
			</li>
		}
		else return <li id={String(node.id)} className={`Tree-branch ${tree.selected.id === node.id ? "active" : ""}`} onClick={selectNode} key={node.id}>
			{node.name}
			<span className={`Tree-renameNode ${tree.selected.id === node.id ? "" : "hidden"}`} onClick={renameNodeClick}>&#128394;</span>
			<span className={`Tree-createChildNode ${tree.selected.id === node.id ? "" : "hidden"}`} onClick={createNodeClick}>+</span>
			<span className={`Tree-removeNode ${tree.selected.id === node.id ? "" : "hidden"}`} onClick={removeNodeClick}>&#215;</span>
		</li>
	}

	return <div className="Tree">
		<div className={`Tree-rootNode ${tree.name === tree.selected.name ? "active" : ""}`} onClick={selectRoot}>
			<span className={`Tree-showChildrenButton ${tree.showChildren.find(item => item === tree.id) ? "showChildren" : ""}`} onClick={(event) => showChildrenClick(event, tree.id!)}>&#8711;</span>
			<h3>{tree.name}</h3>
			<div className={`Tree-createNode ${tree.name === tree.selected.name ? "" : "hidden"}`} onClick={createNodeClick}>+</div>
		</div>
		<ul className={`Tree-nodeList ${tree.showChildren.find(item => item === tree.id) ? "" : "hidden"}`}>
			{tree.children.map(child => buildTree(child))}
		</ul>
	</div>
}