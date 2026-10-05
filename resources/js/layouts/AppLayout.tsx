import { Link, router, usePage } from '@inertiajs/react';

type Props = {
    children: React.ReactNode;
};

export default function AppLayout({ children } : Props) {

    const { auth } = usePage().props;

    const user = auth.user;


    return (
        <div className="min-h-screen bg-mist-800 text-white">

            <nav className="flex items-center justify-between p-6 bg-mist-900">

                <Link
                    href="/heroes"
                    className="text-2xl font-bold"
                >
                    Dota Tracker
                </Link>


                <div className="flex gap-6">

                    <Link href="/heroes">
                        Heroes
                    </Link>


                    {user && (
                        <>
                            <Link href="/favorites">
                                ⭐ Favorites
                            </Link>

                            <Link href="/dashboard">
                                Dashboard
                            </Link>


                            <span>
                                {user.name}
                            </span>
                            <button
                                className="text-red-400 hover:text-red-300"
                                onClick={() => router.post('/logout')}
                            >
                                Logout
                            </button>
                        </>
                    )}


                    {!user && (
                        <>
                            <Link href="/login">
                                Login
                            </Link>

                            <Link href="/register">
                                Register
                            </Link>
                        </>
                    )}

                </div>

            </nav>


            <main>
                {children}
            </main>

        </div>
    );
}