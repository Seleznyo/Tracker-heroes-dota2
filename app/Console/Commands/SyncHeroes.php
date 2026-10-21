<?php

namespace App\Console\Commands;

use App\Models\Hero;
use App\Services\StratzService;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

#[Signature('heroes:sync')]
#[Description('Sync heroes from STRATZ')]
class SyncHeroes extends Command
{


    public function handle(StratzService $stratz)
    {
        $query = <<<GRAPHQL
        query{
            constants{
                heroes{
                    id
                    name
                    displayName
                }
            }
        }
        GRAPHQL;

        $data = $stratz->query($query);

        $heroes = $data['constants']['heroes'] ?? [];

        foreach ($heroes as $hero) {
            Hero::updateOrCreate(
                ['stratz_id' => $hero['id']],
                [
                    'name' => $hero['name'],
                    'slug' => Str::of($hero['displayName'])->slug('-'),
                    'image' => $this->getHeroImageUrl($hero['name'])
                ],
            );
        }

        $this->info('Heroes synchronized: ' . count($heroes));

        return self::SUCCESS;
    }

    private function getHeroImageUrl(string $hero_name)
    {
        return 'http://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/' .
            str_replace('npc_dota_hero_', '', $hero_name) . '.png';
    }
}
