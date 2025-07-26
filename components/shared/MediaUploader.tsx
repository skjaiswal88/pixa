"use client";

import { toast } from "sonner";
import { dataUrl, getImageSize } from "@/lib/utils";
import { CloudinaryUploadWidgetResults, CloudinaryUploadWidgetError, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

// Define proper types for the image object
interface ImageData {
  publicId: string;
  width: number;
  height: number;
  secureURL: string;
  [key: string]: unknown;
}

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<React.SetStateAction<ImageData | null>>;
  publicId: string;
  image: ImageData | null;
  type: string;
};

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type
}: MediaUploaderProps) => {
const onUploadSuccessHandler = (result: CloudinaryUploadWidgetResults) => {
  const info = result.info as CloudinaryUploadWidgetInfo;
  
  setImage((prevState: ImageData | null) => ({
    ...prevState,
    publicId: info.public_id,
    width: info.width,
    height: info.height,
    secureURL: info.secure_url
  } as ImageData));

  onValueChange(info.public_id);

    toast.success('Image uploaded successfully', {
      description: '1 credit was deducted from your account',
      duration: 5000,
    });
   };

const onUploadErrorHandler = (error: CloudinaryUploadWidgetError) => {
    console.error('Upload error:', error);
    
    toast.error('Something went wrong while uploading', {
      description: 'Please try again',
      duration: 5000,
    });
  };

  return (
    <CldUploadWidget
      uploadPreset="skj_pixa"
      options={{
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          <h3 className="h3-bold text-dark-600">
            Original
          </h3>

          {publicId && image ? (
            <div className="cursor-pointer overflow-hidden rounded-[10px]">
              <CldImage 
                width={getImageSize(type, image, "width")}
                height={getImageSize(type, image, "height")}
                src={publicId}
                alt="image"
                sizes={"(max-width: 767px) 100vw, 50vw"}
                placeholder={dataUrl as PlaceholderValue}
                className="media-uploader_cldImage"
              />
            </div>
          ) : (
            <div className="media-uploader_cta" onClick={() => open()}>
              <div className="media-uploader_cta-image">
                <Image 
                  src="/assets/icons/add.svg"
                  alt="Add Image"
                  width={24}
                  height={24}
                />
              </div>
              <p className="p-14-medium">Click here to upload image</p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default MediaUploader;