<?php
require_once __DIR__ . '/config.php';

class Database {
    private static $instance = null;

    /** @var PDO $connection */
    private $connection;

    private function __construct() {
        try {
            $dsn = "pgsql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME;
            $this->connection = new PDO($dsn, DB_USER, DB_PASS, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_PERSISTENT => true
            ]);
        } catch (PDOException $e) {
            errorResponse("Database connection failed: " . $e->getMessage(), 500);
        }
    }

    /** @return Database */
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->connection;
    }

    public function prepare($sql) {
        return $this->connection->prepare($sql);
    }

    public function execute($sql, $params = []) {
        $stmt = $this->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }

    public function query($sql, $params = []) {
        return $this->execute($sql, $params)->fetchAll();
    }

    public function queryOne($sql, $params = []) {
        return $this->execute($sql, $params)->fetch();
    }

    public function lastInsertId() {
        return $this->connection->lastInsertId();
    }
}

$db = Database::getInstance();
?>