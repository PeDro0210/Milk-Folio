use std::{
    fs::{self, File},
    io::BufReader,
};

use serde::de::DeserializeOwned;
use serde_json::from_reader;

//TODO: check the output of this mardown
pub fn parsed_md(path_file: &str) -> String {
    return fs::read_to_string(path_file).expect("Wtf is that file");
}

pub fn parsed_json_content<ObjectMapper>(path_file: &str) -> ObjectMapper
where
    ObjectMapper: DeserializeOwned,
{
    let file = File::open(path_file).expect("Could find File");
    let reader = BufReader::new(file);

    return from_reader(reader).expect("Wtf is this file");
}
