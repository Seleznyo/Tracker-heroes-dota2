import AppLayout from '@/layouts/AppLayout';
import { Link } from "@inertiajs/react";


export default function Dashboard({ heroes, favoriteCount }) {

    return (
        <div className="min-h-screen bg-mist-800 text-white">

            <div className="mx-auto max-w-5xl p-8">


                <h1 className="text-4xl font-bold">
                    Dashboard
                </h1>


                <p className="mt-2 text-mist-400">
                    Welcome back
                </p>


                <div className="mt-8 grid grid-cols-3 gap-6">


                    <div className="rounded-3xl bg-mist-600 p-6">

                        <p className="text-mist-400">
                            Favorite heroes
                        </p>

                        <p className="mt-2 text-4xl font-bold">
                            {favoriteCount}
                        </p>

                    </div>


                </div>



                <div className="mt-10">


                    <div className="mb-6 flex items-center justify-between">

                        <h2 className="text-2xl font-bold">
                            Recently added
                        </h2>


                        <Link
                            href="/favorites"
                            className="text-yellow-400"
                        >
                            View all
                        </Link>


                    </div>



                    <div className="grid grid-cols-3 gap-6">


                        {heroes.map((hero) => (

                            <Link
                                key={hero.id}
                                href={`/heroes/${hero.slug}`}
                                className="overflow-hidden rounded-3xl bg-mist-700 transition hover:-translate-y-1"
                            >


                                <img
                                    src={hero.image}
                                    className="h-48 w-full object-cover brightness-75 transition hover:brightness-100"
                                />


                                <div className="p-4">

                                    <h3 className="text-xl font-bold">
                                        {hero.slug}
                                    </h3>

                                </div>


                            </Link>

                        ))}


                    </div>

                </div>


                <div className="mt-10 grid grid-cols-2 gap-4">


                    <Link
                        href="/heroes"
                        className="rounded-2xl bg-mist-600 p-5 text-center font-bold transition hover:bg-mist-500"
                    >
                        Browse heroes
                    </Link>


                    <Link
                        href="/favorites"
                        className="rounded-2xl bg-yellow-500 p-5 text-center font-bold text-black transition hover:bg-yellow-400"
                    >
                        My favorites
                    </Link>


                </div>


            </div>

        </div>
    );
}

Dashboard.layout = page => (
    <AppLayout>
        {page}
    </AppLayout>
);