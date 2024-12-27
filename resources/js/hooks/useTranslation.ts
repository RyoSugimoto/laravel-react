import { SharedProps } from '@/@types';
import { usePage } from '@inertiajs/react';

type Namespace<T = string> = Record<string, T>;

type TranslationData = Record<string, (Namespace<Namespace> | Namespace<string> | string)>;

export interface TranslationProps {
    data: TranslationData;
    locale: string;
}

type TranslationParams = Record<string, string | number>;

export default () => {
    const { translation: { data: translationData, locale } } = usePage<SharedProps>().props;

    /**
     * サーバから取得した翻訳テキストを返す（ロケールの判別はサーバで行なう）。キーが見つからない場合は空文字を返す。
     * @param {string} key 区切り文字（デフォルトは `.` ）で名前空間を区切った翻訳キー
     * @param {TranslationParams} params 対象の翻訳テキストの `:<キー>` で始まる部分を置き換えるキーと値
     * @param {string} delimiter 第一引数 `key` で使用する区切り文字（デフォルトは `.`）
     * @returns {string}
     */
    function get(key: string, params: TranslationParams = {}, delimiter: string = '.'): string {
        const splittedKey = !delimiter ? [key] : key.split(delimiter);
        let currentValue: TranslationData | Namespace<Namespace> | Namespace<string> | string = translationData;
        let text = '';
        for (let i = 0; i <= splittedKey.length; i++) {
            if (typeof currentValue === 'string') {
                text = currentValue;
            } else if (Object.keys(currentValue).includes(splittedKey[i])) {
                currentValue = currentValue[splittedKey[i]];
            }
        }
        // 翻訳テキストが取得できなかった場合
        if (!text) {
            console.error(`翻訳エラー: ロケール「${locale}」キー「${key}」の翻訳テキストが未定義です。フロントエンド用の翻訳ファイルをチェックしてください。`);
            text = key;
        }
        // プレースホルダにパラメータを代入
        for (const param in params) {
            text = text.replace(new RegExp(`:${param}`, 'g'), String(params[param]));
        }
        return text;
    }

    return {
        __: get,
        get,
        locale,
    };
}
