import { check } from "k6";
import http from "k6/http";
import { params, base_url } from "./headers.js"
import { response_time_trend } from "./custom_metrics.js";
import { sleep } from "k6"

export function open_home_page() {
    const res = http.get(`${base_url}/eshop`, params);
    response_time_trend.add(res.timings.duration)
    check(res, {
        "response code is 200 (open home page)": (res) => res.status == 200});
    sleep(1)
}