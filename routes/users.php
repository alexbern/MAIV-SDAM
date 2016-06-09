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
    $data = array('error' => 'Email al in gebruik');

    $response->getBody()->write(json_encode($data));
    return $response->withHeader('Content-Type','application/json')->withStatus(400);
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
        $response->getBody()->write(json_encode($insertedUser));
        $response = $response->withStatus(201);
      }
  }

  return $response->withHeader('Content-Type','application/json');
});
