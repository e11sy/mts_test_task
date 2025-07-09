import { Form } from '../../domain/entities';
import { formService } from '../../domain';

interface UseFormsComposableState {
  createForm: (form: Form) => Promise<Form>;
}

export default function useForms(): UseFormsComposableState {

  async function createForm(form: Form): Promise<Form> {
    return await formService.saveForm(form);
  }

  return {
    createForm,
  }
}