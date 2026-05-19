<?php
include 'cors.php';
include 'config.php';

$sql = "SELECT * FROM FAULT_EVENT ORDER BY detection_time DESC";
$result = $conn->query($sql);

$faults = [];
while($row = $result->fetch_assoc()) {
    $faults[] = $row;
}

echo json_encode($faults);
$conn->close();
?>