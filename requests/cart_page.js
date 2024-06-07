import { check } from "k6";
import http from "k6/http";
import { params, base_url } from "./headers.js"
import { product_ids } from "./categories_page.js";
import { response_time_trend } from "./custom_metrics.js";
import { sleep } from "k6"

export var products_in_cart = []

export function add_to_cart() {
    const random_product = product_ids[Math.floor(Math.random()*product_ids.length)];
    const payload = JSON.stringify({
        id: `${random_product}`
    });
    const res = http.post(`${base_url}/eshop/control/cart/additem`, payload, params);
    response_time_trend.add(res.timings.duration)
    check(res, {
        "response code is 200 (add to cart)": (res) => res.status == 200});
    sleep(1)
}

export function get_cart_info() {
    const res = http.get(`${base_url}/eshop/control/cart/getInfo`, params);
    response_time_trend.add(res.timings.duration)
    products_in_cart = res.json("cartInfo.cartItems.#.product.id")
    check(res, {
        "response code is 200 (get cart)": (res) => res.status == 200});
    sleep(1)
}

export function remove_from_cart() {
    const random_product = products_in_cart[Math.floor(Math.random()*products_in_cart.length)];
    const payload = JSON.stringify({
        id: `${random_product}`
    });
    const res = http.del(`${base_url}/eshop/control/cart/removeitem`, payload, params)
    response_time_trend.add(res.timings.duration)
    check(res, {
        "response code is 200 (delete from cart)": (res) => res.status == 200,
        "remove product is correct": (res) => res.json("removedProductId") == random_product});
    sleep(1)
}

export function update_quantity() {
    const quantity = Math.floor(Math.random()*10)
    const random_product = products_in_cart[Math.floor(Math.random()*products_in_cart.length)];
    const payload = JSON.stringify({
        id: `${random_product}`,
        quantity: quantity
    });
    const res = http.post(`${base_url}/eshop/control/cart/updatequantity`, payload, params)
    response_time_trend.add(res.timings.duration)
    check(res, {
        "response code is 200 (delete from cart)": (res) => res.status == 200,
        "quantity is correct": (res) => res.json(`cartInfo.cartItems.#(product.id==${random_product}).quantity`) == quantity});
    sleep(1)
}