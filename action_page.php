<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  
  $to = "votreadresseemail@exemple.com";
  $from = $_POST['email'];
  $firstname = $_POST['firstname'];
  $lastname = $_POST['lastname'];
  $country = $_POST['country'];
  $subject = "Nouveau message de " . $firstname . " " . $lastname . " (" . $country . ")";
  $message = $_POST['subject'];

  $headers = "From:" . $from;
  
  if(mail($to, $subject, $message, $headers)) {
    echo "<p>Votre message a bien été envoyé.</p>";
  } else {
    echo "<p>Une erreur est survenue, votre message n'a pas pu être envoyé.</p>";
  }

}
?>

