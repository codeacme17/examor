def handle_ebbinghaus_memory(score: int):
    if (0 <= score <= 3):
        days = 1
    if (4 <= score <= 6):
        days = 3
    if (7 <= score <= 9):
        days = 7
    if (10 == score):
        days = 14

    return days
