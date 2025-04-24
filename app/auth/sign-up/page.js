import IuLogo from "@/app/ui/iu-logo.js";
import SignUpForm from '@/app/ui/sign-up-form';
import { Suspense } from 'react';

export default function SignUpPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">

                <div className="flex w-full justify-center p-3">
                    <div className="w-32 text-white md:w-36">
                        <p className={"basis-full text-red-600 text-xs text-center"}>Studenten Demo</p>
                        <IuLogo />
                    </div>
                </div>


                <Suspense>
                    <SignUpForm />
                </Suspense>
            </div>
        </main>
    );
}