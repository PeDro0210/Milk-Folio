mod config;
mod endpoints;
mod models;
mod repos;

use actix_cors::Cors;
use actix_web::{App, HttpServer};
use config::Env;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let config = Env::env_init();

    let port = config.port;
    let host = config.host;

    let webview_url = config.webview_url;
    std::env::set_var("RUST_LOG", "debug");
    env_logger::init();

    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin(&webview_url)
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);

        //TODO: Add configurations
        App::new().wrap(cors)
    })
    .bind((host, port))?
    .run()
    .await
}
