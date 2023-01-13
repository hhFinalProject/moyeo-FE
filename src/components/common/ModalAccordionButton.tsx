import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';

import useShowModalAccordion from '../../hooks/useShowModalAccordion';
import { PostForm } from '../../types/AppTypes';
import ModalAccordion from './ModalAccordion';

export default function ModalAccordionButton({
  name,
  postForm,
  onClickConfirm,
}: {
  name: string;
  postForm: any;
  onClickConfirm: (e: React.ChangeEvent<HTMLFormElement>, callback: () => void) => void;
}) {
  const { id } = useParams();

  const { modals, handleShowModal, handleCloseModal } = useShowModalAccordion();
  const currModal = modals.find((modal) => modal.name === name);

  return (
    <>
      {currModal && (
        <>
          <label htmlFor={currModal.name}>{currModal.title}</label>
          <button
            type="button"
            disabled={(id && name === 'category') || (id && name === 'category') ? true : false}
            onClick={() => handleShowModal(currModal.name)}
          >
            {postForm[currModal.name] ? postForm[currModal.name] : currModal.content}
          </button>
          {currModal.isOpen &&
            createPortal(
              <ModalAccordion
                name={currModal.name}
                title={currModal.title}
                options={currModal.options}
                onClickConfirm={(e) => onClickConfirm(e, () => handleCloseModal(name))}
                onClose={() => handleCloseModal(name)}
              />,
              document.body
            )}
        </>
      )}
    </>
  );
}