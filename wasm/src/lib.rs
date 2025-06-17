use haddock_restraints::{Air, Interactor};
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

    pub fn set_target(&mut self, target: u16) {
        self.inner.add_target(target)
    }

    pub fn id(&self) -> u16 {
        self.inner.id()
    }
}

#[wasm_bindgen]
pub struct WasmAir {
    inner: Air,
}

#[wasm_bindgen]
impl WasmAir {
    #[wasm_bindgen(constructor)]
    pub fn new(interactors: Vec<WasmInteractor>) -> Self {
        // TODO: Convert WasmInteractor back to Interactor
        //  use the `inner`
        WasmAir {
            inner: Air::new(interactors.into_iter().map(|c| c.inner).collect()),
        }
    }

    pub fn gen_tbl(&self) -> String {
        match self.inner.gen_tbl() {
            Ok(r) => r,
            Err(r) => r.to_string(),
        }
    }
}
