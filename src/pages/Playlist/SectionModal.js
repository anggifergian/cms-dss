import CreateModal from "./components/CreateModal";

const SectionModal = ({
  modalType,
  handleCloseModal,
  visible,
  data = {}
}) => {
  switch (modalType) {
    case 'create':
      return <CreateModal visible={visible} onClose={handleCloseModal} />
    default:
      return <></>
  }
}

export default SectionModal