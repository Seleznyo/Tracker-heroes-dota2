import { Link, router } from "@inertiajs/react";
import { formatMonth } from './../../../utils/date.js';
import MatchupCard from "../../components/MatchupCard.jsx";

export default function Show({ hero, counterPicks, goodAgainst }) {
    const latestStat = hero.hero_stats[0] ?? null;
    return (
        <div className="min-h-screen  bg-mist-800 text-white">
            <div className="mx-auto max-w-3xl">
                <Link
                    href="/heroes"
                    className="inline-block text-2xl m-8 text-mist-400 transition hover:text-white "
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
                        <button
                            type="button"
                            onClick={() => {
                                router.post(`/heroes/${hero.slug}/favorite`);
                            }}
                            className="my-4 rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-black transition hover:bg-yellow-400"
                        >
                            ⭐ Add to favorites
                        </button>
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

                <div className="mt-4">
                    <h2 className="mb-6 px-8 text-2xl font-bold">
                        Monthly statistics
                    </h2>

                    <div className="overflow-hidden rounded-3xl border border-mist-700/50 bg-mist-700/30">
                        {hero.hero_stats.map((stat, index) => {
                            const month = formatMonth(stat.month);

                            return (
                                <div
                                    key={stat.id}
                                    className={`grid grid-cols-4 gap-4 px-6 py-5 transition hover:bg-mist-700/40 ${index !== hero.hero_stats.length - 1
                                        ? 'border-b border-mist-700/50'
                                        : ''
                                        }`}
                                >
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-mist-400">
                                            Month
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            {month}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-mist-400">
                                            Winrate
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            {stat.winrate}%
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-mist-400">
                                            Wins
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            {stat.win_count.toLocaleString()}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-mist-400">
                                            Matches
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            {stat.match_count.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <MatchupCard matchups={counterPicks} label='Counter picks' />
                <MatchupCard matchups={goodAgainst} label='Good against' />
            </div>
        </div>
    );
}
