export class ModalMessageSettings {
  /**
   * Modal Header title
   */
  title: string;

  /**
   * Title of the Yes button in case of confirmation dialog
   */
  yesButtonTitle: string;

  /**
   * Title of the No button in case of confirmation dialog
   */
  noButtonTitle: string;

  /**
   * Title of the Close button in case of blocking dialog
   */
  closeButtonTitle: string;

  /**
   * Function to call when click on Yes confirmation dialog
   */
  onConfirmCallback: Function;

  /**
   * Function to call when click on Close or No button in case of Blocking or Confirmation dialog
   */
  onCancelCallback: Function;

  /**
   * Determine if display the success, warn, ... icon on the header.
   */
  displayIcons = true;
}
