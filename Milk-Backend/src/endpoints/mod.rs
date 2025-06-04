use actix_web::{
    web::{get, resource, ServiceConfig},
    HttpResponse,
};

use crate::repos::{pages_getter, routes_getter};

pub fn app_config(config: &mut ServiceConfig) {
    config
        .service(resource("/links").route(get().to(get_routes)))
        .service(resource("/about").route(get().to(get_about)))
        .service(resource("/projects").route(get().to(get_projects)))
        .service(resource("/home").route(get().to(get_home)));
}

//Handlers
async fn get_routes() -> HttpResponse {
    return HttpResponse::Ok().json(routes_getter());
}

// For now I rather keeping it like this, looks cleaner, even tho Is pretty repeatitive
async fn get_projects() -> HttpResponse {
    return HttpResponse::Ok().json(pages_getter(
        "/resources/json/projects.json",
        "/resources/md/projects.md",
    ));
}

async fn get_home() -> HttpResponse {
    return HttpResponse::Ok().json(pages_getter(
        "/resources/json/home.json",
        "/resources/md/home.md",
    ));
}

async fn get_about() -> HttpResponse {
    return HttpResponse::Ok().json(pages_getter(
        "/resources/json/about.json",
        "/resources/md/about.md",
    ));
}
