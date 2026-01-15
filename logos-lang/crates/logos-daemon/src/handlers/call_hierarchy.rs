//! Call Hierarchy handler (LSP 3.16+)
//!
//! Provides incoming/outgoing call hierarchy for Smart mode.

use serde_json::{json, Value};
use logos_core::Position;

use crate::protocol::{
    CallHierarchyItem, CallHierarchyIncomingCall, CallHierarchyIncomingCallsParams,
    CallHierarchyOutgoingCall, CallHierarchyOutgoingCallsParams, CallHierarchyPrepareParams,
    RequestId, Response, SerializablePosition, SerializableRange,
};
use crate::state::State;

/// Handle textDocument/prepareCallHierarchy
pub fn handle_prepare(state: &State, params: &Value, id: Option<RequestId>) -> Response {
    let params: CallHierarchyPrepareParams = match serde_json::from_value(params.clone()) {
        Ok(p) => p,
        Err(e) => {
            return Response::error(
                id,
                crate::protocol::error_codes::INVALID_PARAMS,
                format!("Invalid prepareCallHierarchy params: {}", e),
            );
        }
    };

    // Smart mode required for call hierarchy
    if !state.is_smart_mode() {
        return Response::success(id, json!(null));
    }

    let indexer = match state.get_indexer() {
        Some(i) => i,
        None => return Response::success(id, json!(null)),
    };

    let uri = &params.text_document.uri;
    let position = Position::new(params.position.line, params.position.character);

    // Find symbol at position
    let index = indexer.get_index();
    let symbols = index.symbols.find_by_name(""); // Get all symbols

    // Find the symbol that contains this position
    let symbol = symbols.iter().find(|s| {
        s.location.uri == *uri
            && s.location.selection_range.start.line <= position.line
            && s.location.selection_range.end.line >= position.line
    });

    match symbol {
        Some(s) => {
            let item = CallHierarchyItem {
                name: s.name.clone(),
                kind: symbol_kind_to_lsp(s.kind),
                detail: s.qualified_name.clone().into(),
                uri: s.location.uri.clone(),
                range: range_to_serializable(&s.location.range),
                selection_range: range_to_serializable(&s.location.selection_range),
                data: Some(json!({ "symbolId": s.id.0 })),
            };
            Response::success(id, json!([item]))
        }
        None => Response::success(id, json!([])),
    }
}

/// Handle callHierarchy/incomingCalls
pub fn handle_incoming_calls(state: &State, params: &Value, id: Option<RequestId>) -> Response {
    let params: CallHierarchyIncomingCallsParams = match serde_json::from_value(params.clone()) {
        Ok(p) => p,
        Err(e) => {
            return Response::error(
                id,
                crate::protocol::error_codes::INVALID_PARAMS,
                format!("Invalid incomingCalls params: {}", e),
            );
        }
    };

    if !state.is_smart_mode() {
        return Response::success(id, json!([]));
    }

    let indexer = match state.get_indexer() {
        Some(i) => i,
        None => return Response::success(id, json!([])),
    };

    // Get symbol ID from item data
    let symbol_id = params
        .item
        .data
        .as_ref()
        .and_then(|d| d.get("symbolId"))
        .and_then(|v| v.as_u64())
        .map(logos_index::SymbolId);

    let symbol_id = match symbol_id {
        Some(id) => id,
        None => return Response::success(id, json!([])),
    };

    let index = indexer.get_index();

    // Find callers
    let callers = index.call_graph.get_callers(symbol_id);

    let incoming_calls: Vec<CallHierarchyIncomingCall> = callers
        .iter()
        .filter_map(|call_site| {
            let caller = index.symbols.get(call_site.caller)?;
            Some(CallHierarchyIncomingCall {
                from: CallHierarchyItem {
                    name: caller.name.clone(),
                    kind: symbol_kind_to_lsp(caller.kind),
                    detail: Some(caller.qualified_name.clone()),
                    uri: caller.location.uri.clone(),
                    range: range_to_serializable(&caller.location.range),
                    selection_range: range_to_serializable(&caller.location.selection_range),
                    data: Some(json!({ "symbolId": caller.id.0 })),
                },
                from_ranges: vec![range_to_serializable(&call_site.location.range)],
            })
        })
        .collect();

    Response::success(id, json!(incoming_calls))
}

