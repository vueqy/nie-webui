async function async_main() {
	let white_type_selector = get_only_element(document.getElementsByName("white-type-selector"));
	let white_ai_args = get_only_element(document.getElementsByName("white-args"));
	setup_player_selection(white_type_selector, white_ai_args);

	let black_type_selector = get_only_element(document.getElementsByName("black-type-selector"));
	let black_ai_args = get_only_element(document.getElementsByName("black-args"));
	setup_player_selection(black_type_selector, black_ai_args);

	function setup_player_selection(player_type_selector, ai_args_input) {
		let change_callback = () => {
			let option = get_only_element(player_type_selector.selectedOptions);
			switch (option.value) {
				case "user":
					ai_args_input.value = "";
					ai_args_input.disabled = true;
					ai_args_input.required = false;
					break;
				case "ai-movetime":
					ai_args_input.disabled = false;
					ai_args_input.required = true;
					ai_args_input.min = "0";
					ai_args_input.step = "any";
					break;
				case "ai-depth":
					ai_args_input.disabled = false;
					ai_args_input.required = true;
					ai_args_input.min = "1";
					ai_args_input.step = "1";
					break
				case "":
					break;
				default:
					console.error("unreachable");
			}
		};
		change_callback();
		player_type_selector.onchange = change_callback;
	}

	let wasm_data_promise = fetch("./gui_web_bg.wasm")
		.then((response) => response.arrayBuffer());

	let game_type_form = document.getElementById("game-type-form");
	game_type_form.onsubmit = async (e) => {
		e.preventDefault();

		game_type_form.remove();
		document.querySelector("h1").remove();
		let canvas = document.createElement("canvas");
		canvas.setAttribute("id", "main-canvas");
		document.body.appendChild(canvas);

		window.wasm_data = await wasm_data_promise;
		const { main, WasmPlayerType, WasmPlayerEnum, compute_move_depth } = wasm_bindgen;
		await wasm_bindgen(window.wasm_data);

		function get_player_type(player_type_selector, ai_args_input) {
			let player_type;
			switch (player_type_selector.selectedOptions[0].value) {
				case "user":
					player_type = WasmPlayerType.new(WasmPlayerEnum.User);
					break;
				case "ai-movetime":
					let movetime = parseFloat(ai_args_input.value);
					player_type = WasmPlayerType.new(WasmPlayerEnum.MovetimeAi, movetime);
					break;
				case "ai-depth":
					let depth = parseFloat(ai_args_input.value);
					player_type = WasmPlayerType.new(WasmPlayerEnum.DepthAi, depth);
					break;
			}
			return player_type;
		}
		let white_type = get_player_type(white_type_selector, white_ai_args);
		let black_type = get_player_type(black_type_selector, black_ai_args);

		main(white_type, black_type);
	}

}
async_main();

function get_only_element(array) {
	console.assert(array.length == 1);
	return array[0];
}
