class WasmDepthComputationHandle {
	constructor(board, depth) {
		this.worker = new Worker("./ai_depth_worker.js");
		this.worker.postMessage({board: board, depth: depth, wasm_data: window.wasm_data});
		this.worker.onmessage = (e) => {
			this.mv = e.data;
		};
	}
	is_finished() {
		return this.mv != undefined;
	}
	join() {
		//TODO: this blocks everything and blocks worker from running
		while (!this.is_finished()) {}
		return this.mv;
	}
	abort() {
		this.worker.terminate();
	}
}

class WasmMovetimeComputationHandle {
	constructor(board, movetime_seconds) {
		this.worker = new Worker("./ai_movetime_worker.js");
		this.worker.postMessage({board: board, movetime_seconds: movetime_seconds, wasm_data: window.wasm_data});
		this.worker.onmessage = (e) => {
			this.mv = e.data;
		};
	}
	is_finished() {
		return this.mv != undefined;
	}
	join() {
		//TODO: this blocks everything and blocks worker from running
		while (!this.is_finished()) {}
		return this.mv;
	}
	abort() {
		this.worker.terminate();
	}
}
