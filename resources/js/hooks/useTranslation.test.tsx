import { describe, expect, it, vi } from 'vitest';
import useTranslation from './useTranslation';

const locale = 'ja';
const translationData = {
    'Hello': 'こんにちは',
    'Hello world.': 'こんにちは世界。',
    'placeholder1': 'プレースホルダは「:attr1」と「:attr2」です。:attr3',
    'placeholder2': 'プレースホルダは「:attr」と「:attr」です。',
    'namespace1': {
        'Hello': '名前空間1のこんにちは',
        'Hello world.': '名前空間1のこんにちは世界。',
    },
};

vi.mock('@inertiajs/react', () => {
    return {
        /**
         * Inertia.jsの `usePage` でサーバから翻訳テキストを取得することを想定したモック
         */
        'usePage': () => {
            return {
                props: {
                    // `App\Http\Middleware\HandleInertiaRequests::share` の返却値と合わせる。
                    translation: {
                        data: translationData,
                        locale,
                    },
                },
            };
        },
    };
});

describe('useTranslation', () => {
    const { __, get, locale } = useTranslation();

    it('`locale` プロパティでロケールが取得できる。', () => {
        expect(locale, 'ja');
    });

    it('`__` は `get` メソッドである。', () => {
        expect(__).equals(get);
    });

    describe('`get` メソッド', () => {
        it('翻訳テキストが取得できる。', () => {
            expect(get('Hello', {}, '')).toBe('こんにちは');
        });

        it('デリミタを空文字に変更してピリオドを含むキーの翻訳テキストが取得できる。', () => {
            expect(get('Hello world.', {}, '')).toBe('こんにちは世界。');
        });

        it('名前空間を指定して翻訳テキストを取得できる。', () => {
            expect(get('namespace1.Hello')).toBe('名前空間1のこんにちは');
        });

        it('デリミタを変更した上で名前空間を指定して翻訳テキストを取得できる。', () => {
            expect(get('namespace1¥Hello world.', {}, '¥')).toBe('名前空間1のこんにちは世界。');
        });

        it('プレースホルダが置き換えられる。渡さなかったパラメータはプレースホルダのまま。余計なパラメータは無視される。', () => {
            expect(get('placeholder1', {
                attr1: 123,
                attr2: 'あいうえお',
                attr4: 'hoge',
            })).toBe('プレースホルダは「123」と「あいうえお」です。:attr3');
        });

        it('同じプレースホルダが2つ以上ある場合、すべてが置き換えられる。', () => {
            expect(get('placeholder2', {
                attr: 123,
            })).toBe('プレースホルダは「123」と「123」です。')
        });

        it('存在しないキーを指定するとキーそのものが返る。', () => {
            expect(get('hoge.hoge')).toBe('hoge.hoge');
        });
    });
});
