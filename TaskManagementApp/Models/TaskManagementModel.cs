using System.Collections.Generic;

namespace TaskManagementApp.Services
{
    public class TaskManagementModel
    {
        public class TaskDetails
        {
            public string TaskName { get; set; }
            public string TaskImage { get; set; }
        }

        public class Request
        {
            public class GetTasks
            {
            }

            public class AddTask
            {
                public TaskDetails NewTask { get; set; }
            }
        }

        public class Response
        {
            public class GetTasks
            {
                public List<TaskDetails> Tasks { get; set; }
            }

            public class AddTask
            {
            }
        }
    }
}
