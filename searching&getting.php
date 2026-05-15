<?php
// Tìm kiếm Task theo từ khóa
function searchTasks($user_id, $keyword) {
    global $pdo;
    $searchTerm = "%$keyword%";
    $sql = "SELECT * FROM Tasks WHERE user_id = ? AND (title LIKE ? OR description LIKE ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$user_id, $searchTerm, $searchTerm]);
    return $stmt->fetchAll();
}

// Lấy thống kê hoàn thành của người dùng
function getUserStats($user_id) {
    global $pdo;
    $sql = "SELECT * FROM Task_Statistics WHERE user_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$user_id]);
    return $stmt->fetch();
}
?>