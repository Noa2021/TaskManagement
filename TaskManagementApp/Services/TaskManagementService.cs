using System.Collections.Generic;
using static TaskManagementApp.Services.TaskManagementModel;

namespace TaskManagementApp.Services
{
    public sealed class TaskManagementService
    {
        static TaskManagementService _instance;

        public static TaskManagementService Instance
        {
            get { return _instance ??= new TaskManagementService(); }
        }

        private static List<TaskDetails> Tasks { get; } = new List<TaskDetails>();

        public List<TaskDetails> GetTasks()
        {
            return Tasks;
        }

        public void AddTask(TaskDetails task)
        {
            Tasks.Add(task);
        }
    }
}
