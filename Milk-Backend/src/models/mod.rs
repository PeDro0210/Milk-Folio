use serde::{Deserialize, Serialize};

// For File Parsing
#[derive(Deserialize, Debug)]
pub struct JsonContentLinks {
    pub title: String,
    pub link_redirection: String,
    pub content: String,
}

// Can make this more generic, but I'm pretty tired
#[derive(Deserialize, Debug)]
pub struct Projects {
    pub projects: Vec<JsonContentLinks>,
}

//Middle Ground
// For parssing 'routes.json'
#[derive(Debug, Serialize, Deserialize)]
pub struct Link {
    pub image: String,
    pub title: String,
    pub link: String,
}

#[derive(Debug, Deserialize)]
pub struct Routes {
    pub routes: Vec<Link>,
}

//Middle Ground

//HTTP-Reponses
#[derive(Debug, Serialize)]
pub struct Content {
    pub title: String,
    pub content: String,
    pub content_type: String,
    pub link_redirection: Option<String>,
}
