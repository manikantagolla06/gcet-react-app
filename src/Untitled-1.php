html>
<head>
<title>REG RES</title>
</head>
<body>
<?php
$name=$_POST['uname'];
$pwd=$_POST['upwd'];
$dbc=mysqli_connect("localhost","root","","ks") or die("mysql_error()");
if(!$dbc)
echo"db is not connected <br>";
else{
echo" <h1>DATABASE is connected </h1><br>";
$query=mysqli_query($dbc,"SELECT * from login where userid='$name'");
$numrows=mysqli_num_rows($query);
if($numrows!=0)
{
    $row=mysqli_fetch_assoc($query);
$dbuser=$row['userid'];
$dbpwd=$row['password'];
if($name==$dbuser&&$pwd==$dbpwd)
{
echo "<h1>WELCOME $name !!! YOU ARE SUCCESFULLY LOGGED IN ...</h1>";
}
else
{
echo ("Incorrect Password");
}
}
else
{
echo ("USER doesn't exist");
}
}
?>
<p><a href="Login.php">Click here </a>to go back to main page </p>
</body>
</html>