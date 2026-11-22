<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class ApiTokenAuthMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $header = $request->header('Authorization', '');
        $token = '';

        if (preg_match('/Bearer\s+(.+)$/i', $header, $matches)) {
            $token = trim($matches[1]);
        } elseif ($request->filled('api_token')) {
            $token = $request->input('api_token');
        }

        if (empty($token)) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated: Bearer authorization token is missing.',
            ], 401);
        }

        $tokenHash = hash('sha256', $token);
        $sessionData = Cache::get('api_token_' . $tokenHash);

        if (!$sessionData || !isset($sessionData['user_id'])) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated: Invalid or expired access token.',
            ], 401);
        }

        $user = User::find($sessionData['user_id']);
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated: User not found.',
            ], 401);
        }

        Auth::setUser($user);
        $request->setUserResolver(fn () => $user);

        return $next($request);
    }
}
