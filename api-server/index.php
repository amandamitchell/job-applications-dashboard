<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once __DIR__ . '/lib/response.php';
require_once __DIR__ . '/controllers/ApplicationsController.php';

$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if (empty($requestPath)) {
    $requestPath = '/';
}

$applicationsController = new ApplicationsController();

if (preg_match('/^\/applications\/?$/', $requestPath)) {
    if ($requestMethod === 'GET') {
        $applicationsController->list();
    } else {
        errorResponse("Method not allowed", 405);
    }
    exit;
}

errorResponse("Endpoint not found", 404);