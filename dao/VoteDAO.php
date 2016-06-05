<?php

require_once WWW_ROOT . 'dao' . DS . 'DAO.php';

class VoteDAO extends DAO {
  public function selectAll() {
    $sql = "SELECT *
            FROM `sdam_votes`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT *
            FROM `sdam_votes` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectVotesFromProject($id) {
    $sql = "SELECT *
            FROM `sdam_votes` WHERE `project_id` = :project_id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':project_id', $id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function checkVote($userid, $projectid) {
    $sql = "SELECT *
            FROM `sdam_votes` WHERE `user_id` = :user_id AND `project_id` = :project_id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':user_id', $userid);
    $stmt->bindValue(':project_id', $projectid);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function insert($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `sdam_votes` (`user_id`, `project_id`)
              VALUES (:user_id, :project_id)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':user_id', $data['userid']);
      $stmt->bindValue(':project_id', $data['id']);
      if($stmt->execute()) {
        $insertedId = $this->pdo->lastInsertId();
        return $this->selectById($insertedId);
      }
    }
    return false;
  }

  public function deleteVotesFromUser($userid, $projectid){
    $sql = "DELETE FROM `sdam_votes` WHERE `user_id` = :user_id AND `project_id` = :project_id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':user_id', $userid);
    $stmt->bindValue(':project_id', $projectid);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function getValidationErrors($data) {
    $errors = array();
    if(empty($data['userid'])) {
      $errors['userid'] = 'please enter the user id';
    }
    if(empty($data['id'])) {
      $errors['id'] = 'please enter the project id';
    }
    return $errors;
  }
}
