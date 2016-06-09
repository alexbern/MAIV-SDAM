<?php
session_start();
define('DS', DIRECTORY_SEPARATOR);
define('WWW_ROOT', __DIR__ . DS);

ini_set('display_errors', true);
error_reporting(E_ALL);

require WWW_ROOT . 'vendor'. DS . 'autoload.php';
require WWW_ROOT . 'dao'. DS . 'RoomDAO.php';
require WWW_ROOT . 'dao'. DS . 'UserDAO.php';
require WWW_ROOT . 'dao'. DS . 'NewsletterDAO.php';
require WWW_ROOT . 'dao'. DS . 'ProjectDAO.php';
require WWW_ROOT . 'dao'. DS . 'VoteDAO.php';
require WWW_ROOT . 'dao'. DS . 'ReviewDAO.php';

use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\Signer\Hmac\Sha256;

use Slim\App;

use PHPassLib\Hash\BCrypt;

$secret = 'asFKslsqwpoqwf23';

$app = new \Slim\App(['settings' => [
  'displayErrorDetails' => true
  ]
]);

require_once WWW_ROOT . 'routes' . DS . 'auth.php';
require_once WWW_ROOT . 'routes' . DS . 'users.php';
require_once WWW_ROOT . 'routes' . DS . 'rooms.php';
require_once WWW_ROOT . 'routes' . DS . 'newsletters.php';
require_once WWW_ROOT . 'routes' . DS . 'projects.php';
require_once WWW_ROOT . 'routes' . DS . 'votes.php';
require_once WWW_ROOT . 'routes' . DS . 'reviews.php';

$app->get('/{anything:.*}', function ($request, $response, $args) {
  $view = new \Slim\Views\PhpRenderer('view/');
  return $view->render($response, 'home.php', ['basepath' => $request->getUri()->getBasePath()]);
});

$app->run();
