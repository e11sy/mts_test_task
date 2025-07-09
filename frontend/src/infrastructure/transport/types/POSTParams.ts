import type JSONValue from './JSONValue';

export interface POSTParams {
  endpoint: string;
  payload?: Record<string, JSONValue | undefined>;
}
