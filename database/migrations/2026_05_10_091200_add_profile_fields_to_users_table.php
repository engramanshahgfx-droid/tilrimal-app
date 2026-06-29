<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable()->after('email');
            $table->string('nationality')->nullable();
            $table->string('passport_number')->nullable();
            $table->date('passport_expiry')->nullable();
            $table->date('birth_date')->nullable();
            $table->enum('gender', ['male', 'female'])->nullable();
            $table->boolean('is_active')->default(true);
            $table->string('otp')->nullable();
            $table->timestamp('otp_expires_at')->nullable();
            $table->boolean('phone_verified')->default(false);
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'phone', 'nationality', 'passport_number', 'passport_expiry',
                'birth_date', 'gender', 'is_active', 'otp', 'otp_expires_at', 'phone_verified',
            ]);
        });
    }
};
