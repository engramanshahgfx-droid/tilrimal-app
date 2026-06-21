<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ActivityController;
use App\Http\Controllers\Api\PackageController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\OfferController;
use App\Http\Controllers\Api\SupportController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\FlightController;
use App\Http\Controllers\Api\HotelController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::prefix('auth')->group(function () {
    Route::post('register',    [AuthController::class, 'register']);
    Route::post('login',       [AuthController::class, 'login']);
    Route::post('send-otp',    [AuthController::class, 'sendOtp']);
    Route::post('verify-otp',  [AuthController::class, 'verifyOtp']);
});

Route::get('activities',         [ActivityController::class, 'index']);
Route::get('activities/{activity}', [ActivityController::class, 'show']);

Route::get('packages',           [PackageController::class, 'index']);
Route::get('packages/{package}', [PackageController::class, 'show']);

Route::get('offers',             [OfferController::class, 'index']);
Route::get('offers/{offer}',     [OfferController::class, 'show']);

Route::get('flights',            [FlightController::class, 'index']);
Route::get('flights/{flight}',   [FlightController::class, 'show']);

Route::get('hotels',             [HotelController::class, 'index']);
Route::get('hotels/{hotel}',     [HotelController::class, 'show']);

// Payment (publishable key + mode) - public
Route::get('payment/config',     [PaymentController::class, 'config']);

// Protected routes
Route::middleware('auth:api')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('logout',  [AuthController::class, 'logout']);
        Route::get('me',       [AuthController::class, 'me']);
        Route::post('refresh', [AuthController::class, 'refresh']);
    });

    Route::prefix('profile')->group(function () {
        Route::get('/',               [ProfileController::class, 'show']);
        Route::put('/',               [ProfileController::class, 'update']);
        Route::put('change-password', [ProfileController::class, 'changePassword']);
        Route::delete('/',            [ProfileController::class, 'destroy']);
    });

    Route::prefix('bookings')->group(function () {
        Route::get('/',            [BookingController::class, 'index']);
        Route::post('/',           [BookingController::class, 'store']);
        Route::get('/{booking}',   [BookingController::class, 'show']);
        Route::post('/flight',     [BookingController::class, 'storeFlight']);
        Route::put('/{booking}/cancel', [BookingController::class, 'cancel']);
    });

    Route::prefix('support')->group(function () {
        Route::get('/',                       [SupportController::class, 'index']);
        Route::post('/',                      [SupportController::class, 'store']);
        Route::get('/{supportTicket}',        [SupportController::class, 'show']);
    });

    // Verify a Moyasar payment then create the booking
    Route::post('payment/verify', [PaymentController::class, 'verify']);
});
