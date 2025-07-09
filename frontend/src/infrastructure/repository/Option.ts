import FetchTransport from "../transport/fetch.transport.ts";
import OptionRepositoryInterface from "./Option.interface.ts";
import { Option } from '../../domain/entities'

export default class OptionRepository implements OptionRepositoryInterface {
  /**
   * Transport that is used to deliver the data
   */
  transport: FetchTransport;

  constructor(transport: FetchTransport) {
    this.transport = transport
  }

  public async getAllOptions(): Promise<Option[]> {
    const res = await this.transport.get<{ data: Option[]}>('/options/');

    const options = res.data.map((option: Option) => {
      option = JSON.parse(JSON.stringify(option))
      return {
        title: option.title,
        value: option.value,
      }
    });

    return options
  }
}