"use client";

import { useUploadThing } from "@/app/_hooks/uploadthing.hooks";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/extende/file-upload";
import { Paperclip } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const FileSvgDraw = () => {
  return (
    <>
      <svg
        className="mb-3 h-8 w-8 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        SVG, PNG, JPG or GIF
      </p>
    </>
  );
};

const FileUploaderInput = ({
  values,
  onValueChange,
  files,
  setFiles,
}: {
  values: string[] | undefined;
  onValueChange: (...event: any[]) => void;
  files: File[] | null;
  setFiles: (files: File[] | null) => void;
}) => {

  
  const [allFileUploaded, setAllFileUploaded] = useState(false);

  useEffect(() => {
    if (files?.length !== values?.length) {
      setAllFileUploaded(false);
    }
  }, [files, values])

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (data) => {
      console.log("🚀 ~ FileUploaderInput ~ data:", data);
      onValueChange(data.map((file) => file.url));
      setAllFileUploaded(true);
    },
    onUploadError: (error) => {
      console.log("🚀 ~ FileUploaderInput ~ error:", error);
    },
    onUploadProgress: (progress) => {
      // console.log("🚀 ~ FileUploaderInput ~ progress:", progress);
    },
  });

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  return (
    <FileUploader
      value={files}
      onValueChange={setFiles}
      dropzoneOptions={dropZoneConfig}
      className="relative rounded-lg bg-background p-2"
    >
      <FileInput className="outline-dashed outline-1 outline-white">
        <div className="flex w-full flex-col items-center justify-center pb-4 pt-3">
          <FileSvgDraw />
        </div>
      </FileInput>
      <FileUploaderContent>
        {files && files.length > 0 && (
          <>
            {files.map((file, i) => (
              <FileUploaderItem key={i} index={i}>
                {/* FIXME: add image preview */}
                {/* FIXME: add delete functionality */}
                <Paperclip className="h-4 w-4 stroke-current" />
                <span>{file.name}</span>
              </FileUploaderItem>
            ))}
            <div className="flex justify-center">
              <Button className="mt-2 w-fit" disabled={allFileUploaded} onClick={(e) => {
                e.preventDefault()
                startUpload(files)}}>
                Upload
              </Button>
            </div>
          </>
        )}
      </FileUploaderContent>
    </FileUploader>
  );
};

export default FileUploaderInput;
