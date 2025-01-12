<?php

namespace App\Services\SharedData;

use App\Services\LanguageService;

class GetSharedDataService
{
    /**
     * @return array<string, mixed>
     */
    public function getSharedData(): array
    {
        $locale = app()->getLocale();

        $locale_to_set = LanguageService::getValidLocale($locale);

        $translation = new TranslationService();
        $translation_data = $translation->getTranslationDataByLocale($locale_to_set);

        $status = new StatusService();
        $status_data = $status->getStatusData();

        return [
            'status' => $status_data,
            'translationLocale' => $translation_data['locale'],
            'translationData' => $translation_data['data'],
        ];
    }
}
