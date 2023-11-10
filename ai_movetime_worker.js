importScripts("gui_web.js");

onmessage = async (e) => {
	let wasm_data = e.data.wasm_data;
	let board = e.data.board;
	let movetime_seconds = e.data.movetime_seconds;

	let timeout_worker = new Worker("./ai_timeout_worker.js");
	timeout_worker.postMessage({wasm_data: wasm_data});

	let mv;
	let depth = 1;
	timeout_worker.onmessage = (e) => {
		if (e.data != "setup_finished") {
			mv = e.data;
			depth++;
		}
		timeout_worker.postMessage({board: board, depth: depth});
	}
	await new Promise(r => setTimeout(r, movetime_seconds * 1000));
	while (mv == undefined) {
		await new Promise(r => setTimeout(r, 10));
	}

	timeout_worker.terminate();
	postMessage(mv);
	console.log(`reached depth: ${depth}`);
}
