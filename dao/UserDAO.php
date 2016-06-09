<?php

require_once WWW_ROOT . 'dao' . DS . 'DAO.php';

class UserDAO extends DAO {
  public function selectAll() {
    $sql = "SELECT *
            FROM `sdam_users`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT *
            FROM `sdam_users`
            WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function selectByEmail($email) {
    $sql = "SELECT *
            FROM `sdam_users`
            WHERE `email` = :email";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':email', $email);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function insert($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `sdam_users` (`email`, `password`, `name`, `image`, `phone`)
              VALUES (:email, :password, :name, :image, :phone)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':email', $data['email']);
      $stmt->bindValue(':password', $data['password']);
      $stmt->bindValue(':name', $data['name']);
      $stmt->bindValue(':image', NULL);
      $stmt->bindValue(':phone', $data['phone']);
      if($stmt->execute()) {
        $insertedId = $this->pdo->lastInsertId();
        return $this->selectById($insertedId);
      }
    }
    return false;
  }

  public function getValidationErrors($data) {
    $errors = array();
    if(empty($data['email'])) {
      $errors['email'] = 'please enter the email';
    }
    if(empty($data['password'])) {
      $errors['password'] = 'please enter the password';
    }
    if(empty($data['name'])) {
      $errors['name'] = 'please enter the username';
    }
    if(empty($data['phone'])) {
      $errors['phone'] = 'please enter the phonenumber';
    }
    return $errors;
  }
}
