import OptionRepositoryInterface from '../infrastructure/repository/Option.interface.ts'
import { Option } from './entities/'

export default class OptionService {
  #optionRepository: OptionRepositoryInterface

  constructor(optionRepository: OptionRepositoryInterface) {
    this.#optionRepository = optionRepository;
  }

  public async getAllOptions(): Promise<Option[]> {
    return await this.#optionRepository.getAllOptions();
  }
}