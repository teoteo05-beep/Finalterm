<?php
require 'db_connect.php';

function registerUser($username, $email, $password) {
    global $pdo;

    // 1. Xác thực/Validate dữ liệu đầu vào
    if (empty($username) || empty($email) || empty($password)) {
        return "Vui lòng điền đầy đủ thông tin.";
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return "Email không hợp lệ.";
    }

    // 2. Mã hóa mật khẩu
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    try {
        $sql = "INSERT INTO Users (username, password_hash, email) VALUES (?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$username, $password_hash, $email]);
        return "Đăng ký thành công!";
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) { // Lỗi trùng lặp (Unique constraint)
            return "Username hoặc Email đã tồn tại.";
        }
        return "Lỗi: " . $e->getMessage();
    }
}
?>