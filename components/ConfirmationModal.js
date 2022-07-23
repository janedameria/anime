import styled from "@emotion/styled";
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
  text-align: center;
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

const MyButton = styled.button`
  background-color: ${(props) => props.bgcolor && props.bgcolor};
  color: ${(props) => props.color && props.color};
  padding: 0.5rem 0.8rem;
  border-radius: 0.3rem;
  margin: 0 0.3rem;
  border: none;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const ConfirmationModal = ({ title, closeModal, onYes }) => {
  return (
    <ModalBackground>
      <Modal>
        <ModalTitle>{title}</ModalTitle>
        <CloseButton onClick={closeModal}>X</CloseButton>

        <ModalContent>
          <ModalContainer end>
            <MyButton
              bgcolor={"#413F42"}
              color={"#FBFBFB"}
              onClick={closeModal}
            >
              No
            </MyButton>
            <MyButton
              type={"dark"}
              bgcolor={"#FF1818"}
              color={"#FBFBFB"}
              onClick={onYes}
            >
              Yes
            </MyButton>
          </ModalContainer>
        </ModalContent>
      </Modal>
    </ModalBackground>
  );
};

export default ConfirmationModal;
