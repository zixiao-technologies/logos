//! Mode switching handler
//!
//! Handles switching between Basic and Smart intelligence modes.

use serde_json::{json, Value};

use crate::protocol::{RequestId, Response, SetModeParams};
use crate::state::State;

/// Handle logos/setMode
pub fn handle_set_mode(state: &mut State, params: &Value, id: Option<RequestId>) -> Response {
    let params: SetModeParams = match serde_json::from_value(params.clone()) {
        Ok(p) => p,
        Err(e) => {
            return Response::error(
                id,
                crate::protocol::error_codes::INVALID_PARAMS,
                format!("Invalid setMode params: {}", e),
            );
        }
    };

    match params.mode.as_str() {
        "basic" => {
            state.enable_basic_mode();
            log::info!("Switched to Basic mode");
            Response::success(id, json!({ "mode": "basic" }))
        }
        "smart" => {
            match state.enable_smart_mode() {
                Ok(()) => {
                    log::info!("Switched to Smart mode");
                    Response::success(id, json!({ "mode": "smart" }))
                }
                Err(e) => {
                    log::error!("Failed to enable Smart mode: {}", e);
                    Response::error(
                        id,
                        crate::protocol::error_codes::INTERNAL_ERROR,
                        format!("Failed to enable Smart mode: {}", e),
                    )
                }
            }
        }
        _ => Response::error(
            id,
            crate::protocol::error_codes::INVALID_PARAMS,
            format!("Invalid mode: {}. Expected 'basic' or 'smart'", params.mode),
        ),
    }
}

/// Handle logos/getMode
pub fn handle_get_mode(state: &State, _params: &Value, id: Option<RequestId>) -> Response {
    let mode = if state.is_smart_mode() { "smart" } else { "basic" };
    Response::success(id, json!({ "mode": mode }))
}

/// Handle logos/getIndexStats
pub fn handle_get_index_stats(state: &State, _params: &Value, id: Option<RequestId>) -> Response {
    if let Some(indexer) = state.get_indexer() {
        let index = indexer.get_index();
        Response::success(
            id,
            json!({
                "symbolCount": index.symbols.len(),
                "callSiteCount": index.call_graph.len(),
                "fileCount": index.dependencies.file_count(),
            }),
        )
    } else {
        Response::success(
            id,
            json!({
                "symbolCount": state.symbol_index.symbol_count(),
                "callSiteCount": 0,
                "fileCount": 0,
            }),
        )
    }
}
