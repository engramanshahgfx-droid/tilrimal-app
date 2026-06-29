<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Allows the mobile / web client (e.g. https://app.tilalr.com) to call the
    | API and load storage images. The API uses stateless JWT bearer tokens
    | (not cookies), so wildcard origins are safe here.
    |
    */

    'paths' => ['api/*', 'storage/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['*'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
