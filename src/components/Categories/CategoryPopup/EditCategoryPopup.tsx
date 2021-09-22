import React from "react";
import { Button } from "react-bootstrap";
import Modal from "../../ModalComponent/Modal";
import SubCategory from "./SubCategory";
import "./subCat.css";

interface popupProps {
  id: number;
  active: boolean;
  setActive: () => void;
  category: ExpCategory;
  saveFn: (id: number, category: ExpCategory) => Promise<void>;
  deleteFn: (id: number) => Promise<void>;
}

export default class EditCategoryPopup extends React.Component<
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
      categoryName: this.props.category.categoryName,
      subCategories: [...this.props.category.subCategoriesList],
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
    if (
      existCategory.length > 0 ||
      this.state.categoryName.length <= 0 ||
      this.state.subCategoryName.length <= 0 ||
      this.state.categoryName === this.state.subCategoryName
    ) {
      return;
    }
    const subCategories = [...this.state.subCategories];
    subCategories.push({
      children: [],
      name: this.state.subCategoryName,
    });
    this.setState({ subCategoryName: "", subCategories });
  };

  deleteSubCategory = (id: number): void => {
    const subCategories = [...this.state.subCategories];
    subCategories.splice(id, 1);
    this.setState({ subCategories });
  };

  addChild = (id: number, child: string): void => {
    const subCategories = [...this.state.subCategories];
    const childrens = [...subCategories[id].children];
    childrens.push(child);
    subCategories[id] = { name: subCategories[id].name, children: childrens };
    this.setState({ subCategories });
  };

  deleteChild = (id: number, childId: number): void => {
    const subCategories = [...this.state.subCategories];
    const childrens = [...subCategories[id].children];
    childrens.splice(childId, 1);
    subCategories[id] = { name: subCategories[id].name, children: childrens };
    this.setState({ subCategories });
  };

  render(): JSX.Element {
    return (
      <Modal
        title={"Редактировать категорию"}
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
                  placeholder="Введите название категории"
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
                  placeholder="Добавить подкатегорию"
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
              <div className={"subcategories-cards"}>
                {this.state.subCategories.map((value, index) => (
                  <React.Fragment key={`sub-cat-${index}`}>
                    <SubCategory
                      id={index}
                      name={value.name}
                      childrens={value.children}
                      deleteFunc={this.deleteSubCategory}
                      addChildFn={this.addChild}
                      deleteChildFn={this.deleteChild}
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <Button
                className="btn btn-primary"
                onClick={async () => {
                  await this.props.saveFn(this.props.id, {
                    categoryName: this.state.categoryName,
                    subCategoriesList: this.state.subCategories,
                  });
                }}
              >
                Сохранить
              </Button>
              <Button
                className="btn btn-danger"
                onClick={async () => {
                  await this.props.deleteFn(this.props.id);
                }}
              >
                Удалить
              </Button>
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
