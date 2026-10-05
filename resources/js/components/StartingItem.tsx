type Item = Array<{ 
    id: number; 
    name: string; 
    image: string; 
    item: { display_name: string; image: string }; 
    match_count: number; 
    wins_average: number }>;

type Props = {
    items: Item;
}

export default function StartingItem({ items }: Props) {
    return (
        <div className="m-8">
            <h2 className="mb-4 text-2xl font-bold">
                Starting Items
            </h2>

            <div className="grid grid-cols-3 gap-4">
                {items.map((startingItem) => (
                    <div
                        key={startingItem.id}
                        className="rounded-2xl bg-mist-600 p-4"
                    >
                        <div className="flex items-center gap-3">

                            <img
                                src={startingItem.item.image}
                                alt={startingItem.item.display_name}
                                className="h-12 w-15 rounded-lg"
                            />

                            <div>
                                <p className="font-semibold">
                                    {startingItem.item.display_name}
                                </p>

                                <p className="text-sm text-mist-400">
                                    {startingItem.match_count.toLocaleString()} games
                                </p>

                                <p className="text-sm text-mist-400">
                                    {(startingItem.wins_average * 100).toFixed(2)}% winrate
                                </p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}