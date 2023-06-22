use actix_web::{web, App, HttpResponse, HttpRequest, HttpServer, Responder};
use actix_web::http::header;
use reqwest::header::HeaderMap;
use reqwest::Client;
use actix_cors::Cors;
use regex::Regex;

const BASE_URL: &str = "https://amp-api.music.apple.com";

async fn base(req: HttpRequest) -> HeaderMap {
    let headers_from_user = req.headers();
    let mut headers = HeaderMap::new();

    for (header_name, header_value) in headers_from_user.iter() {
        match header_name {
            &header::CONTENT_LENGTH => {},
            &header::HOST => {},
            &header::CONNECTION => {},
            &header::ACCEPT => {},
            &header::USER_AGENT => {},
            &header::REFERER => {},
            &header::ACCEPT_ENCODING => {},
            &header::ACCEPT_LANGUAGE => {},
            &header::COOKIE => {},
            &header::CACHE_CONTROL => {},
            &header::PRAGMA => {},
            &header::DNT => {},
            &header::UPGRADE_INSECURE_REQUESTS => {},
            &header::ACCESS_CONTROL_REQUEST_METHOD => {},
            &header::ACCESS_CONTROL_REQUEST_HEADERS => {},
            _ => {
                headers.insert(header_name.clone(), header_value.clone());
            }
        }
    }

    headers.insert(header::ACCEPT, "application/json".parse().unwrap());
    headers.insert(header::USER_AGENT, "musicnya/1.0.0".parse().unwrap());
    headers.insert(header::CONTENT_TYPE, "application/json".parse().unwrap());
    headers.insert(header::ORIGIN, "https://beta.music.apple.com".parse().unwrap());
    
    headers
}

async fn library_albums(client: web::Data<Client>, req: HttpRequest, path: web::Path<(String,)>) -> impl Responder {
    let headers: HeaderMap = base(req.clone()).await;
    let endpoint = &path.0;

    let url = format!("{}{}", BASE_URL.clone(), "/".to_owned() + endpoint + "?" + req.clone().query_string());

    let response = client
        .get(&url)
        .headers(headers)
        .send()
        .await;

        match response {
            Ok(res) => {
                let replacements = [
                    (r"\{w\}x\{h\}", "400x400"),
                    (r"\{f\}", "webp")
                ];

                let mut result = String::from(res.text().await.unwrap());
                
                HttpResponse::Ok().body(result)
            }
            Err(err) => {
                eprintln!("Error: {:?}", err);
                HttpResponse::InternalServerError().finish()
            }
        }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let client = reqwest::Client::new();

    HttpServer::new(move|| {
        let cors = Cors::default().allow_any_origin().send_wildcard().allowed_methods(vec!["GET", "POST", "OPTIONS"]).allow_any_header().max_age(3600);

        App::new()
            .wrap(cors)
            .data(client.clone())
            .route("/{path:.*}", web::get().to(library_albums))
    })
    .bind("localhost:3001")?
    .run()
    .await
}