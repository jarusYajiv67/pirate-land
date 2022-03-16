import React from 'react';

import {
  Container,
  Title,
  PlansContainer,
  PlanContainer,
  PlanTitle,
  Plan,
  Wrapper,
  Caption,
} from "./styles";
import Button from '../button';

interface PricingProps {}

const Pricing: React.FC<PricingProps> = () => {
    return (
      <Container>
        <Wrapper>
          <Title>Plans</Title>
          <PlansContainer>
            <PlanContainer>
              <PlanTitle>Free</PlanTitle>
              <Plan>✔️ Account Creation</Plan>
              <Plan>✔️ Name Updation</Plan>
              <Plan>✔️ Island Creation</Plan>
              <Plan>❌ No Advertisements</Plan>
              <Plan>❌ Custom Player Image</Plan>
              <Plan>❌ Voice Chat</Plan>
              <Button
                variant={2}
                text="Subscribe @ 0$/yr"
                onPress={() => null}
              />
            </PlanContainer>
            {/* <VerticalLine /> */}
            <PlanContainer>
              <PlanTitle>Pro</PlanTitle>
              <Plan>✔️ Account Creation</Plan>
              <Plan>✔️ Name Updation</Plan>
              <Plan>✔️ Island Creation</Plan>
              <Plan>✔️ No Advertisements</Plan>
              <Plan>✔️ Custom Player Image</Plan>
              <Plan>✔️ Voice Chat</Plan>
              <Button
                variant={2}
                text="Subscribe @ 5$/yr"
                onPress={() => null}
              />
            </PlanContainer>
            {/* <VerticalLine /> */}
            <PlanContainer>
              <PlanTitle>Premium</PlanTitle>
              <Plan>✔️ Account Creation</Plan>
              <Plan>✔️ Name Updation</Plan>
              <Plan>✔️ Island Creation</Plan>
              <Plan>✔️ No Advertisements</Plan>
              <Plan>❌ Custom Player Image</Plan>
              <Plan>❌ Voice Chat</Plan>
              <Button
                variant={2}
                text="Subscribe @ 3$/yr"
                onPress={() => null}
              />
            </PlanContainer>
          </PlansContainer>
          <Caption>**Terms and Conditions Apply**</Caption>
        </Wrapper>
      </Container>
    );
};

export default Pricing;
