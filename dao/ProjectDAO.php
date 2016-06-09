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

  public function insertProject($data, $img){
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `sdam_projects` (`name`, `owner_id`, `shortdesc`, `intro`, `description`, `img1`)
              VALUES (:name, :owner_id, :shortdesc, :intro, :description, :img)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':name', 'Nieuw Project');
      $stmt->bindValue(':owner_id', $data['ownerid']);
      $stmt->bindValue(':shortdesc', $data['shortdesc']);
      $stmt->bindValue(':intro', $data['intro']);
      $stmt->bindValue(':description', $data['description']);
      $stmt->bindValue(':img', $img);
      if($stmt->execute()) {
        $insertedId = $this->pdo->lastInsertId();
        return $this->selectById($insertedId);
      }
    }
    return false;
  }

  public function getValidationErrors($data) {
    $errors = array();
    if(empty($data['ownerid'])) {
      $errors['ownerid'] = 'please enter the ownerid';
    }
    if(empty($data['description'])) {
      $errors['description'] = 'please enter the description';
    }
    if(empty($data['shortdesc'])) {
      $errors['shortdesc'] = 'please enter the usershortdesc';
    }
    if(empty($data['intro'])) {
      $errors['intro'] = 'please enter the intro';
    }
    return $errors;
  }
}
