import * as scenarios from "../scenarios.js"

export const options = {
  thresholds: {
    http_req_failed: [{ threshold: "rate<0.01", abortOnFail: true }],
    http_req_duration: ["p(99)<400"],
  },
  systemTags: ['method', 'url', 'error', 'scenario'],
  scenarios: {
    load: {
      executor: 'constant-arrival-rate',
      duration: '3m',
      rate: 15,
      timeUnit: '1s',
      preAllocatedVUs: 800,
    }
  },
};

export default function () {
  scenarios.default_scenario()
}

