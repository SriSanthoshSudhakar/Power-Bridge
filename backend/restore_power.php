<?php
include 'cors.php';
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fault_id = $_POST['fault_id'];
    $backup_line = $_POST['backup_line'];
    $switch_time = $_POST['switching_time_ms'];

    $stmt = $conn->prepare("INSERT INTO POWER_RESTORATION (fault_id, backup_line_used, switching_time_ms) VALUES (?, ?, ?)");
    $stmt->bind_param("isi", $fault_id, $backup_line, $switch_time);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error"]);
    }
}
?>