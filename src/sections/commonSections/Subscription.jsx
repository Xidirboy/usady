import React from "react";
import { SubscriptionContainer } from "../../styleComponents/sections/commonStyle/SubscriptionStyle";
import SliderSubscription from "../utilsSections/SliderSubscription";

const Subscription = ({ data = {} }) => {
  return (
    <>
      <SubscriptionContainer>
        <SliderSubscription items={data?.items ?? []} />
      </SubscriptionContainer>
    </>
  );
};

export default Subscription;
