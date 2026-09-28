<?php

namespace App\Console\Commands;

use App\Models\Hero;
use App\Models\HeroMatchup;
use App\Services\StratzService;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('heroes:sync-matchups')]
#[Description('Sync hero matchups from STRATZ')]
class SyncHeroMatchups extends Command
{

    public function handle(StratzService $stratz)
    {
        $heroes = Hero::all();
        $saved = 0;
        foreach ($heroes as $hero) {

            $query = <<<GRAPHQL
            query{
                heroStats{
                    heroVsHeroMatchup(heroId:{$hero->stratz_id}){
                        advantage{
                            heroId
                                vs{
                                    heroId2
                                    matchCount
                                    winCount
                                    winsAverage
                                }
                        }
                    }
                }
            }
            GRAPHQL;

            $data = $stratz->query($query);

            $advantage = $data['heroStats']['heroVsHeroMatchup']['advantage'] ?? [];

            foreach ($advantage as $item) {
                foreach ($item['vs'] ?? [] as $matchup) {
                    $opponent = Hero::where('stratz_id', $matchup['heroId2'])->first();

                    if (!$opponent) {
                        continue;
                    }

                    HeroMatchup::updateOrCreate(
                        [
                            'hero_id' => $hero->id,
                            'opponent_hero_id' => $opponent->id,
                        ],
                        [
                            'match_count' => $matchup['matchCount'],
                            'win_count' => $matchup['winCount'],
                            'average_win' => $matchup['winsAverage'],
                        ]
                    );
                    $saved++;
                }
            }
        }
        $this->info("Matchups synchronized: {$saved}");
        
        return self::SUCCESS;
    }
}
