import styled from "@emotion/styled";
import { useState } from "react";
import SquareButton from "./SquareButton";

const ModalBackground = styled.div`
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

const Modal = styled.div`
  width: 40rem;
  margin: 10% auto;
  background-color: #fbfbfb;
  padding: 2rem;
  border-radius: 1rem;
  position: relative;
  @media (max-width: 768px) {
    width: 30rem;
  }
`;

const ModalTitle = styled.h3`
  color: #3d3e43;
`;

const ModalContent = styled.div`
  margin-top: 1rem;
`;
const ModalContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.end && "flex-end"};
`;

const CloseButton = styled.button`
  background: none;
  color: #aaa;
  border: none;
  position: absolute;
  right: 5%;
  top: 20%;
  &:hover {
    cursor: pointer;
    color: #3d3e43;
  }
`;

const ErrorMessage = styled.span`
  color: #d61c4e;
  font-size: 0.9rem;
  margin-left: 0.5rem;
`;
const Label = styled.label`
  width: 20%;
`;

const Input = styled.input`
  line-height: 1.5rem;
  padding: 0 0.4rem;
  width: 40%;
`;

const CollectionModal = ({
  closeModal,
  onSave,
  title,
  initialName = "",
  showErrorMessage,
  yesButtonText,
}) => {
  const [name, setName] = useState(initialName);
  const saveClicked = () => {
    onSave(name);
  };

  return (
    <ModalBackground>
      <Modal>
        <ModalTitle>{title}</ModalTitle>
        <CloseButton onClick={closeModal}>X</CloseButton>

        <ModalContent>
          <ModalContainer>
            <Label>Name:</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            {showErrorMessage && (
              <ErrorMessage>Name must be unique and not empty.</ErrorMessage>
            )}
          </ModalContainer>
          <ModalContainer end>
            <SquareButton text={"Cancel"} onClick={closeModal} />
            <SquareButton
              type={"dark"}
              text={yesButtonText}
              onClick={saveClicked}
            />
          </ModalContainer>
        </ModalContent>
      </Modal>
    </ModalBackground>
  );
};

export default CollectionModal;
