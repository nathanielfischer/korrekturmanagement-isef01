import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function LogoutButton({className}) {
    return (

        <div className={className}>
            <form
                action={async () => {
                    'use server';
                    await signOut({ redirectTo: '/' });
                }}
            >
                <button className="flex h-[40px] grow items-center justify-center gap-2 rounded-md bg-gray-50 px-3 py-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 cursor-pointer">
                    <PowerIcon className="w-6" />
                    <div className="hidden md:block">Logout</div>
                </button>
            </form>
        </div>

    );
}