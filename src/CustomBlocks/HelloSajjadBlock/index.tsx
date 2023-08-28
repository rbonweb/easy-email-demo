import {
  IBlockData,
  BasicType,
  createCustomBlock,
  mergeBlock,
  components,
  getPreviewClassName,
} from "easy-email-core";
import React from "react";
import { CustomBlocksType } from "../constants";
import { getContentEditableClassName } from "easy-email-editor";

const { Wrapper, Text, Section, Column } = components;

export type IHelloSajjad = IBlockData<
  {
    "text-color": string;
  },
  {
    message: string;
  }
>;

export const HelloSajjad = createCustomBlock<IHelloSajjad>({
  name: "Hello Sajjad",
  type: CustomBlocksType.HELLO_SAJJAD_BLOCK,
  validParentType: [BasicType.PAGE, BasicType.WRAPPER],
  create: (payload) => {
    const defaultData: IHelloSajjad = {
      type: CustomBlocksType.HELLO_SAJJAD_BLOCK,
      data: {
        value: {
          message: "Hello Sajjad",
        },
      },
      attributes: {
        "text-color": "#222222",
      },
      children: [],
    };
    return mergeBlock(defaultData, payload);
  },
  render: ({ data, idx, mode }) => {
    const { message } = data.data.value;
    const textColor = data.attributes["text-color"];
    const attributes = data.attributes;

    return (
      <Wrapper
        padding="20px 0px 20px 0px"
        border="none"
        direction="ltr"
        text-align="center"
        css-class={
          mode === "testing" ? getPreviewClassName(idx, data.type) : ""
        }
      >
        <Section padding="0px">
          <Column padding="0px" border="none" vertical-align="top">
            <Text
              font-size="20px"
              padding="10px 25px 10px 25px"
              line-height="1"
              align="center"
              font-weight="bold"
              color={attributes["text-color"]}
              css-class={getContentEditableClassName(
                BasicType.TEXT,
                `${idx}.data.value.message`
              ).join(" ")}
            >
              {message}
            </Text>
          </Column>
        </Section>
      </Wrapper>
    );
  },
});

export { Panel } from "./panel";
