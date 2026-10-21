import { Link } from '@inertiajs/react';
import { Crosshair, Package, Star, Swords, TrendingUp } from 'lucide-react';
import BrandLogo from '@/components/brand-logo';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

const features = [
    {
        icon: TrendingUp,
        title: 'Винрейты и статистика',
        text: 'Актуальные показатели героев по месяцам и матчам.',
    },
    {
        icon: Crosshair,
        title: 'Контрпики и сильные стороны',
        text: 'Против кого герой играет лучше, а кому проигрывает.',
    },
    {
        icon: Package,
        title: 'Сборки предметов',
        text: 'Популярные стартовые и финальные закупки.',
    },
    {
        icon: Star,
        title: 'Избранные герои',
        text: 'Личная подборка героев в вашем аккаунте.',
    },
];

export default function AuthLayout({
    children,
    title = '',
    description = '',
}: AuthLayoutProps) {
    return (
        <div className="relative min-h-svh overflow-hidden bg-mist-950 text-white">
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 12% 8%, rgba(234, 179, 8, 0.16), transparent 42%), radial-gradient(circle at 92% 88%, rgba(16, 185, 129, 0.08), transparent 38%)',
                    }}
                />
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
                        backgroundSize: '52px 52px',
                    }}
                />
                <Swords
                    className="absolute -right-28 -bottom-28 size-[30rem] rotate-12 text-mist-800/50"
                    strokeWidth={0.5}
                />
            </div>

            <div className="relative mx-auto flex min-h-svh w-full max-w-7xl flex-col lg:grid lg:grid-cols-2">
                <aside className="hidden flex-col justify-between border-r border-mist-800/70 p-10 lg:flex xl:p-14">
                    <Link href={home()} className="w-fit">
                        <BrandLogo />
                    </Link>

                    <div className="max-w-md py-12">
                        <span className="inline-flex items-center gap-2 rounded-full border border-yellow-500/25 bg-yellow-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-yellow-400 uppercase">
                            <Swords className="size-3.5" />
                            Аналитика Dota 2
                        </span>

                        <h2 className="mt-6 text-4xl leading-[1.08] font-black tracking-tight xl:text-5xl">
                            Побеждай чаще.
                            <br />
                            <span className="text-yellow-500">
                                Выбирай с умом.
                            </span>
                        </h2>

                        <p className="mt-5 text-sm leading-relaxed text-mist-400">
                            Винрейты, контрпики, популярные сборки и стартовые
                            предметы — на основе реальных матчей.
                        </p>

                        <ul className="mt-9 space-y-5">
                            {features.map((feature) => (
                                <li
                                    key={feature.title}
                                    className="flex items-start gap-3.5"
                                >
                                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl border border-mist-700/70 bg-mist-800/80 text-yellow-500">
                                        <feature.icon className="size-4.5" />
                                    </span>
                                    <span>
                                        <span className="block text-sm font-semibold text-mist-100">
                                            {feature.title}
                                        </span>
                                        <span className="mt-0.5 block text-sm text-mist-400">
                                            {feature.text}
                                        </span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-xs text-mist-500">
                        Данные предоставлены STRATZ API
                    </p>
                </aside>

                <section className="flex flex-1 flex-col justify-center px-5 py-10 sm:px-8 lg:px-12 xl:px-20">
                    <Link href={home()} className="mb-10 w-fit lg:hidden">
                        <BrandLogo />
                    </Link>

                    <div className="mx-auto w-full max-w-md lg:mx-0">
                        <h1 className="text-3xl font-bold tracking-tight text-white">
                            {title}
                        </h1>

                        {description && (
                            <p className="mt-2 text-sm leading-relaxed text-mist-400">
                                {description}
                            </p>
                        )}

                        <div className="mt-8 rounded-3xl border border-mist-800 bg-mist-900/70 p-6 shadow-2xl shadow-black/50 backdrop-blur-sm sm:p-8">
                            {children}
                        </div>

                        <p className="mt-8 text-center text-xs text-mist-500">
                            © {new Date().getFullYear()} Dota Tracker · Данные
                            STRATZ
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
