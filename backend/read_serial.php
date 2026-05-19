<?php
include 'config.php';

// Configure your COM port here
$comPort = "COM3"; 
exec("mode $comPort: BAUD=9600 PARITY=N DATA=8 STOP=1");

$handle = fopen($comPort, "r");

if (!$handle) {
    die("Could not open Serial Port $comPort. Make sure Serial Monitor is closed.");
}

echo "Listening for Arduino data on $comPort...\n";

while (true) {
    $line = fgets($handle); // Reads a line from Arduino
    if ($line) {
        echo "Received: " . $line;
        
        // Expected CSV format from Arduino: voltage,current,temp,arc
        $val = explode(",", trim($line));
        
        if (count($val) == 4) {
            $v = $val[0];
            $c = $val[1];
            $t = $val[2];
            $a = $val[3];
            $sid = "SN-USB-01";

            $stmt = $conn->prepare("INSERT INTO SENSOR_DATA (sensor_id, voltage, current, temperature, arc_detected) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("sdddi", $sid, $v, $c, $t, $a);
            $stmt->execute();
            $stmt->close();
        }
    }
    usleep(100000); // 100ms delay to prevent high CPU usage
}

fclose($handle);
?>