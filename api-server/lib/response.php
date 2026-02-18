<?php
function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    
    if ($statusCode >= 400) {
        return json_encode(['error' => $data], JSON_UNESCAPED_SLASHES);
    }
    return json_encode($data, JSON_UNESCAPED_SLASHES);
}

function errorResponse($message, $statusCode = 500) {
    echo jsonResponse($message, $statusCode);
    exit;
}