import { Link } from "@inertiajs/react";
import {formatMonth} from './../../../utils/date.js';


export default function Show({ hero }) {
    const latestStat = hero.hero_stats[0] ?? null;
    return (
        <div className="min-h-screen  bg-mist-800 text-white">
            <div className="mx-auto max-w-3xl">
                <Link
                    href="/heroes"
                    className="inline-block text-2xl m-8 text-mist-400 transition hover:text-white"
                >
                    &#8592; All heroes
                </Link>

                <div className="rounded-4xl  overflow-hidden m-2">
                    <img
                        src={hero.image}
                        alt={hero.slug}
                        className="h-100 w-full object-cover"
                    />
                    <div className="p-4">
                        <h1 className="text-4xl font-bold"
                        >{hero.slug[0].toUpperCase() + hero.slug.slice(1)}</h1>
                        <p className="text-mist-400">STRATZ ID: {hero.stratz_id}</p>
                        <div className="mt-6 grid grid-cols-4 gap-4">
                            <div className="rounded-3xl bg-mist-600 p-4">
                                <p className="text-sm text-mist-400">Winrate</p>
                                <p className="mt-1 text-2xl font-bold">{latestStat?.winrate}%</p>
                            </div>
                            <div className="rounded-3xl  bg-mist-600 p-4">
                                <p className="text-sm text-mist-400">Month</p>
                                <p className="mt-1 text-2xl font-bold">{formatMonth(latestStat.month)}</p>
                            </div>
                            <div className="rounded-3xl  bg-mist-600 p-4">
                                <p className="text-sm text-mist-400">Matches</p>
                                <p className="mt-1 text-2xl font-bold">{latestStat.match_count.toLocaleString()}</p>
                            </div>
                            <div className="rounded-3xl  bg-mist-600 p-4">
                                <p className="text-sm text-mist-400">Wins</p>
                                <p className="mt-1 text-2xl font-bold">{latestStat.win_count.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <h2 className="m-8 mb-0 text-2xl font-bold">
                        Monthly statistics
                    </h2>
                    <div className="space-y-2 p-8">
                        {
                            hero.hero_stats.map((stat) => {
                                const month = formatMonth(stat.month)
                                return (
                                    <div
                                        key={stat.id}
                                        className="grid grid-cols-4 gap-4 rounded-lg bg-mist-800 p-4"
                                    >
                                        <div>
                                            <p className="text-sm text-mist-400">Month</p>
                                            <p className="font-semibold">{month}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-mist-400">Winrate</p>
                                            <p className="font-semibold">
                                                {stat.winrate}%
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-mist-400">Wins</p>
                                            <p className="font-semibold">
                                                {stat.win_count.toLocaleString()}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-mist-400">Matches</p>
                                            <p className="font-semibold">
                                                {stat.match_count.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                );

                            }
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
