<?php

namespace App\Domain\SharedData\Translation;

class TranslationEntity
{
    public function __construct(
        private string $locale,
        private string $json
    )
    {
        //
    }

    public function getLocale()
    {
        return $this->locale;
    }

    public function getJson()
    {
        return $this->json;
    }
}
