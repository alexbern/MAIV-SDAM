<?php

use PHPassLib\Hash\BCrypt;

$base = '/api/users';

$app->get($base, function($request, $response, $args){

  $token = new Token();
  $token->setFromRequest($request);

  //check if logged in
  if(!$token->verify()) {
    $response = $response->withStatus(401);
    return $response;
  }

  if ($token->isAdmin() === 0) {
    $response = $response->withStatus(401);
    return $response;
  }else{
    $userDAO = new UserDAO();
    $data = array();
    $data['users'] = $userDAO->selectAll();
  }

  $response->getBody()->write(json_encode($data));
  return $response->withHeader('Content-Type','application/json');

});

$app->get($base . '/{id}', function($request, $response, $args){

  $token = new Token();
  $token->setFromRequest($request);

  if ($args['id']) {

  }else{
    $response = $response->withStatus(404);
    return $response;
  }

  //check if logged in
  if(!$token->verify()) {
    $response = $response->withStatus(401);
    return $response;
  }

  if ($token->isAdmin() === 0) {
    $response = $response->withStatus(401);
    return $response;
  }else{
    $userDAO = new UserDAO();
    $user = $userDAO->selectById($args['id']);
  }

  $response->getBody()->write(json_encode($user));
  return $response->withHeader('Content-Type','application/json');

});

$app->post($base, function($request, $response, $args){

  $userDAO = new UserDAO();

  $user = $request->getParsedBody();

  $existing = $userDAO->selectByEmail($user['email']);
  if (!empty($existing)) {
    $response = $response->withStatus(400);
    exit();
    die();
  }else{

    if($user['password']){
      $user['password'] = BCrypt::hash($user['password']);
    }
      $insertedUser = $userDAO->insert($user);
      if(empty($insertedUser)) {
        $errors = array();
        $errors['errors'] = $userDAO->getValidationErrors($user);
        $response->getBody()->write(json_encode($errors));
        $response = $response->withStatus(400);
      }else{
        // print_r($user);
        // if (!file_exists(WWW_ROOT . 'uploads' . DS . $insertedUser['id'] . DS)) {
        //   mkdir(WWW_ROOT . 'uploads' . DS . $insertedUser['id'] . DS);
        // }
        //
        // $uploadDir = WWW_ROOT . 'uploads' . DS . $insertedUser['id'] . DS;
        //
        // $uploadImgFile = $uploadDir . basename($user['image']['name']);
        //
        // if (move_uploaded_file($user['image']['tmp_name'], $uploadImgFile)) {
          $response->getBody()->write(json_encode($insertedUser));
          $response = $response->withStatus(201);
        // }else{
        //   $response = $response->withStatus(501);
        // }
      }
  }

  return $response->withHeader('Content-Type','application/json');
});
