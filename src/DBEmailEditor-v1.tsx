import React, { useCallback, useEffect, useMemo } from "react";
import { Button, message, PageHeader } from "antd";
import mjml from "mjml-browser";
import {
  EmailEditor,
  EmailEditorProvider,
  IEmailTemplate,
  Stack,
} from "easy-email-editor";
import { BlockManager, JsonToMjml } from "easy-email-core";
import {
  BlockAttributeConfigurationManager,
  StandardLayout,
} from "easy-email-extensions";
import { copy } from "./urils/clipboard";
import { useImportTemplate } from "./hooks/useImportTemplate";
import { useExportTemplate } from "./hooks/useExportTemplate";
import { FormApi } from "final-form";
import { useWindowSize } from "react-use";

import "easy-email-editor/lib/style.css";
import "easy-email-extensions/lib/style.css";
import "@arco-themes/react-easy-email-theme-purple/css/arco.css";
import "antd/dist/antd.css";

interface CustomBlock {
  blockType: any;
  block: any;
  panel: React.ComponentType;
}

interface EmailEditorWrapperProps {
  downloadFileName: string;
  setDownloadFileName: React.Dispatch<React.SetStateAction<string>>;
  template: IEmailTemplate["content"];
  setTemplate: React.Dispatch<React.SetStateAction<IEmailTemplate["content"]>>;
  onCopyHtmlResult?: (html: string) => void;
  onImportResult?: (filename: string, data: IEmailTemplate["content"]) => void;
  onExportResult?: (filename: string) => void;
  onSubmitResult?: (values: IEmailTemplate) => void;
  onUploadImage?: (blob: Blob) => Promise<string>;
  fontList?: { value: string; label: string }[];
  categories: any;
  customBlocks?: CustomBlock[];
}

const DBEmailEditor: React.FC<EmailEditorWrapperProps> = ({
  downloadFileName,
  setDownloadFileName,
  template,
  setTemplate,
  onCopyHtmlResult,
  onImportResult,
  onExportResult,
  onSubmitResult,
  onUploadImage,
  fontList,
  categories,
  customBlocks = [],
}) => {
  const { importTemplate } = useImportTemplate();
  const { exportTemplate } = useExportTemplate();
  const { width } = useWindowSize();

  const smallScene = width < 1400;

  const initialValues: IEmailTemplate | null = useMemo(() => {
    return {
      subject: "Welcome to Easy-email",
      subTitle: "Nice to meet you!",
      content: template,
    };
  }, [template]);

  const onCopyHtml = (values: IEmailTemplate) => {
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
    if (onCopyHtmlResult) {
      onCopyHtmlResult(html);
    }
    message.success("Successfully copy");
  };

  const onImportMjml = async () => {
    try {
      const [filename, data] = await importTemplate();
      setDownloadFileName(filename);
      setTemplate(data);
      if (onImportResult) {
        onImportResult(filename, data);
      }
      message.success("Successfully import!");
    } catch (error) {
      message.error("Invalid mjml file");
    }
  };

  const onExportMjml = (values: IEmailTemplate) => {
    exportTemplate(
      downloadFileName,
      JsonToMjml({
        data: values.content,
        mode: "production",
        context: values.content,
      })
    );
    if (onExportResult) {
      onExportResult(downloadFileName);
    }
    message.success("Successfully export!");
  };

  const onSubmit = useCallback(
    async (
      values: IEmailTemplate,
      form: FormApi<IEmailTemplate, Partial<IEmailTemplate>>
    ) => {
      if (onSubmitResult) {
        onSubmitResult(values);
      }
      message.success("Saved success!");
    },
    []
  );

  useEffect(() => {
    const blockRegistration = {};
    const panelRegistration = {};

    customBlocks.forEach((customBlock) => {
      blockRegistration[customBlock.blockType] = customBlock.block;
      panelRegistration[customBlock.blockType] = customBlock.panel;
    });

    BlockManager.registerBlocks(blockRegistration);
    BlockAttributeConfigurationManager.add(panelRegistration);
  }, []);

  if (!initialValues) return null;

  return (
    <div>
      <EmailEditorProvider
        dashed={false}
        data={initialValues}
        height={"calc(100vh - 85px)"}
        onUploadImage={onUploadImage}
        autoComplete
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
                  <Button onClick={() => onExportMjml(values)}>
                    Export Template
                  </Button>
                  <Button onClick={() => onImportMjml()}>
                    import Template
                  </Button>
                  <Button type="primary" onClick={() => submit()}>
                    Save
                  </Button>
                </Stack>
              }
            />

            <StandardLayout
              categories={categories}
              showSourceCode={false}
              compact={!smallScene}
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
