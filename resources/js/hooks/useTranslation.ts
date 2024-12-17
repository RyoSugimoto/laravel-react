import type { PageProps } from "@inertiajs/core";
import { usePage } from "@inertiajs/react";

type Namespace<T = string> = Record<string, T>;
type TranslationData = Record<string, (Namespace<Namespace> | Namespace<string> | string)>;
interface TranslationProp {
    data: TranslationData;
    locale: string;
}
interface TranslationPageProps extends PageProps {
    translation: TranslationProp;
}
type TranslationParams = Record<string, string | number>;

export default () => {
    const { translation } = usePage<TranslationPageProps>().props;
    const translationData = translation.data as TranslationData;
    const locale = translation.locale ?? '' as string;

    /**
     * サーバから取得した翻訳テキストを返す（ロケールの判別はサーバで行なう）。
     * @param {string} key 名前空間が `.` で区切られた翻訳キー
     * @param {TranslationParams} params 対象の翻訳テキストの `:<キー>` で始まる部分を置き換えるキーと値
     * @param {string} fallback? 翻訳キーが見つからなかった場合に使用するテキスト
     * @returns {string}
     */
    function get(key: string, params: TranslationParams = {}, fallback?: string): string {
        const splittedKey = key.split('.');
        let namespace: TranslationData | Namespace<Namespace> | Namespace<string> | string = translationData;
        let text = fallback;
        for (let i = 0; i <= splittedKey.length; i++) {
            if (typeof namespace === 'string') {
                text = namespace;
            } else if (Object.keys(namespace).includes(splittedKey[i])) {
                namespace = namespace[splittedKey[i]];
            }
        }
        if (!text) {
            console.error(`翻訳エラー: ロケール「${locale}」キー「${key}」の翻訳テキストが未定義です。フロントエンド用の翻訳ファイルをチェックしてください。`);
            text = key;
        }
        for (const param in params) {
            text = text.replace(`:${param}`, String(params[param]));
        }
        return text;
    }

    return {
        __: get,
        get,
        locale,
    };
}
