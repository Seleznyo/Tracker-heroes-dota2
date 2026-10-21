<?php

namespace App\Console\Commands;

use App\Models\HeroStat;
use App\Models\Hero;
use App\Services\StratzService;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('heroes:sync-stats')]
#[Description('Sync monthly hero statistics from STRATZ')]
class SyncHeroStats extends Command
{
    /**
     * Execute the console command.
     */
    public function handle(StratzService $stratz)
    {
        $query = <<<GRAPHQL
        query{
            heroStats{
                winMonth{
                    heroId
                    month
                    winCount
                    matchCount
                }
            }
        }
        GRAPHQL;

        $data = $stratz->query($query);

        $stats = $data['heroStats']['winMonth'] ?? [];

        foreach ($stats as $stat) {
            $hero = Hero::where('stratz_id', $stat['heroId'])->first();

            if(!$hero){
                continue;
            }

            HeroStat::updateOrCreate(
                [
                    'hero_id' => $hero->id,
                    'month' => $stat['month'],
                ],
                [
                    'win_count' => $stat['winCount'],
                    'match_count' => $stat['matchCount']
                ]
            );
        }

        $this->info('Hero statistics synchronized: ' . count($stats));

        return self::SUCCESS;
    }   
}
