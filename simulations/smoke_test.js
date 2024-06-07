import * as scenarios from "../scenarios.js"

export const options = {
  thresholds: {
    http_req_failed: [{ threshold: "rate<0.01", abortOnFail: true }],
    http_req_duration: ["p(99)<400"],
  },
  systemTags: ['method', 'url', 'error', 'scenario'],
  scenarios: {
    smoke: {
        executor: 'shared-iterations',
        vus: 5,
        iterations: 5,
        maxDuration: '1m',
    }
  },
};

export default function () {
  scenarios.default_scenario()
}

