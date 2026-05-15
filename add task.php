<?php
function createTask($user_id, $category_id, $title, $description, $deadline, $priority, $status) {
    global $pdo;

    // Xác thực danh mục (Priority level phải nằm trong Enum)
    $allowed_priorities = ['Low', 'Medium', 'High', 'Urgent'];
    if (!in_array($priority, $allowed_priorities)) {
        $priority = 'Medium'; // Mặc định nếu sai
    }

    try {
        $sql = "INSERT INTO Tasks (user_id, category_id, title, description, deadline, priority_level, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$user_id, $category_id, $title, $description, $deadline, $priority, $status]);
        
        // Sau khi thêm task, bạn có thể gọi logic cập nhật bảng Task_Statistics ở đây
        return true;
    } catch (PDOException $e) {
        return false;
    }
}
?>