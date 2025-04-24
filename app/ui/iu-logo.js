import Image from "next/image";

export default function IuLogo() {
  return (
    <div
      className={'flex flex-wrap items-center justify-center text-center'}
    >
      <p className={"basis-full text-red-600 text-xs"}>Studenten Demo</p>
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
