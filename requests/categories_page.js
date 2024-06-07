import { check } from "k6";
import http from "k6/http";
import { params, base_url } from "./headers.js"
import { response_time_trend } from "./custom_metrics.js";
import { sleep } from "k6"

export var categories = []
export var random_category = ""
export var product_ids = []

export function get_categories() {
    const res = http.get(`${base_url}/eshop/control/category/all`, params);
    categories = res.json("categories.#.id")
    response_time_trend.add(res.timings.duration)
    check(res, {
        "response code is 200 (get_categories)": (res) => res.status == 200,
        "response isn't null (categories)": (res) => res.json("categories") != null,
        "categories count is 6": (res) => res.json("categories.#") == 6,
    });
    sleep(1)
}

export function get_category_products() {
    random_category = categories[Math.floor(Math.random()*categories.length)];
    const res = http.get(`${base_url}/eshop/control/category/${random_category}/products`, params);
    response_time_trend.add(res.timings.duration)
    product_ids = res.json("products.#.id")
    check(res, {
        "response code is 200 (get products)": (res) => res.status == 200,
    });
    sleep(1)
}