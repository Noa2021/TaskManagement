import React from 'react';
import { TaskDetails, Response, Request } from '../entities/TaskManagmentEntities';
import TaskItem from './TaskItem';

interface IProps {
    tasks: TaskDetails[],
    onLoad: (tasks: TaskDetails[]) => void;
}

interface IState {
    isLoading: boolean,
}

class TaskList extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }

    loadTasks() {
        var request: Request.GetTasks = {}; 
        
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        };

        this.setState({ isLoading: true });
        fetch('api/TaskManagementApi/GetTasks', requestOptions).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert('There was an error!');
            }
        })
            .then((response: Response.GetTasks) => {
                this.props.onLoad(response.tasks);
                this.setState({ isLoading: false });
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                alert('There was an error!');
            });
    }

    getTasksListView() {
        if (this.state.isLoading) {
            return <div className="text-center">Loading...</div>
        }
        else {
            if (this.props.tasks && this.props.tasks.length > 0) {
                return this.props.tasks.map((task, index) => {
                    return <div className="pb-2" key={index}>
                        <TaskItem task={task}></TaskItem>
                    </div>
                })
            }
            else {
                return <div className="text-center">No tasks found</div>;
            }
        }
    }

    render() {
        var tasksList = this.getTasksListView()

        return (
            <div className="card">
                <div className="card-header h4">
                    Tasks list
                </div>
                <div className="card-body fh-card-body">
                    {tasksList}
                </div>

                <div className="card-footer">
                    <button type="button" className="btn btn-primary" onClick={this.loadTasks.bind(this)}>Load tasks</button>
                </div>
            </div>
        );
    }
}
export default TaskList