<?php
// Vérification si le formulaire a été soumis
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Récupération des données du formulaire
  $firstname = $_POST['firstname'];
  $lastname = $_POST['lastname'];
  $email = $_POST['email'];
  $country = $_POST['country'];
  $subject = $_POST['subject'];

  // Traitement des données du formulaire
  // TODO: ajouter votre code de traitement ici

  // Redirection vers une page de confirmation
  header('Location: confirmation.php');
  exit;
}
?>
