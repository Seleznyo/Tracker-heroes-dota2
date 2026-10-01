export default function BuildItems({ items }) {
    return (
        <div className="m-8">
            <h2 className="mb-4 text-2xl font-bold">
                Popular Builds
            </h2>

            <div className="grid grid-cols-3 gap-4">

                {items.map((heroItem) => (

                    <div
                        key={heroItem.id}
                        className="rounded-2xl bg-mist-600 p-4"
                    >

                        <div className="flex items-center gap-3">

                            <img
                                src={heroItem.item.image}
                                alt={heroItem.item.display_name}
                                className="h-12 w-15 rounded-lg"
                            />

                            <div>

                                <p className="font-semibold">
                                    {heroItem.item.display_name}
                                </p>


                                <p className="text-sm text-mist-400">
                                    {heroItem.match_count.toLocaleString()} games
                                </p>


                                <p className="text-sm text-mist-400">
                                    {(heroItem.wins_average * 100).toFixed(2)}% winrate
                                </p>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}