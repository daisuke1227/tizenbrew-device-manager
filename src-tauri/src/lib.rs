mod adb_client_cmd;

use std::vec;
use tauri_plugin_http;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            adb_client_cmd::connect,
            adb_client_cmd::shell,
            adb_client_cmd::push,
            adb_client_cmd::run_daemon_command,
            adb_client_cmd::disconnect
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
