import { Link, router, usePage } from '@inertiajs/react';
import { LayoutDashboard, LogIn, LogOut, Star, Swords } from 'lucide-react';
import type { ReactNode } from 'react';
import BrandLogo from '@/components/brand-logo';
import { cn } from '@/lib/utils';

type Props = {
    children: ReactNode;
};

export default function AppLayout({ children }: Props) {
    const { auth } = usePage().props;
    const user = auth.user;

    const navLinkClass =
        'inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-mist-300 transition hover:bg-mist-800 hover:text-white';

    return (
        <div className="min-h-screen bg-mist-900 text-white">
            <nav className="sticky top-0 z-50 border-b border-mist-800/80 bg-mist-900/90 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
                    <Link href="/heroes" className="shrink-0">
                        <BrandLogo showSubtitle={false} />
                    </Link>

                    <div className="flex items-center gap-1 sm:gap-2">
                        <Link href="/heroes" className={navLinkClass}>
                            <Swords className="size-4 text-yellow-500" />
                            <span className="hidden sm:inline">Heroes</span>
                        </Link>

                        {user ? (
                            <>
                                <Link
                                    href="/favorites"
                                    className={navLinkClass}
                                >
                                    <Star className="size-4 text-yellow-500" />
                                    <span className="hidden sm:inline">
                                        Favorites
                                    </span>
                                </Link>

                                <Link
                                    href="/dashboard"
                                    className={navLinkClass}
                                >
                                    <LayoutDashboard className="size-4 text-yellow-500" />
                                    <span className="hidden sm:inline">
                                        Dashboard
                                    </span>
                                </Link>

                                <span className="mx-1 hidden max-w-32 truncate text-sm text-mist-400 md:inline">
                                    {user.name}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => router.post('/logout')}
                                    className={cn(
                                        navLinkClass,
                                        'hover:bg-red-500/10 hover:text-red-400',
                                    )}
                                >
                                    <LogOut className="size-4" />
                                    <span className="hidden sm:inline">
                                        Logout
                                    </span>
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-4 py-2 text-sm font-semibold text-mist-950 transition hover:bg-yellow-400"
                            >
                                <LogIn className="size-4" />
                                Log in
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            <main>{children}</main>
        </div>
    );
}
