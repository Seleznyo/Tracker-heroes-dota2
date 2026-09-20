import { Link } from "@inertiajs/react";

export default function Index({ heroes }) {
    return (
        <div className="bg-mist-800 text-white">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-8 pt-8">Tracker Heroes DOTA 2</h1>
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ">
                    {heroes.map(hero => (
                        <Link
                            href={`heroes/${hero.slug}`}
                            key={hero.id}
                            className="group overflow-hidden border-solid rounded-4xl m-2 transition hover:-translate-y-1 hover:bg-mist-700"
                        >
                            <img
                                src={hero.image}
                                alt={hero.slug}
                                className="w-full object-cover transition duration-200 group-hover:scale-105"
                            />
                            <p className="text-2xl p-3 font-semibold">{hero.slug[0].toUpperCase() + hero.slug.slice(1)}</p>
                        </Link>
                    ))}
                </div>
            </div>

        </div>

    );
}