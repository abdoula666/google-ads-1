import { useState } from 'react';
import styled from 'styled-components';

const BillingContainer = styled.div`
  background: white;
  border: 1px solid #c3c4c7;
  border-radius: 4px;
  padding: 24px;
  margin-top: 20px;
`

const BillingButton = styled.button`
  background: #2271b1;
  color: white;
  border: 1px solid #2271b1;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #135e96;
    border-color: #135e96;
  }
`

const Modal = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`

const ModalContent = styled.div`
  position: relative;
  background: white;
  margin: 5% auto;
  padding: 24px;
  width: 90%;
  max-width: 600px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #50575e;
  
  &:hover {
    color: #1d2327;
  }
`

const InfoSection = styled.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const InfoTitle = styled.h3`
  font-size: 14px;
  color: #50575e;
  margin: 0 0 8px;
  font-weight: normal;
`

const InfoValue = styled.p`
  font-size: 16px;
  color: #1d2327;
  margin: 0;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`

const ActionButton = styled(BillingButton)`
  font-size: 13px;
  padding: 6px 12px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  font-size: 14px;
  color: #50575e;
`

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #8c8f94;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    border-color: #2271b1;
    box-shadow: 0 0 0 1px #2271b1;
    outline: none;
  }
`

interface CardInfo {
  organizationName: string;
  fullName: string;
  address: string;
  cardNumber: string;
  expireDate: string;
}

interface Props {
  defaultCard: CardInfo;
}

const BillingInformation: React.FC<Props> = ({ defaultCard }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cards, setCards] = useState<CardInfo[]>([defaultCard]);

  const handleAddCard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCard: CardInfo = {
      organizationName: formData.get('organizationName') as string,
      fullName: formData.get('fullName') as string,
      address: formData.get('address') as string,
      cardNumber: formData.get('cardNumber') as string,
      expireDate: formData.get('expireDate') as string,
    };
    setCards([...cards, newCard]);
    setIsAddingCard(false);
  };

  const handleRemoveCard = (index: number) => {
    if (index === 0) return; // Prevent removing default card
    const newCards = cards.filter((_, i) => i !== index);
    setCards(newCards);
  };

  return (
    <BillingContainer>
      <BillingButton onClick={() => setIsModalOpen(true)}>
        Billing Account Information
      </BillingButton>

      <Modal isOpen={isModalOpen}>
        <ModalContent>
          <CloseButton onClick={() => {
            setIsModalOpen(false);
            setIsAddingCard(false);
          }}>×</CloseButton>

          {!isAddingCard ? (
            <>
              {cards.map((card, index) => (
                <div key={index}>
                  <InfoSection>
                    <InfoTitle>Organization Name</InfoTitle>
                    <InfoValue>{card.organizationName}</InfoValue>
                  </InfoSection>
                  <InfoSection>
                    <InfoTitle>Full Name</InfoTitle>
                    <InfoValue>{card.fullName}</InfoValue>
                  </InfoSection>
                  <InfoSection>
                    <InfoTitle>Address</InfoTitle>
                    <InfoValue>{card.address}</InfoValue>
                  </InfoSection>
                  <InfoSection>
                    <InfoTitle>Card Information</InfoTitle>
                    <InfoValue>
                      {card.cardNumber} (Expires: {card.expireDate})
                    </InfoValue>
                  </InfoSection>
                  {index !== 0 && (
                    <ActionButton onClick={() => handleRemoveCard(index)}>
                      Remove Card
                    </ActionButton>
                  )}
                  <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #f0f0f1' }} />
                </div>
              ))}
              
              <ButtonGroup>
                <ActionButton onClick={() => setIsAddingCard(true)}>
                  Add New Card
                </ActionButton>
              </ButtonGroup>
            </>
          ) : (
            <Form onSubmit={handleAddCard}>
              <FormGroup>
                <Label htmlFor="organizationName">Organization Name</Label>
                <Input
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="address">Address</Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  pattern="\d{16}"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="expireDate">Expiration Date</Label>
                <Input
                  type="text"
                  id="expireDate"
                  name="expireDate"
                  placeholder="MM/YY"
                  pattern="\d{2}/\d{2}"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  type="text"
                  id="cvv"
                  name="cvv"
                  pattern="\d{3,4}"
                  required
                />
              </FormGroup>
              <ButtonGroup>
                <ActionButton type="submit">Save Card</ActionButton>
                <ActionButton type="button" onClick={() => setIsAddingCard(false)}>
                  Cancel
                </ActionButton>
              </ButtonGroup>
            </Form>
          )}
        </ModalContent>
      </Modal>
    </BillingContainer>
  );
};

export default BillingInformation;