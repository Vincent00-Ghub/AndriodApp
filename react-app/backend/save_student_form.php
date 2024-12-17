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

$student_no = $data["studno"];
$grade_level = $data["grade"];
$course = $data["course"];
$purpose = $data["purpose"];

$sql = "INSERT INTO students (student_no, grade_level, course, purpose) VALUES ('$student_no', '$grade_level', '$course', '$purpose')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Student record saved successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
}

$conn->close();
?>
