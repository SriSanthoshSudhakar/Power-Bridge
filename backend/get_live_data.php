<?php
include 'cors.php';
include 'config.php';

$sql = "SELECT * FROM SENSOR_DATA ORDER BY timestamp DESC LIMIT 50";
$result = $conn->query($sql);

$data = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);
$conn->close();
?>