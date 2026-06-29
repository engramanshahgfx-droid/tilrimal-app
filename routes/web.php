<?php

use App\Http\Controllers\Admin\ActivityController;
use App\Http\Controllers\Admin\Auth\LoginController;
use App\Http\Controllers\Admin\BookingController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\OfferController;
use App\Http\Controllers\Admin\PackageController;
use App\Http\Controllers\Admin\SupportTicketController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\SearchController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/admin');

Route::view('/privacy', 'privacy-policy')->name('privacy');

// Language switch – stores locale in session then redirects back
Route::get('/switch-lang/{locale}', function (string $locale) {
    if (in_array($locale, ['ar', 'en'], true)) {
        session()->put('locale', $locale);
        app()->setLocale($locale);
    }
    return back();
})->name('switch.lang');

/*
|--------------------------------------------------------------------------
| Admin panel
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->name('admin.')->group(function () {
    // Guest (login)
    Route::middleware('guest')->group(function () {
        Route::get('login', [LoginController::class, 'create'])->name('login');
        Route::post('login', [LoginController::class, 'store'])->name('login.store');
    });

    Route::post('logout', [LoginController::class, 'destroy'])
        ->middleware('auth')
        ->name('logout');

    // Authenticated admins only
    Route::middleware(['auth', 'admin'])->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        Route::resource('activities', ActivityController::class)->except(['show']);
        Route::resource('offers', OfferController::class)->except(['show']);
        Route::resource('packages', PackageController::class)->except(['show']);
        Route::resource('bookings', BookingController::class)->except(['show']);
        Route::resource('users', UserController::class)->except(['show']);

        // Support tickets: list / edit (reply) / update / delete only
        Route::get('support-tickets', [SupportTicketController::class, 'index'])->name('support-tickets.index');
        Route::get('support-tickets/{support_ticket}/edit', [SupportTicketController::class, 'edit'])->name('support-tickets.edit');
        Route::put('support-tickets/{support_ticket}', [SupportTicketController::class, 'update'])->name('support-tickets.update');
        Route::delete('support-tickets/{support_ticket}', [SupportTicketController::class, 'destroy'])->name('support-tickets.destroy');

        // Search log (read-only)
        Route::get('searches', [SearchController::class, 'index'])->name('searches.index');

        // App settings (single edit form)
        Route::get('settings', [SettingController::class, 'edit'])->name('settings.edit');
        Route::put('settings', [SettingController::class, 'update'])->name('settings.update');
    });
});
