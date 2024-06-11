import * as scenarios from "../scenarios.js"

export const options = {
  thresholds: {
    http_req_failed: [{ threshold: "rate<0.01", abortOnFail: true }],
    http_req_duration: ["p(99)<400"],
  },
  systemTags: ['status', 'method', 'url', 'error', 'scenario'],
  scenarios: {
    breakpoint: {
      executor: 'ramping-vus',
      startVUs: 0,
          stages: [
              { duration: '30m', target: 3000 }
          ]
    }
  },
};

export default function () {
  scenarios.default_scenario()
}

