"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import Modal from "../Modal";

const WriteModal = () => {
  const { isWriteModalOpen, setIsWriteModalOpen } = useGlobalContext();
  return (
    <Modal isOpen={isWriteModalOpen} close={() => setIsWriteModalOpen(false)}>
      hello from write modal
    </Modal>
  );
};

export default WriteModal;
