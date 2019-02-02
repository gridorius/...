<?php
class SpriteGenerator{
  private $frames = [];
  public function __construct($path){
    foreach(glob($path.'*') as $file)
      if(getimagesize($file) && $file != $path.'sprite.png')
        $this->frames[] = $file;
  }

  public function Generate($path){
    $first = imagecreatefrompng($this->frames[0]);
    $p = [];
    $p['width'] = imagesx($first);
    $p['height'] = imagesy($first);
    $first = imagescale($first, 0.2*$p[width]);
    $p['newwidth'] = imagesx($first);
    $p['newheight'] = imagesy($first);
    $p['sprites'] = count($this->frames);
    $p['spritewidth'] = $p['newwidth']*$p['sprites'];
    file_put_contents($path.'sprite_info.json', json_encode($p));

    $sprite = imagecreatetruecolor($p['spritewidth'], $p['newheight']);
    imagesavealpha($sprite, true);
    $transparent = imagecolorallocatealpha($sprite, 0, 0, 0, 127);
    imagefill($sprite, 0, 0, $transparent);
    foreach($this->frames as $i => $image)
      imagecopyresampled($sprite, imagecreatefrompng($image), $i*$p['newwidth'], 0, 0, 0, $p['newwidth'], $p['newheight'], $p['width'], $p['height']);
    imagepng($sprite, $path.'sprite.png');
  }

  public function GetInfo($path){
    header('content-type: application/json');
    echo file_get_contents($path.'sprite_info.json');
  }

  public function GetSprite($path){
    header('content-type: image/png');
    $sprite = imagecreatefrompng($path.'sprite.png');
    imagesavealpha($sprite, true);
    imagepng($sprite);
  }
}

$path = $_GET['path'];
$a = $_GET['action'];
$update = $a == 1;
$info = $a == 2;
$sprite = $a == 3;

if(!empty($path)){
  $generator = new SpriteGenerator($path);
  if($update || !file_exists($path.'sprite_info.json') || !file_exists($path.'sprite.png'))
    $generator->Generate($path);
  if($sprite)
    $generator->GetSprite($path);
  if($info)
    $generator->GetInfo($path);
}











?>
