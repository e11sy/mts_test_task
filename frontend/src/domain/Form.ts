import FormRepositoryInterface from '../infrastructure/repository/Form.interface.ts'
import { Form } from './entities/'

export default class OptionService {
  #formRepository: FormRepositoryInterface

  constructor(formRepository: FormRepositoryInterface) {
    this.#formRepository = formRepository;
  }

  public async saveForm(form: Form): Promise<Form> {
    return await this.#formRepository.saveForm(form);
  }
}