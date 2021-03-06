<?php

$base = '/api/projects';

$app->post($base, function($request, $response, $args){

  $token = new Token();
  $token->setFromRequest($request);
  $data = $request->getParsedBody();
  $projectDAO = new ProjectDAO();

  //check if logged in
  if(!$token->verify()) {
    $response = $response->withStatus(401);
    return $response;
  }

  //check if logged in
  if(!$token->hasSameUserId($data['ownerid'])) {
    $response = $response->withStatus(401);
    return $response;
  }

  print_r('testje');

  $insertProject = $projectDAO->insertProject($data, $_FILES);

  if (empty($insertProject)) {
    $errors = array();
    $errors['errors'] = $projectDAO->getValidationErrors($insertProject);
    $response->getBody()->write(json_encode($errors));
    $response = $response->withStatus(400);
  }else{
    if (!file_exists(WWW_ROOT . 'uploads' . DS . $data['ownerid'] . DS)) {
      mkdir(WWW_ROOT . 'uploads' . DS . $data['ownerid'] . DS);
    }

    if (!file_exists(WWW_ROOT . 'uploads' . DS . $data['ownerid'] . DS . 'projects' . DS)) {
      mkdir(WWW_ROOT . 'uploads' . DS . $data['ownerid'] . DS . 'projects' . DS);
    }

    if (!file_exists(WWW_ROOT . 'uploads' . DS . $data['ownerid'] . DS . 'projects' . DS . $insertProject['0']['id'] . DS)) {
      mkdir(WWW_ROOT . 'uploads' . DS . $data['ownerid'] . DS . 'projects' . DS . $insertProject['0']['id'] . DS);
    }

    $uploadErrors = [];

    foreach ($_FILES as $key => $image) {

      if (!file_exists(WWW_ROOT . 'uploads' . DS . $data['ownerid'] . DS . 'projects' . DS . $insertProject['0']['id'] . DS . $key . DS)) {
        mkdir(WWW_ROOT . 'uploads' . DS . $data['ownerid'] . DS . 'projects' . DS . $insertProject['0']['id'] . DS . $key . DS);
      }

      $uploadDir = WWW_ROOT . 'uploads' . DS . $data['ownerid'] . DS . 'projects' . DS . $insertProject['0']['id'] . DS . $key . DS;

      $uploadImgFile = $uploadDir . basename($image['name']);

      if (move_uploaded_file($image['tmp_name'], $uploadImgFile)) {

      }else{
        $uploadErrors = [$key => 'not uploaded'];
      }
    }

    if (empty($uploaderrors)) {
      $response->getBody()->write(json_encode($insertProject));
      $response = $response->withStatus(201);
    }else{
      $response = $response->withStatus(501);
    }

  }

  return $response->withHeader('Content-Type','application/json');

});

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
