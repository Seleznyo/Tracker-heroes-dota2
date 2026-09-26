import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ heroes }) {
    const [search, setSearch] = useState('')
    const filtredHeroes = heroes.filter((hero) => hero.slug.toLowerCase().includes(search.toLowerCase()))
    return (
        <div className="min-h-screen bg-mist-800 text-white">
            <div className="container mx-auto">
                <h1 className="mb-8 pt-8 text-3xl font-bold">
                    Tracker Heroes DOTA 2
                </h1>
                <div className="mb-6">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search heroes..."
                        className="w-full rounded-lg bg-mist-900 px-4 py-3 text-white outline-none ring-1 ring-gray-800 focus:ring-gray-600"
                    />
                </div>

                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filtredHeroes.length > 0? (filtredHeroes.map((hero) => (
                        <Link
                            href={`heroes/${hero.slug}`}
                            key={hero.id}
                            className="group m-2 overflow-hidden rounded-4xl border-solid transition hover:-translate-y-1 hover:bg-mist-700"
                        >
                            <img
                                src={hero.image}
                                alt={hero.slug}
                                className="w-full object-cover transition duration-200 group-hover:scale-105"
                            />
                            <p className="p-3 text-2xl font-semibold">
                                {hero.slug[0].toUpperCase() +
                                    hero.slug.slice(1)}
                            </p>
                        </Link>
                    ))) : (
                        <p className="col-span-full text-center text-mist-400">
                            Heroes not found
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
