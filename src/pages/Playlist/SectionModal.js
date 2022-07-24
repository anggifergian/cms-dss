import CreateModal from "./components/CreateModal";
import EditModal from "./components/EditModal";
import PreviewModal from "./components/PreviewModal";

const SectionModal = ({
  modalType,
  handleCloseModal,
  visible,
  data = {}
}) => {
  switch (modalType) {
    case 'create':
      return <CreateModal visible={visible} onClose={handleCloseModal} />
    case 'edit':
      return <EditModal visible={visible} onClose={handleCloseModal} data={data} />
    case 'preview':
      return <PreviewModal visible={visible} onClose={handleCloseModal} data={data} />
    default:
      return <></>
  }
}

export default SectionModal