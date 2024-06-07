import { Trend } from 'k6/metrics';

export const response_time_trend = new Trend('response_time');