<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $address = $_POST['address'];
    $phone = $_POST['phone'];

    // Check if values are set
    if (isset($id, $name, $address, $phone) && !empty($id) && !empty($name) && !empty($address) && !empty($phone)) {

        // Prepare an update statement
        $sql = "UPDATE my_table SET name=?, address=?, phone=? WHERE id=?";
        if ($stmt = $conn->prepare($sql)) {
            // Bind variables to the prepared statement as parameters
            $stmt->bind_param("sssi", $name, $address, $phone, $id);

            // Attempt to execute the prepared statement
            if ($stmt->execute()) {
                echo "Record updated successfully";
            } else {
                echo "Error: " . $stmt->error;
            }

            // Close statement
            $stmt->close();
        } else {
            echo "Error preparing statement: " . $conn->error;
        }
    } else {
        echo "Invalid input";
    }

    // Close connection
    $conn->close();
} else {
    echo "Invalid request method";
}
?>