<?php

namespace App\Console\Commands;

use App\Models\Item;
use App\Services\StratzService;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('items:sync')]
#[Description('Sync items from Stratz API')]
class SyncItems extends Command
{
    /**
     * Execute the console command.
     */
    public function handle(StratzService $stratz)
    {
        $query = <<<GRAPHQL
        query{
            constants{
                items{
                    id
                    shortName
                    displayName
                }
            }
        }
        GRAPHQL;

        $data = $stratz->query($query);

        $items = $data['constants']['items'] ?? [];

        foreach($items as $item){
            Item::updateOrCreate(
                [
                    'stratz_id' => $item['id']
                ],
                [
                    'name'=> $item['shortName'],
                    'displayName'=> $item['displayName'],
                    'image'=> $this->getItemImageUrl($item['shortName']),
                ]);
        }

        $this->info('Items synchronized: ' . count($items));

        return self::SUCCESS;

    }

    private function getItemImageUrl(string $item_name)
    {
        return 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/' .
            $item_name . '.png';
    }
}
