import React from 'react';
import { TaskDetails } from '../entities/TaskManagmentEntities';
interface IProps {
    task: TaskDetails
}

interface IState {
}

class TaskItem extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <div className="card d-flex flex-row">
                <div className="card-body">
                    {this.props.task.taskName}
                </div>
                <img src={this.props.task.taskImage} height="120" width="120" />
            </div>
        );
    }
}
export default TaskItem