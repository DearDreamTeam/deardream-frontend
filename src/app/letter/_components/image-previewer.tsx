import Image from "next/image";

const ImagePreviewer = ({ imageUrls }: { imageUrls: string[] }) => {
  return (
    <div className="flex w-full justify-around gap-1 py-5">
      {imageUrls?.map((url, idx) => (
        <div key={idx} className="relative h-[13rem] w-full">
          <Image
            src={url}
            alt={"image"}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-25"
          />
        </div>
      ))}
    </div>
  );
};

export default ImagePreviewer;
