use haddock_restraints::Interactor;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct WasmInteractor {
    inner: Interactor,
}

#[wasm_bindgen]
impl WasmInteractor {
    #[wasm_bindgen(constructor)]
    pub fn new(id: u16, chain: String, active: Vec<i16>, passive: Vec<i16>) -> Self {
        let mut interactor = Interactor::new(id);

        interactor.set_chain(&chain);
        interactor.set_active(active);
        interactor.set_passive(passive);
        WasmInteractor { inner: interactor }
    }

    pub fn print(&self) -> String {
        "Hello!".to_string()
    }
}
