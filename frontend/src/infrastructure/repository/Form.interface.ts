import { Form } from "../../domain/entities";

/**
 * Interface represnets repository level for the form entity
 */
export default interface FormRepositoryInterface {
  /**
   * Method that saves the form
   * @param form - form to be saved
   */
  saveForm(form: Form): Promise<Form>;
}