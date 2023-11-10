importScripts("gui_web.js");

onmessage = async (e) => {
	let board = e.data.board;
	let depth = e.data.depth;
	let wasm_data = e.data.wasm_data;

	const { compute_move_depth } = wasm_bindgen;
	await wasm_bindgen(wasm_data);

	let mv = compute_move_depth(board, depth);
	postMessage(mv);
}
