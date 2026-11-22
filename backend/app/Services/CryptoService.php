<?php

namespace App\Services;

use Exception;
use Illuminate\Http\Request;

class CryptoService
{
    private string $key;
    private string $cipher = 'aes-256-cbc';

    public function __construct()
    {
        $secret = env('API_SECRET_KEY') ?: 'ABC_AI_System_Secret_Key_2026_Enterprise_Secure';
        $this->key = hash('sha256', (string) $secret, true);
    }

    /**
     * Encrypt any data (array, string, object) into AES-256-CBC payload with HMAC verification.
     */
    public function encrypt(mixed $data): array
    {
        $plaintext = is_string($data) ? $data : json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        $iv = random_bytes(16);
        $ciphertext = openssl_encrypt($plaintext, $this->cipher, $this->key, OPENSSL_RAW_DATA, $iv);

        if ($ciphertext === false) {
            throw new Exception('OpenSSL encryption failed: ' . openssl_error_string());
        }

        // HMAC calculated over binary IV + ciphertext
        $mac = hash_hmac('sha256', $iv . $ciphertext, $this->key);

        return [
            'encrypted' => true,
            'payload'   => base64_encode($ciphertext),
            'iv'        => base64_encode($iv),
            'mac'       => $mac,
        ];
    }

    /**
     * Decrypt an encrypted payload with IV and HMAC.
     */
    public function decrypt(string $payloadBase64, string $ivBase64, string $mac): mixed
    {
        $ciphertext = base64_decode($payloadBase64, true);
        $iv = base64_decode($ivBase64, true);

        if ($ciphertext === false || $iv === false || strlen($iv) !== 16) {
            throw new Exception('Invalid encrypted payload encoding or IV length.');
        }

        // Verify MAC
        $expectedMac = hash_hmac('sha256', $iv . $ciphertext, $this->key);
        if (!hash_equals($expectedMac, $mac)) {
            throw new Exception('Payload integrity check failed: HMAC verification mismatch.');
        }

        $decrypted = openssl_decrypt($ciphertext, $this->cipher, $this->key, OPENSSL_RAW_DATA, $iv);
        if ($decrypted === false) {
            throw new Exception('OpenSSL decryption failed: ' . openssl_error_string());
        }

        $decodedJson = json_decode($decrypted, true);
        return (json_last_error() === JSON_ERROR_NONE) ? $decodedJson : $decrypted;
    }

    /**
     * Check if request contains an encrypted body
     */
    public function isEncryptedRequest(Request $request): bool
    {
        return $request->has(['payload', 'iv', 'mac']) 
            || $request->header('X-Encrypted') === '1'
            || $request->header('X-Encrypted-Payload') === '1';
    }

    /**
     * Get public-safe crypto metadata (algorithm and status)
     */
    public function getCryptoInfo(): array
    {
        return [
            'enabled' => true,
            'algorithm' => 'AES-256-CBC',
            'auth' => 'HMAC-SHA256',
            'status' => 'active',
        ];
    }
}
