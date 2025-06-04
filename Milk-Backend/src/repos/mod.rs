use utils::parsed_json_content;

use crate::models::{Link, Routes};

mod utils;

//TODO: Finish today before 6 PM

pub fn routes_getter() -> Vec<Link> {
    let route_mapper = parsed_json_content::<Routes>("/resources/json/routes.json");

    return route_mapper.routes;
}
