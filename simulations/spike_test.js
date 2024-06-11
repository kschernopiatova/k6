import * as scenarios from "../scenarios.js"

export const options = {
  thresholds: {
    http_req_failed: [{ threshold: "rate<0.01", abortOnFail: true }],
    http_req_duration: ["p(99)<400"],
  },
  systemTags: ['method', 'url', 'error', 'scenario'],
  scenarios: {
    spike: {
      executor: 'ramping-vus',
          startVUs: 0,
          stages: [
              { duration: '20s', target: 300 },
              { duration: '1m', target: 300 },
              { duration: '20s', target: 0 },
          ]
    }
  },
};

export default function () {
  scenarios.default_scenario()
}

