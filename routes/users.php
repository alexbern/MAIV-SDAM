<?php

use PHPassLib\Hash\BCrypt;

$base = '/api/users';

$app->get($base, function($request, $response, $args){

  $userDAO = new UserDAO();

  $data = array();
  $data['users'] = $userDAO->selectAll();;

  $response->getBody()->write(json_encode($data));
  return $response->withHeader('Content-Type','application/json');

});

$app->post($base, function($request, $response, $args){

  $userDAO = new UserDAO();

  $user = $request->getParsedBody();

  if($user['password']){
    $user['password'] = BCrypt::hash($user['password']);
  }

  $insertedUser = $userDAO->insert($user);

  if(empty($insertedUser)) {
    $errors = array();
    $errors['errors'] = $userDAO->getValidationErrors($user);
    $response->getBody()->write(json_encode($errors));
    $response = $response->withStatus(400);
  } else {
    $response->getBody()->write(json_encode($insertedUser));
    $response = $response->withStatus(201);
  }

  return $response->withHeader('Content-Type','application/json');
});
