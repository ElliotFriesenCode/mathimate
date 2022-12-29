<?php
require 'init.php';
if(isset($_POST['curr'])){
    if(isset($_SESSION['id'])){
$curr_id = 0;
$getData = $db->prepare("
SELECT id, user_id, array, name
FROM animations
WHERE id= :id AND user_id = :user_id");
$curr_id = $_POST['curr'];
$getData->execute([
    'id' => $curr_id,
    'user_id' => $_SESSION['id']
]);


$datas = $getData->rowCount() ? $getData : [];

foreach($datas as $data){
echo $data['name'];


}
    }
    else{
        echo "";
    }
}

if(isset($_POST['new_animation'])){
    $postData = $db->prepare("
    INSERT INTO animations (name, array, user_id)
    VALUES (:name, :array, :user_id)
    ");
    $postData->execute([
        'name' => $_POST['new_animation'],
        'array' => "",
        'user_id' => $_SESSION['id']
    ]);
    

}
if(isset($_POST['name'])){
    $setName = $db->prepare("
    UPDATE animations
    SET name = :name
    WHERE id = :id");
    $setName->execute([
        'name' => $_POST['name'],
        'id' => $_POST['id']
    ]);
}
if(isset($_POST['sga'])){
    $graphs = $_POST['sga'];
    $duplicates = $_POST['sda'];
    $setArrays = $db->prepare("
    UPDATE animations
    SET array = :array, duplicateArray = :duplicateArray
    WHERE id = :id");
    $setArrays->execute([
        'array' => $graphs,
        'duplicateArray' => $duplicates,
        'id' => $_POST['id']
    ]);
}
if(isset($_POST['loaded'])){
    $animationArrays = $db->prepare("
    SELECT array, duplicateArray, id
    FROM animations
    WHERE id = :id");
    $animationArrays->execute([
        'id' => $_POST['curr_id']
    ]);
    $animations = $animationArrays->rowCount() ? $animationArrays : [];
    foreach($animations as $animation){
        echo $animation['array'];
        echo "  ";
        echo $animation['duplicateArray'];
    }
}