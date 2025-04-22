import Image from "next/image";

export default function IuLogo() {
  return (
    <div
      className={'flex flex-row items-center'}
    >
      <Image
          src="/1920_iu-logo-d-black-rgb-horizontal.png"
          alt="IU logo"
          width={180}
          height={38}
          priority
        />
    </div>
  );
}
