<?php
require_once __DIR__ . '/../lib/response.php';
require_once __DIR__ . '/../models/Applications.php';

class ApplicationsController {
    private $applicationsModel;

    public function __construct() {
        $this->applicationsModel = new Applications();
    }
    public function list() {
        $data = $this->applicationsModel->getAll($_GET);
        echo jsonResponse($data);
    }
}