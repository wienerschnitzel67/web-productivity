<?php
// DB connection
require_once 'database.php';

// Handle form submission
if (isset($_POST['task'])) {
    $task = trim($_POST['task']);

    if (!empty($task)) {
        $sql = "INSERT INTO tasks (task) VALUES (:task)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
                'task' => $task
        ]);
    }
}

if (isset($_POST['complete_id'])) {
    $sql = "UPDATE tasks SET completed = NOT completed WHERE id = :id";
    $stmt = $pdo->prepare($sql);

    $stmt->execute([
            'id' => $_POST['complete_id']
    ]);
}

if (isset($_POST['delete_id'])) {
    $sql = "DELETE FROM tasks WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
            'id' => $_POST['delete_id']
    ]);
}

$sql = "SELECT * FROM tasks";
$stmt = $pdo->prepare($sql);
$stmt->execute();

$tasks = $stmt->fetchAll();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Web tool</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>

<body>
<h1>Dashboard</h1>

<main class="dashboard">

    <!-- To-Do -->
    <section class="widget todo">
        <h2>To-Do</h2>
        <form class="task-input" method="post">
            <input class="task-field" type="text" name="task" placeholder="Create a new task...">
            <button class="task-button" type="submit">+</button>
        </form>
        <?php
        foreach ($tasks as $task) { ?>
            <div class="task-item">
                <form method="post">
                    <button
                            class="task-button"
                            type="submit"
                            name="complete_id"
                            value="<?php echo $task['id']; ?>"
                    >
                        <?php
                        if ($task['completed'] == 1) {
                            echo '✓';
                        } else {
                            echo 'O';
                        } ?>
                    </button>
                </form>
                <span class="<?php
                if ($task['completed'] == 1) {
                    echo "completed-task";
                }
                ?>">
                            <?php echo $task['task']; ?>
                        </span>

                <form method="post">
                    <button
                            class="task-button"
                            type="submit"
                            name="delete_id"
                            value="<?php echo $task['id']; ?>"
                    >X
                    </button>
                </form>
            </div>
        <?php } ?>
    </section>

    <!-- (Pomodoro) Timer -->
    <section class="widget timer">
        <h2>Timer</h2>
        <div class="timer-circle" id="timer-circle">
            <div class="timer-display" id="timer-display">
                25:00
            </div>
        </div>

        <div class="timer-button">
            <button id="start-button">Start</button>
            <button id="pause-button">Pause</button>
            <button id="reset-button">Reset</button>
        </div>
    </section>

    <!-- Calendar -->
    <section class="widget calendar">
        <h2>Calendar</h2>

        <div class="calendar-container">

            <div class="calendar-header">
                <button id="prev-month">&lt;</button>
                <h3 id="calendar-month"></h3>
                <button id="next-month">&gt;</button>
            </div>

            <div class="calendar-weekdays">
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
            </div>

            <div class="calendar-days" id="calendar-days"></div>

        </div>
    </section>

    <section class="widget">
        <h2>Photo Album</h2>
    </section>

    <section class="widget">
        <h2>Music</h2>
    </section>

    <section class="widget">
        <h2>Weather</h2>
    </section>
</main>

<script src="assets/js/timer.js"></script>
<script src="assets/js/calendar.js"></script>
</body>
</html>
