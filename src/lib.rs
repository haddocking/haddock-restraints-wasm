use haddock_restraints::{load_pdb_from_content, Air, Interactor};
use pdbtbx::PDB;
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

    pub fn set_pdb(&mut self, bytes: &js_sys::Uint8Array) -> Result<(), JsError> {
        self.inner.set_pdb(bytes_to_pdb(bytes)?);
        Ok(())
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

    pub fn set_passive_from_active(&mut self) {
        self.inner.set_passive_from_active();
    }

    pub fn remove_buried_residues(&mut self) {
        self.inner.remove_buried_residues();
    }

    pub fn set_filter_buried_cutoff(&mut self, cutoff: f64) {
        self.inner.set_filter_buried_cutoff(cutoff);
    }

    pub fn get_active(&mut self) -> Vec<i16> {
        self.inner
            .active()
            .clone()
            .into_iter()
            .collect::<Vec<i16>>()
    }

    pub fn get_passive(&mut self) -> Vec<i16> {
        self.inner
            .passive()
            .clone()
            .into_iter()
            .collect::<Vec<i16>>()
    }
}

#[wasm_bindgen]
pub fn restraint_bodies(bytes: &js_sys::Uint8Array) -> Result<String, JsError> {
    haddock_restraints::restraint_bodies(bytes_to_pdb(bytes)?, &None, "")
        .map_err(|e| JsError::new(&format!("Failed to generate restraint bodies: {e}")))
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

    pub fn gen_tbl(&self) -> Result<String, JsError> {
        self.inner.gen_tbl().map_err(JsError::new)
    }
}

/// Reads a PDB as the CLI does (lines padded to 80 characters, first model)
pub fn bytes_to_pdb(bytes: &js_sys::Uint8Array) -> Result<PDB, JsError> {
    let content = String::from_utf8(bytes.to_vec())?;
    load_pdb_from_content(&content).map_err(|e| {
        JsError::new(&format!(
            "Invalid PDB data: {} ({})",
            e[0].short_description(),
            e[0].long_description()
        ))
    })
}
