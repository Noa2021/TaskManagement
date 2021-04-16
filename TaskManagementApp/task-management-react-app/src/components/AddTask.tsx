import { read } from 'fs';
import  React, { useRef } from 'react';
import { TaskDetails, Request, Response } from '../entities/TaskManagmentEntities';
interface IProps {
    onAddTask: (task: TaskDetails) => void;
}

interface IState {
    taskName: string,
    taskImage: string,
    imageName: string
}

class AddTask extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            taskImage: "",
            taskName: "test",
            imageName: ""
        }

        this.handleTaskImageChange = this.handleTaskImageChange.bind(this);
        this.handleTaskNameChange = this.handleTaskNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTaskNameChange(event: any) {
        this.setState({
            taskName: event.target.value,
            taskImage: this.state.taskImage
        });
    }

    handleTaskImageChange(event: any) {
        event.preventDefault();
        let file = event.target.files[0];

        if (!file) return;
        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                taskName: this.state.taskName,
                taskImage: reader.result as string,
                imageName: event.target.value
            });
        }

        reader.readAsDataURL(file)
    }

    handleSubmit(event: { preventDefault: () => void; }) {
        this.addTask();
        event.preventDefault();
    }

    clearForm() {
        this.setState({
            taskName: "",
            taskImage: "",
            imageName: ""
        });
    }

    addTask() {
        var request: Request.AddTask = {
            NewTask: {
                taskImage: this.state.taskImage,
                taskName: this.state.taskName
            }
        };

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        };

        fetch('api/TaskManagementApi/AddTask', requestOptions).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert('There was an error!');
            }
        })
            .then((response: Response.AddTask) => {
                this.props.onAddTask(request.NewTask);
                this.clearForm();
            })
            .catch((error) => {
                alert('There was an error!');
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="card">
                    <div className="card-header h4">
                        Create new task
                    </div>
                    <div className="card-body fh-card-body">
                        <div className="form-group">
                            <label className="font-weight-bold">Task name</label>
                            <input value={this.state.taskName} type="text" className="form-control" onChange={this.handleTaskNameChange} required />
                        </div>

                        <input
                            type="file"
                            name="file"
                            id="file-upload"
                            onChange={this.handleTaskImageChange}
                            accept="image/*"
                            className="d-none"/>
                        
                        <label htmlFor="file-upload" className="underline clickable">
                                Upload Image
                             </label>
                        <div className="pt-2">
                        <label>{this.state.imageName}</label>
                        </div>
                        <img src={this.state.taskImage} className="pt-3" width="100%" />
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Add task</button>
                    </div>
                </div>
            </form>
        );
    }
}
export default AddTask