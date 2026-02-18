<?php
require_once __DIR__ . '/../lib/db.php';

class Applications {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance();
    }

    public function getAll($params = []) {
        $page = isset($params['page']) ? (int)$params['page'] : 1;
        $perPage = isset($params['perPage']) ? (int)$params['perPage'] : 10;
        $sortBy = isset($params['sortBy']) ? $params['sortBy'] : 'createdAt';
        $sortDir = isset($params['sortDir']) ? strtoupper($params['sortDir']) : 'DESC';
        $status = isset($params['status']) ? $params['status'] : null;
        $search = isset($params['search']) ? $params['search'] : null;
        $query = isset($params['query']) ? $params['query'] : null;

        if (!in_array($sortBy, ['id', 'employer', 'title', 'createdAt', 'lastUpdated', 'status'])) {
            $sortBy = 'createdAt';
        }
        if ($sortDir !== 'ASC' && $sortDir !== 'DESC') {
            $sortDir = 'DESC';
        }

        $offset = ($page - 1) * $perPage;

        $limitParams = [
            "limit" => $perPage, 
            "offset" => $offset
        ];

        $where = [];
        $whereParams = [];

        if (!empty($status)) {
            $whereStatus = [];
            $status = explode(',', $status);
            for ($i = 0; $i < count($status); $i++) {
                $whereStatus[] = "status = :status$i";
                $whereParams["status$i"] = $status[$i];
            }
            $where[] = implode(" OR ", $whereStatus);
        }

        if ($search && $query) {
            $searchableColumns = ['employer', 'title', 'recruiter', 'recruiting_co'];
            if (in_array($search, $searchableColumns)) {
                $where[] = "$search ILIKE LOWER(:query)";
                $whereParams["query"] = "%" . $query . "%";
            }
        }

        $whereStr = !empty($where) ? "WHERE " . implode(" AND ", $where) : "";

        $sql = "SELECT * FROM applications $whereStr ORDER BY $sortBy $sortDir LIMIT :limit OFFSET :offset";
        $applications = $this->db->query($sql, array_merge($limitParams, $whereParams));

        $countSql = "SELECT COUNT(*) as total FROM applications $whereStr";
        $count = $this->db->queryOne($countSql, $whereParams);

        return [
            'applications' => $applications,
            'total' => $count['total'],
            'where' => $where,
            'whereStr' => $whereStr
        ];
    }
}