/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from "react";

import { BlockAvatarWrapper } from "easy-email-editor";
import { AdvancedType } from "easy-email-core";

import DBEmailEditor from "./DBEmailEditor-v1";

// Exmaple, this is we can do something with bunle builder, like rollup,
// import DBEmailEditor ,{BlockAvatarWrapper ,AdvancedType } from '@/debutify-email-editor'

import templateData from "./template.json";

import { CustomBlocksType } from "./CustomBlocks/constants";
import { HelloSajjad, Panel } from "./CustomBlocks/HelloSajjadBlock";

import {
  ProductRecommendation,
  Panel as ProductRecommendationPanel,
} from "./CustomBlocks/ProductRecommendation";

const fontList = ["Arial", "Tahoma", "Verdana"].map((item) => ({
  value: item,
  label: item,
}));

const categories = [
  {
    label: "Widgets",
    active: true,
    displayType: "custom",
    blocks: [
      <BlockAvatarWrapper type={CustomBlocksType.PRODUCT_RECOMMENDATION}>
        <div
          style={{
            position: "relative",
            border: "1px solid #ccc",
            marginBottom: 20,
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <img
            src={"https://placehold.co/100"}
            style={{
              maxWidth: "100%",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 2,
            }}
          />
        </div>
        ,
      </BlockAvatarWrapper>,
    ],
  },
  {
    label: "Welcom Sajjad",
    active: true,
    displayType: "custom",
    blocks: [
      <BlockAvatarWrapper type={CustomBlocksType.HELLO_SAJJAD_BLOCK}>
        <div
          style={{
            position: "relative",
            border: "1px solid #ccc",
            marginBottom: 20,
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <img
            src={"https://placehold.co/100"}
            style={{
              maxWidth: "100%",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 2,
            }}
          />
        </div>
      </BlockAvatarWrapper>,
    ],
  },
  {
    label: "Content",
    active: true,
    blocks: [
      {
        type: AdvancedType.TEXT,
      },
      {
        type: AdvancedType.IMAGE,
        payload: { attributes: { padding: "0px 0px 0px 0px" } },
      },
      {
        type: AdvancedType.BUTTON,
      },
      {
        type: AdvancedType.SOCIAL,
      },
      {
        type: AdvancedType.DIVIDER,
      },
      {
        type: AdvancedType.SPACER,
      },
      {
        type: AdvancedType.HERO,
      },
      {
        type: AdvancedType.WRAPPER,
      },
    ],
  },

  {
    label: "Layout",
    active: true,
    displayType: "column",
    blocks: [
      {
        title: "2 columns",
        payload: [
          ["50%", "50%"],
          ["33%", "67%"],
          ["67%", "33%"],
          ["25%", "75%"],
          ["75%", "25%"],
        ],
      },
      {
        title: "3 columns",
        payload: [
          ["33.33%", "33.33%", "33.33%"],
          ["25%", "25%", "50%"],
          ["50%", "25%", "25%"],
        ],
      },
      {
        title: "4 columns",
        payload: [[["25%", "25%", "25%", "25%"]]],
      },
    ],
  },
];

// const pageBlock = BlockManager.getBlockByType(BasicType.PAGE)!;

const customBlocks = [
  {
    blockType: CustomBlocksType.HELLO_SAJJAD_BLOCK,
    block: HelloSajjad,
    panel: Panel,
  },
  {
    blockType: CustomBlocksType.PRODUCT_RECOMMENDATION,
    block: ProductRecommendation,
    panel: ProductRecommendationPanel,
  },
];

export default function Editor() {
  const [downloadFileName, setDownloadName] = useState("download.mjml");
  const [template, setTemplate] = useState<any>(templateData);

  const handleCopyHtmlResult = (html: string) => {
    console.log("handleCopyHtmlResult", html);
  };

  const handleImportResult = (filename: string, data: any) => {
    setDownloadName(filename);
    setTemplate(data);
  };

  const handleExportResult = (filename: string) => {};

  const handleSubmitResult = (values: any) => {
    console.log("values", values);
  };

  const onUploadImage = async (blob: Blob) => {
    console.log("blob", blob);
    return "https://placehold.co/100";
  };

  return (
    <div>
      <DBEmailEditor
        downloadFileName={downloadFileName}
        setDownloadFileName={setDownloadName}
        template={template}
        setTemplate={setTemplate}
        fontList={fontList}
        categories={categories}
        onCopyHtmlResult={handleCopyHtmlResult}
        onImportResult={handleImportResult}
        onExportResult={handleExportResult}
        onSubmitResult={handleSubmitResult}
        onUploadImage={onUploadImage}
        customBlocks={customBlocks}
      />
    </div>
  );
}
