use actix_web::{web, App, HttpResponse, HttpRequest, HttpServer, Responder, http::header};
use reqwest::header::HeaderMap;
use reqwest::Client;
use actix_cors::Cors;

const BASE_URL: &str = "https://amp-api.music.apple.com";

async fn base(req: HttpRequest) -> HeaderMap {
    let headers_from_user = req.headers();
    let mut headers = HeaderMap::new();

    for (header_name, header_value) in headers_from_user.iter() {
        if !matches!(header_name,
                     &header::CONTENT_LENGTH |
                     &header::HOST |
                     &header::CONNECTION |
                     &header::ACCEPT |
                     &header::USER_AGENT |
                     &header::REFERER |
                     &header::ACCEPT_ENCODING |
                     &header::ACCEPT_LANGUAGE |
                     &header::COOKIE |
                     &header::CACHE_CONTROL |
                     &header::PRAGMA |
                     &header::DNT |
                     &header::UPGRADE_INSECURE_REQUESTS |
                     &header::ACCESS_CONTROL_REQUEST_METHOD |
                     &header::ACCESS_CONTROL_REQUEST_HEADERS) {
            headers.insert(header_name.clone(), header_value.clone());
        }
    }

    headers.insert(header::ACCEPT, "application/json".parse().unwrap());
    headers.insert(header::USER_AGENT, "musicnya/1.0.0".parse().unwrap());
    headers.insert(header::CONTENT_TYPE, "application/json".parse().unwrap());
    headers.insert(header::ORIGIN, "https://beta.music.apple.com".parse().unwrap());

    headers
}

async fn musickit_request(client: web::Data<Client>, req: HttpRequest, path: web::Path<(String,)>, method: &str) -> impl Responder {
    let headers = base(req.clone()).await;
    let endpoint = &path.0;

    let query_string = req.query_string();
    let url = if query_string.is_empty() {
        format!("{}{}", BASE_URL, "/".to_owned() + endpoint)
    } else {
        format!("{}{}", BASE_URL, "/".to_owned() + endpoint + "?" + &query_string)
    };

    let response = match method {
        "GET" => client.get(&url).headers(headers).send().await,
        "DELETE" => client.delete(&url).headers(headers).send().await,
        "POST" => client.post(&url).headers(headers).send().await,
        _ => unreachable!(),
    };

    match response {
        Ok(res) => HttpResponse::Ok().body(res.text().await.unwrap()),
        Err(err) => {
            eprintln!("Error: {:?}", err);
            HttpResponse::InternalServerError().body(err.to_string())
        }
    }
}

async fn musickit(client: web::Data<Client>, req: HttpRequest, path: web::Path<(String,)>) -> impl Responder {
    musickit_request(client, req, path, "GET").await
}

async fn musickit_del(client: web::Data<Client>, req: HttpRequest, path: web::Path<(String,)>) -> impl Responder {
    musickit_request(client, req, path, "DELETE").await
}

async fn musickit_post(client: web::Data<Client>, req: HttpRequest, path: web::Path<(String,)>) -> impl Responder {
    musickit_request(client, req, path, "POST").await
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let client = reqwest::Client::new();

    HttpServer::new(move|| {
        let cors = Cors::default().allow_any_origin().send_wildcard().allow_any_method().allow_any_header().max_age(3600);
        App::new()
            .wrap(cors)
            .data(client.clone())
            .route("/{path:.*}", web::delete().to(musickit_del))
            .route("/{path:.*}", web::post().to(musickit_post))
            .route("/{path:.*}", web::get().to(musickit))
    })
    .bind("localhost:3001")?
    .run()
    .await
}
