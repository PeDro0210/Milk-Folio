mod config;
mod endpoints;
mod models;
mod repos;

use actix_cors::Cors;
use actix_web::{guard::Get, App, HttpServer};
use config::Env;
use endpoints::app_config;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let config = Env::env_init();

    let port = config.port;
    let host = config.host;

    let webview_url = config.webview_url;

    // I'll rather inject in it
    std::env::set_var("RUST_LOG", "debug");
    env_logger::init();

    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_method()
            .allow_any_origin()
            .allow_any_header();

        //TODO: Add configurations
        App::new()
            .configure(|service_config| app_config(service_config, &config.resources_prefix))
            .wrap(cors)
    })
    .bind((host, port))?
    .run()
    .await
}
