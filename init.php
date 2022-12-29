<?php
$db = new PDO('mysql:dbname=id19485827_mathimate_db;host=localhost', 'id19485827_mathimate_user', '*)^P(K%RB*qys3k^');
session_start();
if(!isset($_SESSION['username'])){
    $_SESSION['username'] = "Account";
} 
if(isset($_POST['s_username'])){
    $username = $_POST['s_username'];
    $email = $_POST['s_email'];
    $password = $_POST['s_password'];
    echo $username . $email . $password;
    $userQuery = $db->prepare("
    INSERT INTO users (username, email, password)
    VALUES (:username, :email, :password)");
    $userQuery->execute([
        'username' => $username,
        'email' => $email,
        'password' => $password
    ]);
    $idQuery = $db->prepare("
    SELECT user_id, username, password, email
    FROM users");
    $idQuery->execute();
    $ids = $idQuery->rowCount() ? $idQuery : [];
    setID($ids, $username, $password, "");
}
if(isset($_POST['username-email'])){
    $username = $_POST['username-email'];
    $letterArray = str_split($username);
    $password = $_POST['l_password'];
    $isEmail = false;
    for($i = 0; $i < count($letterArray); $i++){
           if($letterArray[$i] == '@'){
            $isEmail = true;
           }
    }
    
    $idsQuery = $db->prepare("
    SELECT user_id, username, email, password
    FROM users");
    $idsQuery->execute();
    $userArray = $idsQuery->rowCount() ? $idsQuery : [];
    
    if($isEmail){
        $email = $username;
    setID($userArray, $username, $password, $email);
    }
    else{
        setID($userArray, $username, $password, "");
    }


}
if(isset($_POST['new_username'])){
    $new_username = $_POST['new_username'];
    $new_email = $_POST['new_email'];
    $new_password = $_POST['new_password'];
   
    $updateQuery = $db->prepare("
    UPDATE users
    SET username = :username, email = :email, password = :password
    WHERE user_id = :id");
    $updateQuery->execute([
        'username' => $new_username,
        'email' => $new_email,
        'password' => $new_password,
        'id' => $_SESSION['id']
    ]);
    $_SESSION['username'] = $new_username;
    $_SESSION['password'] = $new_password;
    $_SESSION['email'] = $new_email;
    header('Location: account.php?changed=true');
    
}
function setID($array, $username, $password, $email){
    if(strlen($email) == 0){
        $i = 0;
    foreach($array as $user){
        $i+= 1;
        if($user['username'] == $username && $user['password'] == $password){
            $_SESSION['id'] = $user['user_id'];
            echo  $_SESSION['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['password'] = $user['password'];
            $_SESSION['email'] = $user['email'];
            echo  $_SESSION['email'];
            echo("<script>location.href = 'dashboard.php';</script>");
        }
       // else if($i == count(array($array)) && $user['username'] != $username && $user['password'] != $password){
          // echo("<script>location.href = 'account.php?]';</script>");
       // }
    }
     echo("<script>location.href = 'account.php?]';</script>");
}
    else{
        $i = 0;
        foreach($array as $user){
            $i+= 1;
            if($user['email'] == $email && $user['password'] == $password){
                $_SESSION['id'] = $user['user_id'];
                echo  $_SESSION['id'];
                
                $_SESSION['username'] = $user['username'];
                $_SESSION['password'] = $user['password'];
                $_SESSION['email'] = $user['email'];
                 echo("<script>location.href = 'dashboard.php';</script>");
            }
           
               
            
        } 
          echo("<script>location.href = 'account.php?]';</script>");
          
    }

   
}

if(isset($_GET['logout'])){
    unset($_SESSION['id']);
    unset($_SESSION['username']);
    unset($_SESSION['email']);
    unset($_SESSION['password']);
    header('Location: account.php');
}
?>