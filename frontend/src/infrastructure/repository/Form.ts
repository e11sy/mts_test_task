import FetchTransport from "../transport/fetch.transport.ts";
import FormRepositoryInterface from "./Form.interface.ts";
import { Form } from '../../domain/entities'

export default class FormRepository implements FormRepositoryInterface {
  /**
   * Transport that is used to deliver the data
   */
  transport: FetchTransport;

  constructor(transport: FetchTransport) {
    this.transport = transport
  }

  public async saveForm(form: Form): Promise<Form> {
    const res = await this.transport.post<{ data: Form }>({
      endpoint: '/forms',
      payload: {
        data: {
          content: form.content,
        },
      },
    });
  
    return res.data;
  }
  
}