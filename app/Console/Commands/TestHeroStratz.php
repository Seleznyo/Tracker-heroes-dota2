<?php

namespace App\Console\Commands;

use App\Services\StratzService;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('heroes:test-stats')]
#[Description('Test hero statistics from STRATZ API')]
class TestHeroStratz extends Command
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

        $this->line(json_encode(
            $data,
            JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
        ));

        return self::SUCCESS;
    }
}
