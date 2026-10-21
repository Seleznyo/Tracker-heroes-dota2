<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;


class StratzService
{

    public function query(string $query, array $variables = []): array
    {
        $response = Http::withToken(config('services.stratz.token'))
            ->withHeaders(['User-Agent' => 'STRATZ_API'])
            ->post(
                config('services.stratz.url'),
                [
                    'query' => $query,
                ]
            );

        $response->throw();

        $data = $response->json();

        if (isset($data['errors'])) {
            throw new \Exception(
                $data['errors'][0]['message'] ?? 'STRATZ GRAPHQL ERROR'
            );
        }

        return $data['data'] ?? [];
    }
}
