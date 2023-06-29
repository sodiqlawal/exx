import { useState } from "react";

/**
 *
 * @param initialMode The default state of the modal, true means the modal is open,
 * and false means it is closed by default
 */

export interface ModalController {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

function useModal(initialMode = false): ModalController {
  const [isOpen, setModalOpen] = useState(initialMode);

  /**
   * Toggle between show and hide
   */
  const toggle = () => {
    setModalOpen(!isOpen);
  };
  /**

  /**
   * Show the modal
   */
  const open = () => {
    setModalOpen(true);
  };

  /**
   * Hide the modal
   */
  const close = () => {
    setModalOpen(false);
  };

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}

export default useModal;
