use actix_web::{
    web::{get, resource, Data, ServiceConfig},
    HttpResponse,
};

use crate::repos::{pages_getter, routes_getter};

pub fn app_config(config: &mut ServiceConfig, resources_prefix: &String) {
    config
        .app_data(Data::new(AppData {
            resources_prefix: resources_prefix.to_owned(),
        }))
        .service(resource("/api/links").route(get().to(get_routes)))
        .service(resource("/api/about").route(get().to(get_about)))
        .service(resource("/api/projects").route(get().to(get_projects)))
        .service(resource("/api/home").route(get().to(get_home)));
}

//Handlers
async fn get_routes(data: Data<AppData>) -> HttpResponse {
    return HttpResponse::Ok().json(routes_getter(data.resources_prefix.clone()));
}

//TODO: REFACTOR THIS FOR MAKING IT MORE GENERIC
// For now I rather keeping it like this, looks cleaner, even tho Is pretty repeatitive
async fn get_projects(data: Data<AppData>) -> HttpResponse {
    return HttpResponse::Ok().json(pages_getter(
        format!("{}/json/projects.json", data.resources_prefix).as_str(),
        format!("{}/md/projects.md", data.resources_prefix).as_str(),
        "Projects",
    ));
}

async fn get_home(data: Data<AppData>) -> HttpResponse {
    return HttpResponse::Ok().json(pages_getter(
        format!("{}/json/home.json", data.resources_prefix).as_str(),
        format!("{}/md/home.md", data.resources_prefix).as_str(),
        "Home",
    ));
}

async fn get_about(data: Data<AppData>) -> HttpResponse {
    return HttpResponse::Ok().json(pages_getter(
        format!("{}/json/about.json", data.resources_prefix).as_str(),
        format!("{}/md/about.md", data.resources_prefix).as_str(),
        "About",
    ));
}

struct AppData {
    resources_prefix: String,
}
