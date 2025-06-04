use actix_web::web::{self, resource, ServiceConfig};

pub fn app_config(config: &mut ServiceConfig) {
    config
        .service(resource("/links"))
        .service(resource("/about"))
        .service(resource("/projects"))
        .service(resource("/home"));
}
