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
$work_hours = $data["workHours"];
$college_dept = $data["collegeDept"];
$purpose = $data["purpose"];

$sql = "INSERT INTO faculty (name, work_hours, college_dept, purpose) VALUES ('$name', '$work_hours', '$college_dept', '$purpose')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Faculty record saved successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
}

$conn->close();
?>
