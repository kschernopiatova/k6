import * as scenarios from "../scenarios.js"

export const options = {
  thresholds: {
    http_req_failed: [{ threshold: "rate<0.01", abortOnFail: true }],
    http_req_duration: ["p(99)<400"],
  },
  systemTags: ['status', 'method', 'url', 'error', 'scenario'],
  scenarios: {
    breakpoint: {
      executor: 'ramping-arrival-rate',
      startRate: 300,
      timeUnit: '1m',
      preAllocatedVUs: 300,
      stages: [
      { target: 3000, duration: '1m' },
      { target: 6000, duration: '2m' },
      { target: 10000, duration: '4m' },
      { target: 60, duration: '2m' },
      ],
    }
  },
};

export default function () {
  scenarios.default_scenario()
}

