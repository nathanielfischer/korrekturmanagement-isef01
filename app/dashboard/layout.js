import IuLogo from "@/app/ui/iu-logo.js";
import LogoutButton from "@/app/ui/logout-button.js";


export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="grid grid-cols-3">
                <div className="flex items-center justify-end grow" ></div>
                <IuLogo className="flex items-center justify-center grow" />
                <LogoutButton className="flex items-center justify-end grow" />
            </header>
            <main className="flex-1 bg-light-grey rounded-md">
                <div className="min-h-full p-2 md:p-12">{children}</div>
            </main>
        </div>
    );
}
