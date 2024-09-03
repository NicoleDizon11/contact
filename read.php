<?php
include 'db.php';

$sql = "SELECT id, name, address, phone FROM my_table";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $row['name'] . "</td>";
        echo "<td>" . $row['address'] . "</td>";
        echo "<td>" . $row['phone'] . "</td>";
        echo "<td><button onclick='editRecord(" . $row['id'] . ")'>Edit</button>
              <button onclick='deleteRecord(" . $row['id'] . ")'>Delete</button></td>";
        echo "</tr>";
    }
} else {
    echo "<tr><td colspan='4'>No records found</td></tr>";
}

$conn->close();
?>
