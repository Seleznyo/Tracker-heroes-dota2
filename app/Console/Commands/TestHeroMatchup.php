<?php

namespace App\Console\Commands;

use App\Services\StratzService;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('heroes:test-matchup')]
#[Description('Test hero mathup from STRATZ API')]
class TestHeroMatchup extends Command
{
    public function handle(StratzService $stratz)
    {

        $query = <<<GRAPHQL
        query{
            heroStats{
                heroVsHeroMatchup(heroId:1){
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

        $this->line(json_encode(
            $data,
            JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
        ));

        return self::SUCCESS;
    }
}
