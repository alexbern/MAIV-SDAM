<?php

$base = '/api/votes';

$app->get($base, function($request, $response, $args){

  $query = $request->getQueryParams();

  if (!empty($query) || !empty($query['project'])) {
    if (!empty($query['project'])) {
      $voteDAO = new VoteDAO();
      $data = array();
      $data['votes'] = $voteDAO -> selectVotesFromProject($query['project']);
    }
    if (!empty($query['project']) && !empty($query['user'])) {
      $voteDAO = new VoteDAO();
      $data = array();
      $data['votes'] = $voteDAO -> checkVote($query['user'], $query['project']);
    }
  }else{
    $voteDAO = new VoteDAO();
    $data = array();
    $data['votes'] = $voteDAO -> selectAll();
  }

  $response->getBody()->write(json_encode($data));
  return $response->withHeader('Content-Type','application/json');

});

$app->get($base . '/{id}', function($request, $response, $args){

  $voteDAO = new VoteDAO();
  $data = array();
  $data['vote'] = $voteDAO -> selectById($args['id']);

  $response->getBody()->write(json_encode($data));
  return $response->withHeader('Content-Type','application/json');

});

$app->delete($base, function($request, $response, $args){
  $token = new Token();
  $token->setFromRequest($request);

  //check if logged in
  if(!$token->verify()) {
    $response = $response->withStatus(401);
    return $response;
  }

  $query = $request->getQueryParams();

  if (!empty($query) && !empty($query['user']) && !empty($query['project'])) {
    $voteDAO = new VoteDAO();
    $usercheck = $token->hasSameUserId($query['user']);
    if ($usercheck && $query['project']) {
      $voteDAO -> deleteVotesFromUser($query['user'], $query['project']);
    }else{
      $response = $response->withStatus(401);
      return $response;
    }
  }else{
    $response = $response->withStatus(403);
    return $response;
  }

  return $response->write(true)->withHeader('Content-Type','application/json');

});

$app->post($base, function($request, $response, $args){

  $token = new Token();
  $token->setFromRequest($request);

  if(!$token->verify()) {
    $response = $response->withStatus(401);
    return $response;
  }

  $voteDAO = new VoteDAO();
  $vote = $request->getParsedBody();
  $maypost = $token->hasSameUserId($vote['userid']);

  if ($maypost) {
    $insertedVote = $voteDAO->insert($vote);
    if(empty($insertedVote)) {
      $errors = array();
      $errors['errors'] = $voteDAO->getValidationErrors($vote);
      $response->getBody()->write(json_encode($errors));
      $response = $response->withStatus(400);
    }else{
      $response->getBody()->write(json_encode($insertedVote));
      $response = $response->withStatus(201);
    }
  }else{
    $response = $response->withStatus(403);
    return $response;
  }

  return $response->withHeader('Content-Type','application/json');
});
