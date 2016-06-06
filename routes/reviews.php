<?php

$base = '/api/reviews';

$app->get($base, function($request, $response, $args){

  $reviewDAO = new ReviewDAO();
  $data = array();
  $data['reviews'] = $reviewDAO -> selectAll();

  $response->getBody()->write(json_encode($data));
  return $response->withHeader('Content-Type','application/json');

});

$app->get($base . '/{id}', function($request, $response, $args){

  $reviewDAO = new ReviewDAO();
  $review = $reviewDAO -> selectById($args['id']);

  $response->getBody()->write(json_encode($review));
  return $response->withHeader('Content-Type','application/json');

});

$app->post($base, function($request, $response, $args){

  $reviewDAO = new ReviewDAO();
  $data = $request->getParsedBody();
  $insertedReview = $reviewDAO -> insert($data);

  if(empty($insertedReview)) {
    $errors = array();
    $errors['errors'] = $reviewDAO->getValidationErrors($data);
    $response->getBody()->write(json_encode($errors));
    $response = $response->withStatus(400);
  } else {
    $response->getBody()->write(json_encode($insertedReview));
    $response = $response->withStatus(201);
  }

  return $response->withHeader('Content-Type','application/json');

});
