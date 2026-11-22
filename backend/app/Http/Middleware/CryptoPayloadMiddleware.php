<?php

namespace App\Http\Middleware;

use App\Services\CryptoService;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class CryptoPayloadMiddleware
{
    protected CryptoService $crypto;

    public function __construct(CryptoService $crypto)
    {
        $this->crypto = $crypto;
    }

    public function handle(Request $request, Closure $next): Response
    {
        $wantsEncryption = $request->header('X-Encrypted') === '1' 
            || $request->header('X-Encrypted-Payload') === '1'
            || $request->has(['payload', 'iv', 'mac']);

        // Check if request body contains encrypted payload
        if ($request->has(['payload', 'iv', 'mac'])) {
            try {
                $payload = $request->input('payload');
                $iv = $request->input('iv');
                $mac = $request->input('mac');

                $decrypted = $this->crypto->decrypt($payload, $iv, $mac);

                if (is_array($decrypted)) {
                    $request->merge($decrypted);
                    // Also replace request json content if applicable
                    $request->setJson(new \Symfony\Component\HttpFoundation\InputBag($decrypted));
                }

                $request->attributes->set('was_encrypted', true);
            } catch (Throwable $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Encrypted payload decryption error: ' . $e->getMessage(),
                ], 400);
            }
        }

        $response = $next($request);

        // Encrypt outgoing JSON response if requested or if request was encrypted
        if ($wantsEncryption && $response instanceof JsonResponse) {
            $originalData = $response->getData(true);
            try {
                $encryptedPayload = $this->crypto->encrypt($originalData);
                $response->setData($encryptedPayload);
                $response->headers->set('X-Encrypted-Response', '1');
            } catch (Throwable $e) {
                // If encryption fails, fallback to original response with error header
                $response->headers->set('X-Encryption-Error', $e->getMessage());
            }
        }

        return $response;
    }
}
