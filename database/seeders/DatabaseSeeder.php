<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\Flight;
use App\Models\Hotel;
use App\Models\Booking;
use App\Models\FlightBooking;
use App\Models\Offer;
use App\Models\Package;
use App\Models\PackageActivity;
use App\Models\PackageCity;
use App\Models\Passenger;
use App\Models\SupportTicket;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user (can access the React admin panel)
        User::updateOrCreate(
            ['email' => 'admin@remal.com'],
            ['name' => 'مدير النظام', 'password' => 'password123', 'phone' => '0500000000', 'is_active' => true, 'is_admin' => true]
        );

        // Regular test user (no admin access)
        $testUser = User::firstOrCreate(
            ['email' => 'test@remal.com'],
            ['name' => 'عبدالوهاب سمكري', 'password' => 'password123', 'phone' => '0501234567', 'is_active' => true]
        );

        // Sample bookings for the test user
        if ($testUser->bookings()->count() === 0) {
            $current = Booking::create([
                'user_id'    => $testUser->id,
                'type'       => 'flight',
                'status'     => 'booked',
                'price'      => 4709,
                'is_current' => true,
            ]);
            FlightBooking::create([
                'booking_id'        => $current->id,
                'airline'           => 'الخطوط الجوية السعودية',
                'departure_airport' => 'جدة (JED)',
                'arrival_airport'   => 'الرياض (RUH)',
                'departure_time'    => '10:00',
                'arrival_time'      => '12:00',
                'departure_date'    => now()->addDays(20)->toDateString(),
                'duration'          => 'ساعتان',
                'stops'             => 0,
            ]);
            Passenger::create([
                'booking_id'      => $current->id,
                'name'            => 'عبدالوهاب سمكري',
                'email'           => 'test@remal.com',
                'phone'           => '966534342131',
                'passport_number' => 'MC12387',
                'passport_expiry' => '2027-09-16',
                'birth_date'      => '2009-09-16',
                'nationality'     => 'السعودية',
                'gender'          => 'male',
            ]);

            // A previous (cancelled) booking
            Booking::create([
                'user_id'    => $testUser->id,
                'type'       => 'hotel',
                'status'     => 'cancelled',
                'price'      => 2500,
                'is_current' => false,
            ]);
        }

        // Sample support ticket with an admin reply
        if ($testUser->supportTickets()->count() === 0) {
            SupportTicket::create([
                'user_id'     => $testUser->id,
                'subject'     => 'استفسار عن رحلة',
                'message'     => 'السلام عليكم ممكن مساعدة ، أرغب في الغاء رحلة T5529',
                'admin_reply' => 'تم الغاء الرحلة ، خدمة أخرى ؟',
                'status'      => 'closed',
            ]);
        }

        // Sample Activities
        $activities = [
            ['title' => 'رحلة البحر الأحمر', 'description' => 'استمتع بجمال الشعاب المرجانية في البحر الأحمر', 'location' => 'جدة - السعودية', 'price' => 1500, 'is_active' => true, 'sort_order' => 1],
            ['title' => 'جولة العُلا التاريخية', 'description' => 'اكتشف المدائن الصالح والآثار النبطية', 'location' => 'العُلا - السعودية', 'price' => 2500, 'is_active' => true, 'sort_order' => 2],
            ['title' => 'تجربة الربع الخالي', 'description' => 'مغامرة في أكبر صحراء رملية في العالم', 'location' => 'الربع الخالي - السعودية', 'price' => 3000, 'is_active' => true, 'sort_order' => 3],
            ['title' => 'رحلة نيوم', 'description' => 'تجربة فريدة في مدينة المستقبل', 'location' => 'نيوم - السعودية', 'price' => 5000, 'is_active' => true, 'sort_order' => 4],
        ];

        foreach ($activities as $activity) {
            Activity::firstOrCreate(['title' => $activity['title']], $activity);
        }

        // Sample Packages
        $package1 = Package::firstOrCreate(
            ['title' => 'الباقة الكلاسيكية - الغرب السعودي'],
            ['location' => 'السعودية - جدة', 'trip_type' => 'local', 'price' => 8500, 'nights_count' => 7, 'is_active' => true, 'sort_order' => 1]
        );

        if ($package1->cities()->count() === 0) {
            PackageCity::insert([
                ['package_id' => $package1->id, 'city' => 'جدة', 'nights' => 2, 'sort_order' => 1, 'created_at' => now(), 'updated_at' => now()],
                ['package_id' => $package1->id, 'city' => 'مكة المكرمة', 'nights' => 2, 'sort_order' => 2, 'created_at' => now(), 'updated_at' => now()],
                ['package_id' => $package1->id, 'city' => 'الطائف', 'nights' => 1, 'sort_order' => 3, 'created_at' => now(), 'updated_at' => now()],
                ['package_id' => $package1->id, 'city' => 'المدينة المنورة', 'nights' => 2, 'sort_order' => 4, 'created_at' => now(), 'updated_at' => now()],
            ]);
            PackageActivity::insert([
                ['package_id' => $package1->id, 'activity_name' => 'المتاحف', 'created_at' => now(), 'updated_at' => now()],
                ['package_id' => $package1->id, 'activity_name' => 'التسوق', 'created_at' => now(), 'updated_at' => now()],
                ['package_id' => $package1->id, 'activity_name' => 'الزيارات الدينية', 'created_at' => now(), 'updated_at' => now()],
            ]);
        }

        $package2 = Package::firstOrCreate(
            ['title' => 'باقة العُلا الدولية'],
            ['location' => 'السعودية - الرياض', 'trip_type' => 'international', 'price' => 14500, 'nights_count' => 12, 'is_active' => true, 'sort_order' => 2]
        );

        if ($package2->cities()->count() === 0) {
            PackageCity::insert([
                ['package_id' => $package2->id, 'city' => 'الرياض', 'nights' => 3, 'sort_order' => 1, 'created_at' => now(), 'updated_at' => now()],
                ['package_id' => $package2->id, 'city' => 'العُلا', 'nights' => 4, 'sort_order' => 2, 'created_at' => now(), 'updated_at' => now()],
                ['package_id' => $package2->id, 'city' => 'نيوم', 'nights' => 3, 'sort_order' => 3, 'created_at' => now(), 'updated_at' => now()],
                ['package_id' => $package2->id, 'city' => 'جدة', 'nights' => 2, 'sort_order' => 4, 'created_at' => now(), 'updated_at' => now()],
            ]);
            PackageActivity::insert([
                ['package_id' => $package2->id, 'activity_name' => 'المتاحف', 'created_at' => now(), 'updated_at' => now()],
                ['package_id' => $package2->id, 'activity_name' => 'مدن الملاهي', 'created_at' => now(), 'updated_at' => now()],
                ['package_id' => $package2->id, 'activity_name' => 'الأنشطة الرياضية', 'created_at' => now(), 'updated_at' => now()],
                ['package_id' => $package2->id, 'activity_name' => 'المزيد +', 'created_at' => now(), 'updated_at' => now()],
            ]);
        }

        // Sample Offers
        $offers = [
            ['title' => 'عرض الصيف الذهبي', 'description' => 'خصم 30% على جميع الباقات السياحية', 'original_price' => 10000, 'discounted_price' => 7000, 'discount_percentage' => 30, 'is_active' => true, 'sort_order' => 1, 'expires_at' => now()->addMonths(2)],
            ['title' => 'باقة العائلة المميزة', 'description' => 'رحلة عائلية شاملة بأفضل الأسعار', 'original_price' => 20000, 'discounted_price' => 16000, 'discount_percentage' => 20, 'is_active' => true, 'sort_order' => 2, 'expires_at' => now()->addMonths(3)],
        ];

        foreach ($offers as $offer) {
            Offer::firstOrCreate(['title' => $offer['title']], $offer);
        }

        // Sample Flights
        $flights = [
            ['airline' => 'الخطوط الجوية السعودية', 'departure_airport' => 'جدة (JED)', 'arrival_airport' => 'الرياض (RUH)', 'departure_time' => '10:00', 'arrival_time' => '12:00', 'departure_date' => now()->addDays(15)->toDateString(), 'duration' => 'ساعتان', 'stops' => 0, 'price' => 4709, 'sort_order' => 1],
            ['airline' => 'طيران ناس', 'departure_airport' => 'جدة (JED)', 'arrival_airport' => 'الدمام (DMM)', 'departure_time' => '14:30', 'arrival_time' => '16:15', 'departure_date' => now()->addDays(16)->toDateString(), 'duration' => 'ساعة و45 د', 'stops' => 0, 'price' => 5029, 'sort_order' => 2],
            ['airline' => 'طيران أديل', 'departure_airport' => 'الرياض (RUH)', 'arrival_airport' => 'أبها (AHB)', 'departure_time' => '09:00', 'arrival_time' => '10:30', 'departure_date' => now()->addDays(18)->toDateString(), 'duration' => 'ساعة و30 د', 'stops' => 0, 'price' => 5349, 'sort_order' => 3],
            ['airline' => 'الخطوط الجوية السعودية', 'departure_airport' => 'جدة (JED)', 'arrival_airport' => 'المدينة (MED)', 'departure_time' => '18:00', 'arrival_time' => '19:00', 'departure_date' => now()->addDays(20)->toDateString(), 'duration' => 'ساعة', 'stops' => 0, 'price' => 5669, 'sort_order' => 4],
        ];
        foreach ($flights as $f) {
            Flight::firstOrCreate(['airline' => $f['airline'], 'departure_time' => $f['departure_time'], 'arrival_airport' => $f['arrival_airport']], $f);
        }

        // Sample Hotels
        $hotels = [
            ['name' => 'فندق الريتز كارلتون', 'city' => 'الرياض', 'description' => 'فخامة وخدمة عالمية في قلب الرياض', 'price' => 950, 'rating' => 5, 'sort_order' => 1],
            ['name' => 'منتجع البحر الأحمر', 'city' => 'جدة', 'description' => 'إطلالات بحرية ساحرة وشاطئ خاص', 'price' => 800, 'rating' => 5, 'sort_order' => 2],
            ['name' => 'فندق نسمة الطائف', 'city' => 'الطائف', 'description' => 'أجواء جبلية هادئة ومنعشة', 'price' => 650, 'rating' => 4, 'sort_order' => 3],
            ['name' => 'فندق العُلا التراثي', 'city' => 'العُلا', 'description' => 'تجربة إقامة وسط الطبيعة والآثار', 'price' => 1100, 'rating' => 5, 'sort_order' => 4],
            ['name' => 'منتجع نيوم', 'city' => 'نيوم', 'description' => 'إقامة عصرية في مدينة المستقبل', 'price' => 1500, 'rating' => 5, 'sort_order' => 5],
        ];
        foreach ($hotels as $h) {
            Hotel::firstOrCreate(['name' => $h['name']], $h);
        }
    }
}
