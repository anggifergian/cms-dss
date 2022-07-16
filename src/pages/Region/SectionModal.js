import CreateModal from "../Region/components/CreateModal"

const SectionModal = ({
  modalType,
  handleCloseModal,
  visible,
}) => {
  switch (modalType) {
    case 'create':
      return <CreateModal visible={visible} onClose={handleCloseModal} />
    default:
      return <></>
  }
}

export default SectionModal