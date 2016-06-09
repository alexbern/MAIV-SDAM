<?php

require_once WWW_ROOT . 'dao' . DS . 'DAO.php';

class ProjectDAO extends DAO {
  public function selectAll() {
    $sql = "SELECT *
            FROM `sdam_projects`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT *
            FROM `sdam_projects` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function searchProjects($q){
    $sql = "SELECT *
            FROM `sdam_projects` where `name` LIKE '%$q%'";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function getExtraSearches($limit) {
    $sql = "SELECT * FROM `sdam_projects` ORDER BY RAND() LIMIT :amount";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':amount', $limit);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }
}
