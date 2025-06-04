use std::{
    fs::{self, File},
    io::BufReader,
    path,
};

use serde_json::{from_reader, from_str};

use crate::models::{Link, Projects, Routes};

//TODO: check the output of this mardown
pub fn return_parsed_md(path_file: &str) -> String {
    return fs::read_to_string(path_file).expect("Wtf is that file");
}

pub fn return_parsed_routes(path_file: &str) -> Routes {
    let file = File::open(path_file).expect("Could find File");
    let reader = BufReader::new(file);

    return from_reader(reader).expect("Wtf is this file");
}

pub fn return_parsed_projects(path_file: &str) -> Projects {
    let file = File::open(path_file).expect("Could find File");
    let reader = BufReader::new(file);

    return from_reader(reader).expect("Wtf is this file");
}
