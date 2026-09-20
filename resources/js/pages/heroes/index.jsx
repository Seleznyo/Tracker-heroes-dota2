import { Link } from '@inertiajs/react';

export default function Index({ heroes }) {
    return (
        <div className="bg-mist-800 text-white">
            <div className="container mx-auto">
                <h1 className="mb-8 pt-8 text-3xl font-bold">
                    Tracker Heroes DOTA 2
                </h1>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {heroes.map((hero) => (
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
                    ))}
                </div>
            </div>
        </div>
    );
}
