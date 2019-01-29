<?php
class SpriteGenerator{
  private $path;
  private $images = [];
  public function __construct($path){
    $this->path = $path;
    foreach(glob($path.'*') as $file)
      if(getimagesize($file) && $file != $path.'sprite.png')
        $this->images[] = $file;
  }

  public function InfoGenerate(){
    $first = imagecreatefrompng($this->images[0]);
    $params = [];
    $w = $params['width'] = imagesx($first);
    $params['height'] = imagesy($first);
    $first = imagescale($first, $w*0.2);
    $params['newwidth'] = imagesx($first);
    $params['newheight'] = imagesy($first);
    $params['spritewidth'] = $params['newwidth']*count($this->images);
    $params['sprites'] = count($this->images);
    file_put_contents($this->path.'sprite_info.json', json_encode($params));
  }

  public function SpriteGenerate(){
    $params = json_decode(file_get_contents($this->path.'sprite_info.json'));
    $sprite = imagecreatetruecolor($params->spritewidth, $params->newheight);
    imagesavealpha($sprite, true);
    $transparent = imagecolorallocatealpha($sprite, 0, 0, 0, 127);
    imagefill($sprite, 0, 0, $transparent);
    foreach($this->images as $i => $image)
      if(getimagesize($image))
        imagecopyresampled($sprite, imagecreatefrompng($image), $i*$params->newwidth , 0, 0, 0, $params->newwidth, $params->newheight, $params->width, $params->height);
    imagepng($sprite, $this->path.'sprite.png');
  }

  public function GetSprite(){
    header('content-type: image/png');
    $sprite = imagecreatefrompng($this->path.'sprite.png');
    imagesavealpha($sprite, true);
    imagepng($sprite);
  }

  public function GetInfo(){
    header('content-type: application/json');
    echo file_get_contents($this->path.'sprite_info.json');
  }
}

$path = $_GET['path'];
$action = $_GET['action'];
$update = $action == 'update';
$info = $action == 'info';
$sprite = $action == 'sprite';

if(!empty($path)){
  $generator = new SpriteGenerator($path);
  if($update || !file_exists($path.'sprite_info.json'))
    $generator->InfoGenerate();
  if($update || !file_exists($path.'sprite.png'))
    $generator->SpriteGenerate();
  if($sprite)
    $generator->GetSprite();
  if($info)
    $generator->GetInfo();
}











?>
