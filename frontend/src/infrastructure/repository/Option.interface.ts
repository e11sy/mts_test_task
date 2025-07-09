import { Option } from "../../domain/entities";

/**
 * Interface represnets repository level for the option entity
 */
export default interface OptionRepositoryInterface {
  /**
   * Method that returns list of options
   */
  getAllOptions(): Promise<Option[]>;
}