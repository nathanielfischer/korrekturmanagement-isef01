import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function LogoutButton() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">

                <div className="flex w-full justify-center p-3">
                    <form 
                        action={async () => {
                            'use server';
                            await signOut({ redirectTo: '/' });
                        }}
                    >
                        <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                            <PowerIcon className="w-6" />
                            <div className="hidden md:block">Sign Out</div>
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}