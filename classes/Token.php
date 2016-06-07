<?php

use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\ValidationData;
use Lcobucci\JWT\Signer\Hmac\Sha256;

class Token {

  private $token;
  private $secret = 'asFKslsqwpoqwf23';

  public function setFromRequest($request){
    $s = $request->getHeader('x-auth-token');

    if(empty($s)){
      $this->token = false;
    }else{
      $this->token = (new Parser())->parse((string) $s[0]);
    }
  }

  public function verify(){
    if(!$this->token){
      return false;
    }

    //Dit zorgt ervoor dat token van andere site niet kan gebruikt worden zonder dat de server het weet
    $signer = new Sha256();
    if(!$this->token->verify($signer, $this->secret)){
      return false;
    }

    $data = new ValidationData();
    if(!$this->token->validate($data)){
      return false;
    }

    return true;
  }

  public function isAdmin(){
    $role = intval($this->token->getClaim('user')->role);
    return $role;
  }

  public function hasSameUserId($userId){
    $id = intval($this->token->getClaim('user')->id);
    return $id == intVal($userId);
  }

  public function getUser(){
    return $this->token->getClaim('user');
  }

  public function create($expiration, $clientId, $user, $issuer) {

    $signer = new Sha256();
    $builder = new Builder();

    $this->token = $builder
      ->setIssuedAt(time())
      ->setExpiration(time() + $expiration)
      ->setAudience($clientId)
      ->setSubject($user['id'])
      ->setIssuer($issuer)
      ->set('user', $user)
      ->sign($signer, $this->secret)
      ->getToken();

    return (string) $this->token;

  }

}
