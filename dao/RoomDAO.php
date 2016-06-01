<?php

require_once WWW_ROOT . 'dao' . DS . 'DAO.php';

class RoomDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT *
            FROM `rooms`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT *
            FROM `rooms` where `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

}
