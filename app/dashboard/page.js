// import IuLogo from "@/app/ui/iu-logo.js";
// import LogoutButton from "@/app/ui/logout-button.js";

export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
    //     <IuLogo />
    //     <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
    //       <li className="tracking-[-.01em]">
    //         Startseite im Projekt.
    //       </li>
    //     </ol>
    //     <LogoutButton />
    //   </main>
    // </div>
    <div>
      <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li className="tracking-[-.01em]">
          Startseite im Projekt.
        </li>
        <li className="tracking-[-.01em]">
          Hier kommt die Tabelle hin.
        </li>
      </ol>
      {/* <LogoutButton /> */}
    </div>
  );
}
