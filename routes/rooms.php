<?php

$base = '/api/rooms';

$app->get($base, function($request, $response, $args){

  $query = $request->getQueryParams();

  if (!empty($query) && !empty($query['q'])) {
    $roomDAO = new RoomDAO();
    $data = array();
    $data['rooms'] = $roomDAO -> searchRooms($query['q']);
    if (sizeof($data['rooms']) < 3) {
      $currentArrayLength = sizeOf($data['rooms']);
      $otherSearches = $roomDAO->getExtraSearches(3-$currentArrayLength);
      $selectedSearches = array_merge($data['rooms'], $otherSearches);
      $data['rooms'] = $selectedSearches;
    }
  }else{
    $roomDAO = new RoomDAO();
    $data = array();
    $data['rooms'] = $roomDAO -> selectAll();
  }

  $response->getBody()->write(json_encode($data));
  return $response->withHeader('Content-Type','application/json');

});

$app->get($base . '/{id}', function($request, $response, $args){

  // $token = new Token();
  // $token->setFromRequest($request);
  //
  // if(!$token->verify()) {
  //   $response = $response->withStatus(401);
  //   return $response;
  // }
  //
  // if($token->getUser()->id) {
  //   $gardenDAO = new GardenDAO();
  //   $data = array();
  //   $data['gardens'] = $gardenDAO->selectAllByUserId($token->getUser()->id);
  // } else {
  //   $response = $response->withStatus(403);
  //   return $response;
  // }

  $roomDAO = new RoomDAO();
  $data = array();
  $data['room'] = $roomDAO -> selectById($args['id']);

  $response->getBody()->write(json_encode($data));
  return $response->withHeader('Content-Type','application/json');

});
