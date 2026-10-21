import { Link } from '@inertiajs/react';

type Props = {
    matchups: {
        id: number;
        average_win: number;
        opponent_hero: {
            slug: string;
            image: string;
        };
    }[];
    label: string;
};

export default function MatchupCard({ matchups, label }: Props) {
    return (
        <div className="mt-6">
            <h1 className="mb-8 text-2xl font-bold">{label}</h1>
            <div className="grid grid-cols-3 gap-3">
                {matchups.map((matchup) => {
                    return (
                        <Link
                            key={matchup.id}
                            className="transition hover:-translate-y-1"
                            href={'/heroes/' + matchup.opponent_hero.slug}
                        >
                            <div className="relative overflow-hidden rounded-2xl">
                                <span className="absolute right-0 bottom-12 z-10 font-semibold">
                                    Winrate vs
                                </span>
                                <h2 className="absolute right-0 bottom-6 z-10 text-2xl">
                                    {matchup.opponent_hero.slug}
                                </h2>
                                <span className="absolute right-0 bottom-0 z-10 text-2xl text-mist-400">
                                    {(matchup.average_win * 100).toFixed(2)} %
                                </span>
                                <img
                                    className="h-full w-full brightness-50"
                                    src={matchup.opponent_hero.image}
                                    alt={matchup.opponent_hero.slug}
                                />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
