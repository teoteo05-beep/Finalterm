<?php
function getTasksByUser($user_id) {
    global $pdo;
    $sql = "SELECT t.*, c.category_name 
            FROM Tasks t 
            LEFT JOIN Categories c ON t.category_id = c.category_id 
            WHERE t.user_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$user_id]);
    return $stmt->fetchAll();
}
?>