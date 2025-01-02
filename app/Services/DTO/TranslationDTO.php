<?php

namespace App\Services\DTO;

class TranslationDTO
{
    private string $json_content;
    private string $locale;

    public function __construct(
        string $json_content,
        string $locale
    )
    {
        $this->json_content = $json_content;
        $this->locale = $locale;
    }

    static public function fromLocale(string $locale): self
    {
        $json_content = self::getJsonByLocale($locale);
        $object = new self(
            $json_content,
            $locale
        );

        return $object;
    }

    static protected function getJsonByLocale($locale): string
    {
        try {
            $json_path = lang_path("frontend/{$locale}.json");
            $json = file_get_contents($json_path);
            return $json;
        } catch(\Exception $e) {
            // 翻訳ファイルが存在しない場合
            throw new \Exception("ロケール `{$locale}` の翻訳ファイル {$json_path} が見つかりません。{$e->getMessage()}");
        }
    }

    public function toArrayForClient(): array
    {
        $json_content = $this->json_content;
        $data = json_decode($json_content, true);

        return [
            'data' => $data,
            'locale' => $this->locale,
        ];
    }
}
