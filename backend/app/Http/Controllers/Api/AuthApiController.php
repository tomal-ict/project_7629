<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

class AuthApiController extends Controller
{
    /**
     * Admin login with brute-force rate-limiting and secure bearer token generation.
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $ip = $request->ip();
        $rateLimitKey = 'login_attempts:' . $ip;

        // Rate limiting: maximum 5 attempts per 2 minutes
        if (RateLimiter::tooManyAttempts($rateLimitKey, 5)) {
            $seconds = RateLimiter::availableIn($rateLimitKey);
            return response()->json([
                'success' => false,
                'message' => "Too many login attempts. Please try again in {$seconds} seconds.",
            ], 429);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            RateLimiter::hit($rateLimitKey, 120);
            return response()->json([
                'success' => false,
                'message' => 'The provided credentials do not match our records.',
            ], 401);
        }

        // Reset rate limiter on successful authentication
        RateLimiter::clear($rateLimitKey);

        // Generate high-entropy 64-character bearer token
        $token = bin2hex(random_bytes(32));
        $tokenHash = hash('sha256', $token);
        $ttlSeconds = 86400; // 24 hours

        Cache::put('api_token_' . $tokenHash, [
            'user_id'    => $user->id,
            'email'      => $user->email,
            'name'       => $user->name,
            'ip'         => $ip,
            'created_at' => now()->toIso8601String(),
            'expires_at' => now()->addSeconds($ttlSeconds)->toIso8601String(),
        ], $ttlSeconds);

        return response()->json([
            'success'    => true,
            'message'    => 'Login successful.',
            'token'      => $token,
            'user'       => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
            ],
            'expires_in' => $ttlSeconds,
        ]);
    }

    /**
     * Retrieve the authenticated user profile.
     */
    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'success' => true,
            'user'    => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
            ],
        ]);
    }

    /**
     * Invalidate and revoke current access token.
     */
    public function logout(Request $request): JsonResponse
    {
        $header = $request->header('Authorization', '');
        if (preg_match('/Bearer\s+(.+)$/i', $header, $matches)) {
            $token = trim($matches[1]);
            $tokenHash = hash('sha256', $token);
            Cache::forget('api_token_' . $tokenHash);
        }

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully.',
        ]);
    }
}
