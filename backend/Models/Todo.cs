using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Todo
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsInProgress { get; set; }
        public string Importance { get; set; }
        public DateTime DueDate { get; set; }
        public string EstimatedTime { get; set; }
        public string Category { get; set; }
        public Guid UserId { get; set; }

                // Navigation property
            }
        }
        
  
