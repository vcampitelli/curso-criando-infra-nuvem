<?php

declare(strict_types=1);

namespace App\Application\Actions;

use Psr\Http\Message\ResponseInterface;

class StressAction extends Action
{
    protected function action(): ResponseInterface
    {
        $string = '';
        for ($i = 0; $i < 100000000; $i++) {
            $string = "$i";
        }
        return $this->respondWithData([
            'status' => true,
            'count' => $string,
            'hostname' => \gethostname(),
        ]);
    }
}
