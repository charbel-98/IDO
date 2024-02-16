namespace TodoApi.DTOs
{
    public class AddTodoDto
    {
        public string Title { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsInProgress { get; set; }
        public string Importance { get; set; }
        public DateTime DueDate { get; set; }
        public string EstimatedTime { get; set; }
        public string Category {get; set;}
    }
}
//create a json record with random values to be filled in the database
// {
//     "title": "Do the dishes",
//     "isCompleted": false,
//     "isInProgress": true,
//     "importance": "High",
//     "dueDate": "2022-12-31T00:00:00",
//     "estimatedTime": "1 hour"
// }