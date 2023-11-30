async function async_main() {
	let wasm_data_promise = fetch("./gui_web_bg.wasm")
		.then((response) => response.arrayBuffer());

	let ai_movetime_input = get_only_element(document.getElementsByName("ai-movetime"));
	let game_type_form = document.getElementById("game-type-form");
	game_type_form.onsubmit = async (e) => {
		e.preventDefault();

		let submit_button_id = e.submitter.id;
		let ai_movetime_value = ai_movetime_input.value;

		game_type_form.remove();
		document.querySelector("h1").remove();
		let canvas = document.createElement("canvas");
		canvas.setAttribute("id", "main-canvas");
		document.body.appendChild(canvas);

		window.wasm_data = await wasm_data_promise;
		const { main, WasmPlayerType, WasmPlayerEnum, compute_move_depth } = wasm_bindgen;
		await wasm_bindgen(window.wasm_data);

		let ai_player_type = WasmPlayerType.new(WasmPlayerEnum.MovetimeAi, parseFloat(ai_movetime_value));
		let player_type = WasmPlayerType.new(WasmPlayerEnum.Player);
		switch (submit_button_id) {
			case "play-as-white":
				main(player_type, ai_player_type, false);
				break;
			case "play-as-black":
				main(ai_player_type, player_type, true);
				break;
			default:
				console.error("unreachable");
		}
	}

}
async_main();

function get_only_element(array) {
	console.assert(array.length == 1);
	return array[0];
}
