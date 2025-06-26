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

    pub fn set_target(&mut self, target: u16) {
        self.inner.add_target(target)
    }

    pub fn id(&self) -> u16 {
        self.inner.id()
    }

    pub fn set_active(&mut self, active: Vec<i16>) {
        self.inner.set_active(active);
    }

    pub fn set_active_atoms(&mut self, atoms: Vec<String>) {
        self.inner.set_active_atoms(atoms);
    }

    pub fn set_chain(&mut self, chain: &str) {
        self.inner.set_chain(chain);
    }

    pub fn set_lower_margin(&mut self, margin: f64) {
        self.inner.set_lower_margin(margin)
    }

    pub fn set_passive(&mut self, passive: Vec<i16>) {
        self.inner.set_passive(passive);
    }

    pub fn set_structure(&mut self, structure: &str) {
        todo!()
    }

    pub fn set_surface_as_passive(&mut self) {
        self.inner.set_surface_as_passive();
    }

    pub fn set_target_distance(&mut self, distance: f64) {
        self.inner.set_target_distance(distance);
    }

    pub fn set_upper_margin(&mut self, margin: f64) {
        self.inner.set_upper_margin(margin);
    }

    pub fn set_passive_atoms(&mut self, atoms: Vec<String>) {
        self.inner.set_passive_atoms(atoms);
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
        // NOTE: This needs to wrap around the `read_json_file` function
        //  And should get the interactors directly
        // <https://github.com/haddocking/haddock-restraints/blob/362fdf04cf527d89aad0946bbd475c7b17ca6ab6/src/core/commands/tbl.rs#L23-L51>
        //
        // TODO: Loop over the interactors and check if:
        // - need to `set_structure`?
        // - need to `set_passive_from_active`?
        // - need to `set_surface_as_passive`?
        // - need to `remove_buried_residues`?
        //
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
