<?php
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "library_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

$input = file_get_contents("php://input");
$data = json_decode($input, true);

$name = $data["name"];
$purpose = $data["purpose"];

$sql = "INSERT INTO visitors (name, purpose) VALUES ('$name', '$purpose')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Visitor record saved successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
}

$conn->close();
?>
