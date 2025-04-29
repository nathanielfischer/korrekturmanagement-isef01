import Image from "next/image";
import Link from "next/link";

export default function IuLogo({className}) {
  return (
    <div className={className}>
      <Link href="/dashboard">
        <Image
          src="/1920_iu-logo-d-black-rgb-horizontal.png"
          alt="IU logo"
          width={180}
          height={38}
          priority
        />
      </Link>
    </div>
  );
}