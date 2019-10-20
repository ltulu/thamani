<?php 
class Router{
	private $_ctrl;
	private $_view;
	public function routeReq(){
		try{
			$url = '';
			if(isset($_GET['url'])){
				$url = explode('/', filter_var($_GET['url'], FILTER_SANITIZE_URL));
				
				$controller = ucfirst(strtolower($url[0]));
				$controllerClass = 'apps/'.$controller;
				$controllerFile = 'apps/'.$controllerClass.'/controleur.php';
				
				if(file_exists($controllerFile)){
					require_once($controllerFile);
					$this->_ctrl = new $controllerClass($url);
				} else {
					throw new Exception('Page introuvable');
				}
			} else {
				require_once('apps/accueil/controleur.php');
				$this->_ctrl = new ControllerAccueil($url);
			}
		}
		catch(Exception $e){
			$errorMsg = $e->getMessage();
			require_once('apps/general/error.php');
		}
	}
}


?>