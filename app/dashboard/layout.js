import IuLogo from "@/app/ui/iu-logo.js";
import LogoutButton from "@/app/ui/logout-button.js";


export default function Layout({ children }) {
    return (
        <div>
            <header className="grid grid-cols-3">
                <div className="flex items-center justify-end grow" ></div>
                <IuLogo className="flex items-center justify-center grow" />
                {/* <div className="flex items-center justify-end grow"><p>Logout</p></div> */}
                <LogoutButton className="flex items-center justify-end grow" />
            </header>
            {/* <main className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className="grow md:overflow-y-auto">{children}</div>
            </main> */}
            <main className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-light-grey rounded-md">
                <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
            </main>
        </div>

    );
}
