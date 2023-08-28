import React, { useEffect, useState } from "react";
import { Button, message, PageHeader } from "antd";
import mjml from "mjml-browser";
import { EmailEditor, EmailEditorProvider, Stack } from "easy-email-editor";
import {
  ExtensionProps,
  // SimpleLayout,
  StandardLayout,
  BlockAttributeConfigurationManager,
} from "easy-email-extensions";
import { copy } from "./urils/clipboard";
import { JsonToMjml, BlockManager } from "easy-email-core";
import { FormApi } from "final-form";
import { useWindowSize } from "react-use";

interface Props {
  initialTemplateData: any;
  fontList?: { value: string; label: string }[];
  categories?: ExtensionProps["categories"];
  blockTypes?: { [key: string]: string };
  customBlocks?: { [key: string]: React.ComponentType<any> };
  customPanels?: { [key: string]: React.ComponentType<any> };
  onUploadImage?: (blob: Blob) => Promise<string>;
  onSubmit?: (values: any, form: FormApi<any, any>) => void;
  importTemplate?: () => Promise<[string, any]>;
  exportTemplate?: (filename: string, data: any) => void;
  downloadFileNameInitial?: string;
}

export const DBEmailEditor: React.FC<Props> = ({
  initialTemplateData,
  fontList,
  categories,
  customBlocks,
  customPanels,
  blockTypes,
  onUploadImage,
  onSubmit,
  importTemplate,
  exportTemplate,
  downloadFileNameInitial = "download.mjml",
}) => {
  const [downloadFileName, setDownloadName] = useState(downloadFileNameInitial);
  const [template, setTemplate] = useState(initialTemplateData);

  const { width } = useWindowSize();
  const smallScene = width < 1400;

  const onCopyHtml = (values: any) => {
    const html = mjml(
      JsonToMjml({
        data: values.content,
        mode: "production",
        context: values.content,
      }),
      {
        beautify: true,
        validationLevel: "soft",
      }
    ).html;

    copy(html);
    message.success("Copied to pasteboard!");
  };

  const handleImportMjml = async () => {
    try {
      if (importTemplate) {
        const [filename, data] = await importTemplate();
        setDownloadName(filename);
        setTemplate(data);
      }
    } catch (error) {
      message.error("Invalid mjml file");
    }
  };

  const handleExportMjml = (values: any) => {
    if (exportTemplate) {
      exportTemplate(
        downloadFileName,
        JsonToMjml({
          data: values.content,
          mode: "production",
          context: values.content,
        })
      );
    }
  };

  // useEffect(() => {
  //   Object.entries(customBlocks).forEach(([key, Component]) => {
  //     if(blockTypes[key]) {
  //       BlockManager.registerBlocks({ [key]: Component });
  //     }
  //   });

  //   Object.entries(customPanels).forEach(([key, Component]) => {
  //     if(blockTypes[key]) {
  //       BlockAttributeConfigurationManager.add({ [key]: Component });
  //     }
  //   });
  // }, [blockTypes, customBlocks, customPanels]);

  if (!template) return null;

  return (
    <div>
      <EmailEditorProvider
        dashed={false}
        data={template}
        height={"calc(100vh - 85px)"}
        onUploadImage={onUploadImage}
        fontList={fontList}
        onSubmit={onSubmit}
      >
        {({ values }, { submit }) => (
          <>
            <PageHeader
              title="Edit"
              extra={
                <Stack alignment="center">
                  <Button onClick={() => onCopyHtml(values)}>Copy Html</Button>
                  <Button onClick={() => handleExportMjml(values)}>
                    Export Template
                  </Button>
                  <Button onClick={handleImportMjml}>Import Template</Button>
                  <Button type="primary" onClick={() => submit()}>
                    Save
                  </Button>
                </Stack>
              }
            />
            <StandardLayout
              compact={!smallScene}
              categories={categories}
              showSourceCode={false}
            >
              <EmailEditor />
            </StandardLayout>
          </>
        )}
      </EmailEditorProvider>
    </div>
  );
};

export default DBEmailEditor;
