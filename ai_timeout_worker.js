importScripts("gui_web.js");

onmessage = async (e) => {
	if ("wasm_data" in e.data) {
		let wasm_data = e.data.wasm_data;

		var { compute_move_depth } = wasm_bindgen;
		await wasm_bindgen(wasm_data);
		global_compute_move_depth = compute_move_depth;

		postMessage("setup_finished");
	}
	else {
		let board = e.data.board;
		let depth = e.data.depth;

		let mv = global_compute_move_depth(board, depth);
		postMessage(mv);
	}
}
