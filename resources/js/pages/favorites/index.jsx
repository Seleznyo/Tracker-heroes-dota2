import { Link, router } from "@inertiajs/react";
import AppLayout from '@/layouts/AppLayout';

export default function Index({ heroes }) {

    function removeFavorite(hero) {
        router.delete(`/heroes/${hero.slug}/favorite`, {
            preserveScroll: true,
        });
    }


    return (
        <div className="min-h-screen bg-mist-800 text-white">

            <div className="mx-auto max-w-5xl p-8">

                <h1 className="mb-8 text-4xl font-bold">
                    ⭐ Favorite Heroes
                </h1>


                {heroes.length === 0 && (
                    <div className="rounded-3xl bg-mist-600 p-8 text-center">
                        <p className="text-xl text-mist-300">
                            You don't have favorite heroes yet
                        </p>

                        <Link
                            href="/heroes"
                            className="mt-4 inline-block rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black"
                        >
                            Browse heroes
                        </Link>
                    </div>
                )}


                <div className="grid grid-cols-3 gap-6">

                    {heroes.map((hero) => (

                        <div
                            key={hero.id}
                            className="group relative overflow-hidden rounded-3xl bg-mist-700 transition hover:-translate-y-1"
                        >

                            <Link href={`/heroes/${hero.slug}`}>

                                <img
                                    src={hero.image}
                                    alt={hero.slug}
                                    className="h-64 w-full object-cover brightness-75 transition group-hover:brightness-100"
                                />


                                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black p-5">

                                    <h2 className="text-2xl font-bold">
                                        {hero.slug[0].toUpperCase() + hero.slug.slice(1)}
                                    </h2>

                                </div>

                            </Link>


                            <button
                                onClick={() => removeFavorite(hero)}
                                className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-2 text-xl transition hover:bg-red-500"
                            >
                                ✕
                            </button>


                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

Index.layout = page => (
    <AppLayout>
        {page}
    </AppLayout>
);