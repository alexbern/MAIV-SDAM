<?php
session_start();
define('DS', DIRECTORY_SEPARATOR);
define('WWW_ROOT', __DIR__ . DS);

ini_set('display_errors', true);
error_reporting(E_ALL);

require WWW_ROOT . 'vendor'. DS . 'autoload.php';

use Slim\App;

$app = new \Slim\App(['settings' => [
  'displayErrorDetails' => true
  ]
]);

$secret = 'asFKslsqwpoqwf23';

$app->get('/{anything:.*}', function ($request, $response, $args) {
  $view = new \Slim\Views\PhpRenderer('view/');
  return $view->render($response, 'home.php', ['basepath' => $request->getUri()->getBasePath()]);
});

$app->run();
