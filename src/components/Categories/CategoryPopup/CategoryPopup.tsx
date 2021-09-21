import React from "react";
import { Button } from "react-bootstrap";
import Modal from "../../ModalComponent/Modal";

interface popupProps {
  active: boolean;
  setActive: () => void;
  children: JSX.Element;
}

interface SubCategories {
  name: string;
  children: string[];
}

export default class CategoryPopup extends React.Component<
  popupProps,
  {
    categoryName: string;
    subCategories: SubCategories[];
    subCategoryName: string;
  }
> {
  constructor(props: popupProps) {
    super(props);
    this.state = {
      categoryName: "",
      subCategories: [],
      subCategoryName: "",
    };
  }

  onCategoryChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ categoryName: event.target.value });
  };

  onSubCategoryChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ subCategoryName: event.target.value });
  };

  addSubCategory = (): void => {
    const existCategory = this.state.subCategories.filter(
      (item) => item.name === this.state.subCategoryName
    );
    if (existCategory) {
      return;
    }
    const subCategories = [...this.state.subCategories];
    subCategories.push({
      children: [],
      name: this.state.subCategoryName,
    });
    this.setState({ subCategoryName: "", subCategories });
  };

  render(): JSX.Element {
    return (
      <Modal
        title={"Добавить новую категорию"}
        active={this.props.active}
        setActive={this.props.setActive}
        children={
          <>
            <div className="modal-body">
              <div className="form-group row">
                <input
                  type="text"
                  value={this.state.categoryName}
                  className="form-control-plaintext"
                  placeholder="Название категории"
                  required={true}
                  onChange={this.onCategoryChange}
                />
              </div>
              <br />
              <div className="input-group mb-3">
                <input
                  type="text"
                  value={this.state.subCategoryName}
                  className="form-control"
                  placeholder="Название подкатегории"
                  aria-label="Recipient's username"
                  aria-describedby="button-subCategory-btn"
                  onChange={this.onSubCategoryChange}
                  required={true}
                />
                <Button
                  className="btn btn-sm"
                  type="button"
                  id="button-subCategory-btn"
                  onClick={this.addSubCategory}
                >
                  Добавить
                </Button>
              </div>
            </div>
            <div className="modal-footer">
              <Button className="btn btn-primary">Сохранить</Button>
              <Button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={this.props.setActive}
              >
                Закрыть
              </Button>
            </div>
          </>
        }
      />
    );
  }
}
