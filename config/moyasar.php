<?php

return [
    // Test keys by default. Replace with your live keys in production.
    'publishable_key' => env('MOYASAR_PUBLISHABLE_KEY', ''),
    'secret_key'      => env('MOYASAR_SECRET_KEY', ''),
    'currency'        => env('MOYASAR_CURRENCY', 'SAR'),
    'mode'            => env('MOYASAR_MODE', 'test'),
];
