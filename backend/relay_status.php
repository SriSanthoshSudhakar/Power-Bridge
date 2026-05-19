<?php
include 'cors.php';
include 'config.php';

$sql = "SELECT * FROM RELAY_STATUS";
$result = $conn->query($sql);

$relays = [];
while($row = $result->fetch_assoc()) {
    $relays[] = $row;
}

echo json_encode($relays);
$conn->close();
?>