<?php

use PHPassLib\Hash\BCrypt;

$base = '/api/newsletters';

$app->get($base, function($request, $response, $args){

  $newsletterDAO = new NewsletterDAO();

  $data = array();
  $data['newsletters'] = $newsletterDAO->selectAll();;

  $response->getBody()->write(json_encode($data));
  return $response->withHeader('Content-Type','application/json');

});

$app->post($base, function($request, $response, $args){

  $newsletterDAO = new NewsletterDAO();

  $email = $request->getParsedBody();

  $insertedEmail = $newsletterDAO->insert($email);

  if(empty($insertedEmail)) {
    $errors = array();
    $errors['errors'] = $newsletterDAO->getValidationErrors($email);
    $response->getBody()->write(json_encode($errors));
    $response = $response->withStatus(400);
  } else {
    $response->getBody()->write(json_encode($insertedEmail));
    $response = $response->withStatus(201);
  }

  return $response->withHeader('Content-Type','application/json');
});
