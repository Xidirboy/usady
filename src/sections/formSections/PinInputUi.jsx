import { HStack, PinInput, PinInputField } from "@chakra-ui/react";
import React from "react";

const PinInputUi = () => {
  return (
    <div>
      <HStack>
        <PinInput>
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>
    </div>
  );
};

export default PinInputUi;
