<?php
class Database {
    private $db;

    public function __construct() {
        $this->db = new SQLite3('/var/www/html/db/redirects.db');
        $this->db->exec('CREATE TABLE IF NOT EXISTS redirects (id INTEGER PRIMARY KEY, path TEXT, url TEXT, deleted INTEGER DEFAULT 0, created DATETIME DEFAULT CURRENT_TIMESTAMP, UNIQUE(path, url))');
        $this->db->exec('CREATE TABLE IF NOT EXISTS visits (id INTEGER PRIMARY KEY, redirect_id INTEGER, visited DATETIME DEFAULT CURRENT_TIMESTAMP)');
    }

    public function getRedirect($path) {
        $stmt = $this->db->prepare("SELECT id, url FROM redirects WHERE path = :path AND deleted = 0");
        $stmt->bindValue(':path', $path, SQLITE3_TEXT);
        return $stmt->execute()->fetchArray();
    }

    public function createRedirect($path, $url) {
        $stmt = $this->db->prepare("INSERT INTO redirects (path, url) VALUES (:path, :url)");
        $stmt->bindValue(':path', $path, SQLITE3_TEXT);
        $stmt->bindValue(':url', $url, SQLITE3_TEXT);
        return $stmt->execute();
    }

    public function deleteRedirect($path) {
        $stmt = $this->db->prepare("UPDATE redirects SET deleted = 1 WHERE path = :path");
        $stmt->bindValue(':path', $path, SQLITE3_TEXT);
        return $stmt->execute();
    }

    public function logVisit($redirectId) {
        $stmt = $this->db->prepare("INSERT INTO visits (redirect_id) VALUES (:redirectId)");
        $stmt->bindValue(':redirectId', $redirectId, SQLITE3_INTEGER);
        return $stmt->execute();
    }

    public function getRecentRedirects() {
        $stmt = $this->db->prepare("SELECT r.path, r.url, r.created, r.deleted, COUNT(v.id) as visit_count FROM redirects r LEFT JOIN visits v ON r.id = v.redirect_id WHERE r.deleted = 0 GROUP BY r.id ORDER BY visit_count DESC");
        $result = $stmt->execute();
        $redirects = [];
        while ($row = $result->fetchArray()) {
            $redirects[] = $row;
        }
        return $redirects;
    }
}

?>