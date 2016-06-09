<?php

require_once WWW_ROOT . 'dao' . DS . 'DAO.php';

class ReviewDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT *
            FROM `sdam_reviews`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT *
            FROM `sdam_reviews` where `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }
  
  public function insert($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `sdam_reviews` (`room_id`, `user_id`, `review`, `sfeer`, `checkin`, `beauty`, `interior`, `accomo`, `value`)
              VALUES (:room_id, :user_id, :review, :sfeer, :checkin, :beauty, :interior, :accomo, :value)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':room_id', $data['roomId']);
      $stmt->bindValue(':user_id', $data['userId']);
      $stmt->bindValue(':review', $data['review']);
      $stmt->bindValue(':sfeer', $data['sfeer']);
      $stmt->bindValue(':checkin', $data['checkin']);
      $stmt->bindValue(':beauty', $data['beauty']);
      $stmt->bindValue(':interior', $data['interior']);
      $stmt->bindValue(':accomo', $data['accomo']);
      $stmt->bindValue(':value', $data['value']);
      if($stmt->execute()) {
        $insertedId = $this->pdo->lastInsertId();
        return $this->selectById($insertedId);
      }
    }
    return false;
  }

  public function getValidationErrors($data) {
    $errors = array();
    if(empty($data['userId'])) {
      $errors['user_id'] = 'please enter the user_id';
    }
    if(empty($data['review'])) {
      $errors['review'] = 'no review was given';
    }
    if(empty($data['sfeer'])) {
      $errors['sfeer'] = 'no sfeer was given';
    }
    return $errors;
  }

}
