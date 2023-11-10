declare namespace wasm_bindgen {
	/* tslint:disable */
	/* eslint-disable */
	/**
	* @param {WasmPlayerType} white
	* @param {WasmPlayerType} black
	*/
	export function main(white: WasmPlayerType, black: WasmPlayerType): void;
	/**
	* @param {string} fen
	* @param {number} depth
	* @returns {string}
	*/
	export function compute_move_depth(fen: string, depth: number): string;
	/**
	*/
	export enum WasmPlayerEnum {
	  User = 0,
	  DepthAi = 1,
	  MovetimeAi = 2,
	}
	/**
	*/
	export class WasmPlayerType {
	  free(): void;
	/**
	* @param {WasmPlayerEnum} e
	* @param {any} value
	* @returns {WasmPlayerType}
	*/
	  static new(e: WasmPlayerEnum, value: any): WasmPlayerType;
	}
	
}

declare type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

declare interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly main: (a: number, b: number) => void;
  readonly __wbg_wasmplayertype_free: (a: number) => void;
  readonly wasmplayertype_new: (a: number, b: number) => number;
  readonly compute_move_depth: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_export_0: (a: number, b: number) => number;
  readonly __wbindgen_export_1: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_export_3: (a: number, b: number, c: number) => void;
  readonly __wbindgen_export_4: (a: number, b: number) => void;
  readonly __wbindgen_export_5: (a: number, b: number, c: number) => void;
  readonly __wbindgen_export_6: (a: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
declare function wasm_bindgen (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
