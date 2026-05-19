<?php
include 'cors.php';
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $sensor_id = $_POST['sensor_id'] ?? 'SN-001';
    $voltage = $_POST['voltage'] ?? 0;
    $current = $_POST['current'] ?? 0;
    $temperature = $_POST['temperature'] ?? 0;
    $arc = $_POST['arc_detected'] ?? 0;

    $stmt = $conn->prepare("INSERT INTO SENSOR_DATA (sensor_id, voltage, current, temperature, arc_detected) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sdddi", $sensor_id, $voltage, $current, $temperature, $arc);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Data Inserted"]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }
    $stmt->close();
}
$conn->close();
?>