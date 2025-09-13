use utils::{parsed_json_content, parsed_md};

use crate::models::{Content, GeneralJson, JsonContentLinks, Link, Routes};

mod utils;

//TODO: Finish today before 6 PM

pub fn routes_getter() -> Vec<Link> {
    // All of this will
    let route_mapped = parsed_json_content::<Routes>("/resources/json/routes.json");

    return route_mapped.routes;
}

pub fn pages_getter(json_path: &str, md_path: &str, page_title: &str) -> Vec<Content> {
    let mut actual_key_value: i32 = 0;
    let mut result: Vec<Content> = vec![];

    let projects_mapped = parsed_json_content::<GeneralJson>(json_path);
    let project_markdown_mapped = parsed_md(md_path);

    //Pushes the markdown at first
    result.push(Content {
        key: actual_key_value,
        title: page_title.to_string(),
        content: project_markdown_mapped,
        content_type: "markdown".to_string(), //Idunno how I will mapped this on ts, but fuck it
        link_redirection: None,
    });

    for project in projects_mapped.data {
        actual_key_value += 1;
        result.push(Content {
            key: actual_key_value,
            title: project.title.clone(),
            content: project.content.clone(),
            content_type: "image".to_string(), //Idunno how I will mapped this on ts, but fuck it
            link_redirection: Some(project.link_redirection.clone()), //Will return a redirection link in here
        });
    }

    return result;
}
