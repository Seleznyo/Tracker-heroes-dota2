<?php

namespace App\Console\Commands;

use App\Models\Hero;
use App\Models\HeroItem;
use App\Models\HeroStartingItem;
use App\Models\Item;
use App\Services\StratzService;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('items:sync-hero-items')]
#[Description('Sync hero-items from Stratz API')]
class SyncHeroItems extends Command
{
    /**
     * Execute the console command.
     */
    public function handle(StratzService $stratz)
    {
        $heroes = Hero::all();
        $saved = 0;

        foreach ($heroes as $hero) {
            $query = <<<GRAPHQL
            query{
                heroStats{
                    itemFullPurchase(heroId:{$hero->stratz_id}){
                        heroId
                        itemId
                        matchCount
                        winsAverage
                    }
                    itemStartingPurchase(heroId:{$hero->stratz_id}){
                        heroId
                        itemId
                        matchCount
                        winsAverage
                    }
                }
            }
            GRAPHQL;

            $data = $stratz->query($query);

            $itemsFullPurchase = $data['heroStats']['itemFullPurchase'] ?? [];

            $itemsStartingPurchase = $data['heroStats']['itemStartingPurchase'] ?? [];

            foreach ($itemsFullPurchase as $item) {

                $dbItem = Item::where('stratz_id', $item['itemId'])->first();

                if (!$dbItem) {
                    continue;
                }

                HeroItem::updateOrCreate(
                    [
                        'hero_id' => $hero->id,
                        'item_id' => $dbItem->id,
                    ],
                    [
                        'match_count' => $item['matchCount'],
                        'wins_average' => $item['winsAverage'],
                    ]
                );
                $saved++;
            }

            foreach ($itemsStartingPurchase as $item) {

                $dbItem = Item::where('stratz_id', $item['itemId'])->first();

                if (!$dbItem) {
                    continue;
                }

                HeroStartingItem::updateOrCreate(
                    [
                        'hero_id' => $hero->id,
                        'item_id' => $dbItem->id,
                    ],
                    [
                        'match_count' => $item['matchCount'],
                        'wins_average' => $item['winsAverage'],
                    ]
                );
                $saved++;
            }
        }

        $this->info('synchronized hero items and hero starting items ' . $saved);

        return self::SUCCESS;
    }
}
