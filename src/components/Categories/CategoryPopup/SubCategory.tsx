import React from "react";
import { Button } from "react-bootstrap";

interface SubCatProps {
  id: number;
  name: string;
  childrens: string[];
  deleteFunc: (id: number) => void;
  addChildFn: (id: number, child: string) => void;
  deleteChildFn: (id: number, childId: number) => void;
}

export default class SubCategory extends React.Component<
  SubCatProps,
  {
    childName: string;
    childrens: string[];
  }
> {
  constructor(props: SubCatProps) {
    super(props);
    this.state = {
      childName: "",
      childrens: this.props.childrens,
    };
  }

  onChangeName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      childName: event.target.value,
    });
  };

  addCategory = (): void => {
    if (
      this.state.childName.length <= 0 ||
      this.state.childrens.includes(this.state.childName)
    ) {
      return;
    }
    const childrens = [...this.state.childrens];
    childrens.push(this.state.childName);
    this.props.addChildFn(this.props.id, this.state.childName);
    this.setState({ childName: "", childrens });
  };

  deleteCategory = (id: number): void => {
    const childrens = [...this.state.childrens];
    childrens.splice(id, 1);
    this.setState({ childrens });
    this.props.deleteChildFn(this.props.id, id);
  };

  render(): JSX.Element {
    return (
      <div className="card border-primary mb-3">
        <div className="card-header">
          <label>{this.props.name}</label>
          <Button
            className={"btn-danger btn-sm"}
            onClick={() => {
              this.props.deleteFunc(this.props.id);
            }}
          >
            Удалить
          </Button>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Добавить подкатегорию"
              aria-describedby="button-subCategory-btn"
              required={true}
              value={this.state.childName}
              onChange={this.onChangeName}
            />
            <Button
              className="btn btn-sm"
              type="button"
              id="button-subCategory-btn"
              onClick={this.addCategory}
            >
              Добавить
            </Button>
          </div>
          {this.state.childrens.map((value, index) => (
            <React.Fragment key={`sub-ch-cat-${index}`}>
              <label>{value}</label>
              <Button
                className={"btn-danger btn-sm"}
                onClick={() => {
                  this.deleteCategory(index);
                }}
              >
                Удалить
              </Button>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}
