import type JSONValue from './types/JSONValue';
import type { POSTParams } from './types/POSTParams';

/**
 * Additional options for fetch transport
 */
export interface FetchTransportOptions {
  /**
   * Error formatter to create an Error based on status and payload
   */
  errorFormatter?: (status: number, payload: JSONValue, endpoint: string) => Error;
}

/**
 * Fetch transport to make HTTP requests
 */
export default class FetchTransport {
  /**
   * Common headers for all requests
   * For example, may contain authorization
   */
  protected readonly headers = new Headers();

  /**
   * Fetch constructor
   * @param baseUrl - Base URL
   * @param options - Transport options
   */
  constructor(
    private readonly baseUrl: string,
    private readonly options?: FetchTransportOptions
  ) {}

  /**
   * Gets specific resource
   * @template Response - Response data type
   * @param endpoint - API endpoint
   * @param data - data to be sent url encoded
   */
  public async get<Payload>(endpoint: string, data?: JSONValue): Promise<Payload> {
    const resourceUrl = new URL(this.baseUrl + endpoint);

    if (data !== undefined) {
      resourceUrl.search = new URLSearchParams(data as Record<string, string>).toString();
    }

    const response = await fetch(resourceUrl.toString(), {
      method: 'GET',
      headers: this.headers,
    });

    return this.parseResponse(response, endpoint) as Payload;
  }

  /**
   * Make POST request to update some resource
   * @template Response - Response data type
   * @param params - API endpoint, payload and files
   */
  public async post<Payload>({
    endpoint,
    payload,
  }: POSTParams): Promise<Payload> {
    const body = payload ? JSON.stringify(payload) : undefined;
  
    const headers = new Headers(this.headers);
    if (body) {
      headers.set('Content-Type', 'application/json');
    }
  
    const response = await fetch(this.baseUrl + endpoint, {
      method: 'POST',
      headers,
      body,
    });
  
    return this.parseResponse(response, endpoint) as Payload;
  }
  
  /**
   * Check response for errors
   * @param response - Response object
   * @param endpoint - API endpoint used for logging
   * @param isBlob - expected response type is binary
   * @throws Error
   */
  private async parseResponse(response: Response, endpoint: string): Promise<JSONValue> {
    let payload;

    /**
     * Try to parse error data. If it is not valid JSON or Blob, throw error
     */
    try {
      /**
       * In case if we are waiting for binary data, we need to parse response as Blob
       */
      payload = await response.json();
    } catch (error) {
      throw new Error(`The response is not valid JSON (requesting ${endpoint})`);
    }

    /**
     * The 'ok' read-only property of the Response interface contains a Boolean
     * stating whether the response was successful (status in the range 200-299) or not
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
     */
    if (response.ok) {
      return payload;
    }

    /**
     * If error formatter is provided, use it to create an Error based on status and payload
     */
    if (this.options?.errorFormatter !== undefined) {
      throw this.options.errorFormatter(response.status, payload, endpoint);
    } else {
      throw new Error(`${response.statusText || 'Bad response'} (requesting ${endpoint}))`);
    }
  }
}
