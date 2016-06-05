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

$app->post('/api/auth', function($request, $response, $args) use ($secret){

  $body = $request->getParsedBody();

  if (!empty($body)) {
   if (!empty($body['email']) && !empty($body['password'])) {
      $userDAO = new UserDAO();
      $user = $userDAO->selectByEmail($body['email']);
      if (!empty($user)) {
        $verified = BCrypt::verify($body['password'], $user['password']);

        if ($verified) {
          $builder = new Builder();
          $signer = new Sha256();

          unset($user['password']);

          $token = $builder
                      ->setIssuedAt(time())
                      ->setExpiration(time() + 3600)
                      ->setAudience($body['clientId'])
                      ->setSubject($user['id'])
                      ->set('user', $user)
                      ->sign($signer, $secret)
                      ->getToken();

                      $data = array('token' => (string) $token);

          $response->getBody()->write(json_encode($data));
          return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
        }
      }
   }

  }

  $data = array('error' => 'invalid email / password combination');
  $response->getBody()->write(json_encode($data));
  return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
});

require_once WWW_ROOT . 'routes' . DS . 'users.php';
require_once WWW_ROOT . 'routes' . DS . 'rooms.php';
require_once WWW_ROOT . 'routes' . DS . 'newsletters.php';
require_once WWW_ROOT . 'routes' . DS . 'projects.php';
require_once WWW_ROOT . 'routes' . DS . 'votes.php';

$app->get('/{anything:.*}', function ($request, $response, $args) {
  $view = new \Slim\Views\PhpRenderer('view/');
  return $view->render($response, 'home.php', ['basepath' => $request->getUri()->getBasePath()]);
});

$app->run();
