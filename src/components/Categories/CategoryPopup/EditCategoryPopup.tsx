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
        title={"?????????????????????????? ??????????????????"}
        active={this.props.active}
        setActive={this.props.setActive}
        children={
          <>
            <div className="modal-body" data-testid={"modal-body"}>
              <div className="form-group row">
                <label
                  htmlFor="operation-description"
                  className="col-sm-2 col-form-label"
                >
                  ??????:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    value={this.state.categoryName}
                    className="form-control cat-name"
                    placeholder="?????????????? ???????????????? ??????????????????"
                    required={true}
                    onChange={this.onCategoryChange}
                    data-testid={"modal-category-input"}
                  />
                </div>
              </div>
              <br />
              <div className="form-group row">
                <label
                  htmlFor="operation-description"
                  className="col-sm-2 col-form-label"
                >
                  ????????????????????????:
                </label>
                <div className="col-sm-10">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      value={this.state.subCategoryName}
                      className="form-control"
                      placeholder="???????????????? ????????????????????????"
                      aria-describedby="button-subCategory-btn"
                      onChange={this.onSubCategoryChange}
                      required={true}
                      data-testid={"modal-subcategory-input"}
                    />
                    <Button
                      className="btn"
                      type="button"
                      id="button-subCategory-btn"
                      onClick={this.addSubCategory}
                      data-testid={"modal-subcategory-add-btn"}
                    >
                      ????????????????
                    </Button>
                  </div>
                </div>
              </div>
              <div className={"subcategories-cards"}>
                {this.state.subCategories.map((value, index) => (
                  <React.Fragment key={`sub-cat-${index}`}>
                    <SubCategory
                      data-testid={`modal-subcategory-${index}`}
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
            <div className="modal-footer" data-testid={"modal-footer"}>
              <Button
                className="btn btn-primary"
                data-testid={"modal-footer-save-btn"}
                onClick={async () => {
                  await this.props.saveFn(this.props.id, {
                    categoryName: this.state.categoryName,
                    subCategoriesList: this.state.subCategories,
                  });
                }}
              >
                ??????????????????
              </Button>
              <Button
                className="btn btn-danger"
                data-testid={"modal-footer-del-btn"}
                onClick={async () => {
                  await this.props.deleteFn(this.props.id);
                }}
              >
                ??????????????
              </Button>
              <Button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={this.props.setActive}
                data-testid={"modal-footer-close-btn"}
              >
                ??????????????
              </Button>
            </div>
          </>
        }
      />
    );
  }
}
