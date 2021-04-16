import React from 'react';
import AddTask from './AddTask';
import TaskList from './TasksList';
import { TaskDetails } from '../entities/TaskManagmentEntities';

interface IProps {
}

interface IState {
    tasks: TaskDetails[]
}

class Home extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.addTaskToList = this.addTaskToList.bind(this);
        this.onloadTasksFromServer = this.onloadTasksFromServer.bind(this);

        this.state = {
            tasks: []
        }
    }

    addTaskToList(newTask: TaskDetails) {
        this.setState({
            tasks: [...this.state.tasks, newTask]
        })
    }

    onloadTasksFromServer(tasks: TaskDetails[]) {
        this.setState({
            tasks: tasks
        })
    }

    render() {
        return (
            <div className="container p-4">
                <div className="row">
                    <div className="col-md-6">
                        <AddTask onAddTask={this.addTaskToList} />
                    </div>
                    <div className="col-md-6">
                        <TaskList tasks={this.state.tasks} onLoad={this.onloadTasksFromServer}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;