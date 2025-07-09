import FormService from './Form.ts';
import OptionService from './Option.ts'

import FormRepository from '../infrastructure/repository/Form.ts'
import OptionRepository from '../infrastructure/repository/Option.ts';

import FormRepositoryInterface from '../infrastructure/repository/Form.interface.ts';
import OptionRepositoryInterface from '../infrastructure/repository/Option.interface.ts';

import FetchTransport from '../infrastructure/transport/fetch.transport.ts';

const apiTransport: FetchTransport = new FetchTransport(import.meta.env.VITE_API_URL);

const formRepository: FormRepositoryInterface = new FormRepository(apiTransport);
const optionRepository: OptionRepositoryInterface = new OptionRepository(apiTransport);

const formService: FormService = new FormService(formRepository);
const optionService: OptionService = new OptionService(optionRepository);

export {
  formService,
  optionService,
}

