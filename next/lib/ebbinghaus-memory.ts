export const handleEbbinghausMemory = (score: number) => {
  let days = 0

  if (0 <= score && score <= 3) days = 1
  else if (4 <= score && score <= 6) days = 3
  else if (7 <= score && score <= 9) days = 7
  else if (10 == score) days = 14

  return days
}
