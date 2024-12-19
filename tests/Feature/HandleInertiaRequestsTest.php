<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Http\Request;
use PHPUnit\Framework\Attributes\Test;
use App\Http\Middleware\HandleInertiaRequests;

class HandleInertiaRequestsTest extends TestCase
{
    /** @var Request */
    private $test_request;
    /** @var HandleInertiaRequests インスタンス */
    private $handle_inertia_requests;

    public function setUp(): void
    {
        parent::setUp();
        $this->test_request = Request::create('/', 'GET');
        $this->handle_inertia_requests = new HandleInertiaRequests();
    }

    #[Test]
    public function クライアント言語が「英語」の場合のプロパティ(): void
    {
        $this->test_request->headers->set('Accept-Language', 'en');
        $file_path = lang_path('frontend/en.json');
        // 翻訳ファイルの存在の確認
        $this->assertFileExists($file_path);
        /** @var array<string, mixed> 翻訳データの連想配列 */
        $data = json_decode(file_get_contents($file_path), true);
        /** @var array<string, mixed> `share` メソッドの戻り値 */
        $response = $this->handle_inertia_requests->share($this->test_request);
        // 翻訳関連データがフロントエンドとの共有プロパティとして存在しているか
        $this->assertArrayHasKey('translation', $response);
        $this->assertArrayHasKey('data', $response['translation']);
        $this->assertArrayHasKey('locale', $response['translation']);
        // 共有されたロケールが指定通りか
        $this->assertEquals('en', $response['translation']['locale']);
        // データが正しいか
        $this->assertEquals($data, $response['translation']['data']);
    }

    #[Test]
    public function クライアント言語が「日本語」の場合のプロパティ(): void
    {
        $this->test_request->headers->set('Accept-Language', 'ja');
        $file_path = lang_path('frontend/ja.json');
        // 翻訳ファイルの存在の確認
        $this->assertFileExists($file_path);
        /** @var array<string, mixed> 翻訳データの連想配列 */
        $data = json_decode(file_get_contents($file_path), true);
        /** @var array<string, mixed> `share` メソッドの戻り値 */
        $response = $this->handle_inertia_requests->share($this->test_request);
        // 翻訳関連データがフロントエンドとの共有プロパティとして存在しているか
        $this->assertArrayHasKey('translation', $response);
        $this->assertArrayHasKey('data', $response['translation']);
        $this->assertArrayHasKey('locale', $response['translation']);
        // 共有されたロケールが指定通りか
        $this->assertEquals('ja', $response['translation']['locale']);
        // データが正しいか
        $this->assertEquals($data, $response['translation']['data']);
    }

    #[Test]
    public function クライアント言語が「英語・日本語以外」の場合のプロパティ(): void
    {
        $primary_locale = 'ja';
        $this->test_request->headers->set('Accept-Language', 'hoge');
        $file_path = lang_path("frontend/{$primary_locale}.json");
        // 翻訳ファイルの存在の確認
        $this->assertFileExists($file_path);
        /** @var array<string, mixed> 翻訳データの連想配列 */
        $data = json_decode(file_get_contents($file_path), true);
        $response = $this->handle_inertia_requests->share($this->test_request);
        // 翻訳関連データがフロントエンドと共有されているか
        $this->assertArrayHasKey('translation', $response);
        $this->assertArrayHasKey('data', $response['translation']);
        $this->assertArrayHasKey('locale', $response['translation']);
        // 共有されたロケールが指定通りか
        $this->assertEquals($primary_locale, $response['translation']['locale']);
        // 共有されたロケールが指定通りか
        $this->assertEquals('ja', $response['translation']['locale']);
        // データが正しいか
        $this->assertEquals($data, $response['translation']['data']);
    }
}
