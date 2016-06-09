<?php

$base = '/api/projects';

$app->get($base, function($request, $response, $args){

  $query = $request->getQueryParams();

  if (!empty($query) && !empty($query['q'])) {
    $projectDAO = new ProjectDAO();
    $data = array();
    $data['projects'] = $projectDAO -> searchProjects($query['q']);
  }else{
    $projectDAO = new ProjectDAO();
    $data = array();
    $data['projects'] = $projectDAO -> selectAll();
  }

  $response->getBody()->write(json_encode($data));
  return $response->withHeader('Content-Type','application/json');

});

$app->get($base . '/all', function($request, $response, $args){

  $query = $request->getQueryParams();

  if (!empty($query) && !empty($query['q'])) {
    $projectDAO = new ProjectDAO();
    $data = array();
    $data['projects'] = $projectDAO -> searchAllProjects($query['q']);
  }else{
    $projectDAO = new ProjectDAO();
    $data = array();
    $data['projects'] = $projectDAO -> selectAll();
    if (sizeof($data['projects']) < 20) {
      $currentArrayLength = sizeOf($data['projects']);
      $otherSearches = $projectDAO->getExtraSearches(20-$currentArrayLength);
      $selectedSearches = array_merge($data['projects'], $otherSearches);
      $data['projects'] = $selectedSearches;
    }
  }

  $response->getBody()->write(json_encode($data));
  return $response->withHeader('Content-Type','application/json');

});


$app->get($base . '/{id}', function($request, $response, $args){

  $projectDAO = new ProjectDAO();
  $project = $projectDAO -> selectById($args['id']);

  $response->getBody()->write(json_encode($project));
  return $response->withHeader('Content-Type','application/json');

});
