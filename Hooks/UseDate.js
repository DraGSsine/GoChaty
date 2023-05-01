export function UseDate(TheDate) {
  const timestamp =TheDate;
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  )
  const result =     date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
    return result
}
