import { Stack, useFocusIdx } from "easy-email-editor";
import {
  AttributesPanelWrapper,
  ColorPickerField,
} from "easy-email-extensions";
import React from "react";

export function Panel() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper style={{ padding: "20px" }}>
      <Stack vertical>
        <ColorPickerField
          label="Text color"
          name={`${focusIdx}.attributes.text-color`}
          inline
        />
      </Stack>
    </AttributesPanelWrapper>
  );
}