/// Handle callHierarchy/outgoingCalls
pub fn handle_outgoing_calls(state: &State, params: &Value, id: Option<RequestId>) -> Response {
    let params: CallHierarchyOutgoingCallsParams = match serde_json::from_value(params.clone()) {
        Ok(p) => p,
        Err(e) => {
            return Response::error(
                id,
                crate::protocol::error_codes::INVALID_PARAMS,
                format!("Invalid outgoingCalls params: {}", e),
            );
        }
    };

    if !state.is_smart_mode() {
        return Response::success(id, json!([]));
    }

    let indexer = match state.get_indexer() {
        Some(i) => i,
        None => return Response::success(id, json!([])),
    };

    // Get symbol ID from item data
    let symbol_id = params
        .item
        .data
        .as_ref()
        .and_then(|d| d.get("symbolId"))
        .and_then(|v| v.as_u64())
        .map(logos_index::SymbolId);

    let symbol_id = match symbol_id {
        Some(id) => id,
        None => return Response::success(id, json!([])),
    };

    let index = indexer.get_index();

    // Find callees
    let callees = index.call_graph.get_callees(symbol_id);

    let outgoing_calls: Vec<CallHierarchyOutgoingCall> = callees
        .iter()
        .filter_map(|call_site| {
            let callee = index.symbols.get(call_site.callee)?;
            Some(CallHierarchyOutgoingCall {
                to: CallHierarchyItem {
                    name: callee.name.clone(),
                    kind: symbol_kind_to_lsp(callee.kind),
                    detail: Some(callee.qualified_name.clone()),
                    uri: callee.location.uri.clone(),
                    range: range_to_serializable(&callee.location.range),
                    selection_range: range_to_serializable(&callee.location.selection_range),
                    data: Some(json!({ "symbolId": callee.id.0 })),
                },
                from_ranges: vec![range_to_serializable(&call_site.location.range)],
            })
        })
        .collect();

    Response::success(id, json!(outgoing_calls))
}

fn range_to_serializable(range: &logos_core::Range) -> SerializableRange {
    SerializableRange {
        start: SerializablePosition {
            line: range.start.line,
            character: range.start.column,
        },
        end: SerializablePosition {
            line: range.end.line,
            character: range.end.column,
        },
    }
}

fn symbol_kind_to_lsp(kind: logos_core::SymbolKind) -> i32 {
    use logos_core::SymbolKind;
    match kind {
        SymbolKind::File => 1,
        SymbolKind::Module => 2,
        SymbolKind::Namespace => 3,
        SymbolKind::Package => 4,
        SymbolKind::Class => 5,
        SymbolKind::Method => 6,
        SymbolKind::Property => 7,
        SymbolKind::Field => 8,
        SymbolKind::Constructor => 9,
        SymbolKind::Enum => 10,
        SymbolKind::Interface => 11,
        SymbolKind::Function => 12,
        SymbolKind::Variable => 13,
        SymbolKind::Constant => 14,
        SymbolKind::String => 15,
        SymbolKind::Number => 16,
        SymbolKind::Boolean => 17,
        SymbolKind::Array => 18,
        SymbolKind::Object => 19,
        SymbolKind::Key => 20,
        SymbolKind::Null => 21,
        SymbolKind::EnumMember => 22,
        SymbolKind::Struct => 23,
        SymbolKind::Event => 24,
        SymbolKind::Operator => 25,
        SymbolKind::TypeParameter => 26,
    }
}
