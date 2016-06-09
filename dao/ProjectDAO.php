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

  public function insertProject($data, $images){
    $errors = $this->getValidationErrors($data);
    print_r($images);
    if(empty($errors)) {
      $sql = "INSERT INTO `sdam_projects` (`name`, `owner_id`, `shortdesc`, `intro`, `description`, `img1`, `img2`, `img3`, `img4`, `img5`)
              VALUES (:name, :owner_id, :shortdesc, :intro, :description, :imgone, :imgtwo, :imgthree, :imgfour, :imgfive)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':name', $data['title']);
      $stmt->bindValue(':owner_id', $data['ownerid']);
      $stmt->bindValue(':shortdesc', $data['shortdesc']);
      $stmt->bindValue(':intro', $data['intro']);
      $stmt->bindValue(':description', $data['description']);

      $stmt->bindValue(':imgone', $images['imageone']['name']);
      $stmt->bindValue(':imgtwo', $images['imagetwo']['name']);
      $stmt->bindValue(':imgthree', $images['imagethree']['name']);
      $stmt->bindValue(':imgfour', $images['imagefour']['name']);
      $stmt->bindValue(':imgfive', $images['imagefive']['name']);

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
