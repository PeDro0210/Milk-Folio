use actix_web::{
    web::{get, resource, ServiceConfig},
    HttpResponse,
};

use crate::repos::routes_getter;

pub fn app_config(config: &mut ServiceConfig) {
    config
        .service(resource("/links").route(get().to(get_routes)))
        .service(resource("/about"))
        .service(resource("/projects"))
        .service(resource("/home"));
}

//Handlers
async fn get_routes() -> HttpResponse {
    return HttpResponse::Ok().json(routes_getter());
}
