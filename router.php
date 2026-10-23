<?php
// Local development only. `php -S` ignores .htaccess, so mirror its denials here.
$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
if (preg_match('#/(\.|README\.md$|Makefile$|router\.php$|tests/|guidelines/)#', $path)) {
    http_response_code(403);
    echo 'Forbidden';
    return true;
}
return false;
