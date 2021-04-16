using Microsoft.AspNetCore.Mvc;
using TaskManagementApp.Services;
using static TaskManagementApp.Services.TaskManagementModel;

namespace TaskManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskManagementApiController : ControllerBase
    {
        public TaskManagementService _service;
        public TaskManagementApiController()
        {
            _service = TaskManagementService.Instance;
        }

        [HttpPost("GetTasks")]
        public Response.GetTasks GetTasks([FromBody] Request.GetTasks request)
        {
            var tasks = _service.GetTasks();
            var response = new Response.GetTasks { Tasks = tasks };
            return response;
        }

        [HttpPost("AddTask")]
        public Response.AddTask AddTask([FromBody] Request.AddTask request)
        {
            _service.AddTask(request.NewTask);
            var response = new Response.AddTask { };
            return response;
        }
    }
}
