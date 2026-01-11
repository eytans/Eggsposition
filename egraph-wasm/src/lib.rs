use egraph_serialize::EGraph;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn parse_egraph(json_str: &str) -> Result<JsValue, JsValue> {
    // Parse JSON into EGraph
    let egraph: EGraph = serde_json::from_str(json_str)
        .map_err(|e| JsValue::from_str(&format!("Failed to parse egraph: {}", e)))?;

    // Convert back to JsValue for use in JavaScript
    serde_wasm_bindgen::to_value(&egraph)
        .map_err(|e| JsValue::from_str(&format!("Failed to convert to JS: {}", e)))
}

#[wasm_bindgen]
pub fn get_node_info(json_str: &str, node_id: &str) -> Result<JsValue, JsValue> {
    let egraph: EGraph = serde_json::from_str(json_str)
        .map_err(|e| JsValue::from_str(&format!("Failed to parse egraph: {}", e)))?;

    // Get the node
    let node_id_internal = egraph_serialize::NodeId::from(node_id.to_string());
    let node = egraph
        .nodes
        .get(&node_id_internal)
        .ok_or_else(|| JsValue::from_str(&format!("Node {} not found", node_id)))?;

    serde_wasm_bindgen::to_value(&node)
        .map_err(|e| JsValue::from_str(&format!("Failed to convert to JS: {}", e)))
}

#[wasm_bindgen]
pub fn get_class_nodes(json_str: &str, class_id: &str) -> Result<JsValue, JsValue> {
    let egraph: EGraph = serde_json::from_str(json_str)
        .map_err(|e| JsValue::from_str(&format!("Failed to parse egraph: {}", e)))?;

    let class_id_internal = egraph_serialize::ClassId::from(class_id.to_string());
    let class = egraph
        .classes()
        .get(&class_id_internal)
        .ok_or_else(|| JsValue::from_str(&format!("Class {} not found", class_id)))?;

    serde_wasm_bindgen::to_value(&class.nodes)
        .map_err(|e| JsValue::from_str(&format!("Failed to convert to JS: {}", e)))
}
