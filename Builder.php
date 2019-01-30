<?php

class Builder{
  public $files;
  public function __construct($path){
    $this->files = glob($path.'*');
  }

  public function list($pre, $end){
    foreach($this->files as $name)
      echo $pre.$name.$end;
  }
}

?>
