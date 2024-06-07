import { check } from "k6";
import http from "k6/http";
import { params, base_url } from "./headers.js"
import * as user_info from "./user_info.js"
import { response_time_trend } from "./custom_metrics.js";
import { sleep } from "k6"

export function submit_purchase() {
    const phone = Math.floor(Math.random()*10000000)
    const cc_number = Math.floor(Math.random()*10000000)
    const payload = JSON.stringify({
        name: `${user_info.random_name}`,
        email: `${user_info.random_email}`,
        phone: `${phone}`,
        address: `${user_info.random_address}`,
        ccNumber: `${cc_number}`
      });
    const res = http.post(`${base_url}/eshop/control/checkout/purchase/submit`, payload, params);
    response_time_trend.add(res.timings.duration)
    check(res, {
        "response code is 200 (add to cart)": (res) => res.status == 200});
    sleep(1)
}