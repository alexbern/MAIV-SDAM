<?php
class DAO {
  private static $dbHost = "localhost";
  private static $dbName = "sdam";
  private static $dbUser = "sdamuser";
  private static $dbPass = "sdampass";
	private static $sharedPDO;

	protected $pdo;

	function __construct() {
		if(empty(self::$sharedPDO)) {
			self::$sharedPDO = new PDO("mysql:host=" . self::$dbHost . ";dbname=" . self::$dbName, self::$dbUser, self::$dbPass);
			self::$sharedPDO->exec("SET CHARACTER SET utf8");
			self::$sharedPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			self::$sharedPDO->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
		}
		$this->pdo =& self::$sharedPDO;
	}

  protected function parsePagingParams($params = array()) {
    if(isset($params['per_page'])) {
      $params['perPage'] = $params['per_page'];
      unset($params['per_page']);
    }
    if(isset($params['page']) || isset($params['perPage'])) {
      $page = 0;
      $perPage = 10;
      if(isset($params['page']) && is_numeric($params['page'])) {
        $page = $params['page'];
      }
      if(isset($params['perPage']) && is_numeric($params['perPage'])) {
        $perPage = $params['perPage'];
      }
      return [
        'page' => $page,
        'perPage' => $perPage,
        'offset' => ($page - 1) * $perPage
      ];
    }
    return false;
  }

  protected function addPaginationMetaData(&$result, &$params) {
    if($params !== false) {
      $result['page'] = $params['page'];
      $result['perPage'] = $params['perPage'];
      $result['offset'] = $params['offset'];
      $result['numPages'] = ceil($result['numRows'] / $result['perPage']);
    }
  }
}
