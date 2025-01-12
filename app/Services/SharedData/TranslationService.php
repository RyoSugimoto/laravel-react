<?php

namespace App\Services\SharedData;

use App\Domain\SharedData\Translation\{
    TranslationDTO,
    TranslationEntity
};

class TranslationService
{
    /**
     * @return array{locale: string, data: array<string, mixed>}
     */
    public function getTranslationDataByLocale(string $locale): array
    {
        try {

            $json_path = lang_path("frontend/{$locale}.json");
            $json = file_get_contents($json_path);
            $entity = new TranslationEntity(
                $locale,
                $json
            );
            $dto = TranslationDTO::fromEntity($entity);

            return $dto->toArray();

        } catch(\Exception $e) {

            // 翻訳ファイルが存在しない場合
            throw new \Exception(
                "ロケール `{$locale}` の翻訳ファイル {$json_path} が見つかりません。{$e->getMessage()}"
            );

        }
    }
}
