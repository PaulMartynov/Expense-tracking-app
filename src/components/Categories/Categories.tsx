import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { store } from "../../store/store";
import { getAllCategories, saveCategories } from "../../store/categoryReducer";
import { ThunkProps } from "../ThunkTypes";

const mapStateToProps = (state: ReturnType<typeof store.getState>) => ({
  userId: state.auth.userId,
  categoryList: state.category.categoryList,
  isLoaded: state.category.isLoaded,
});

const mapDispatchToProps = {
  getAllCategories,
  saveCategories,
};

export type DispatchPropsType = ReturnType<typeof mapStateToProps> &
  ThunkProps<typeof mapDispatchToProps>;

class Categories extends React.Component<
  DispatchPropsType,
  {
    newCategoryName: string;
  }
> {
  constructor(props: DispatchPropsType) {
    super(props);
    this.state = {
      newCategoryName: "",
    };
  }

  onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newCategoryName: event.target.value,
    });
  };

  addCategory = async (): Promise<void> => {
    const category: ExpCategory = {
      mainCategory: this.state.newCategoryName,
      categoryName: this.state.newCategoryName,
    };
    if (this.props.userId) {
      await this.props.saveCategories({
        userId: this.props.userId,
        categories: [category],
      });
    }
    this.setState({ newCategoryName: "" });
  };

  render() {
    return (
      <>
        <h3>Категории операций:</h3>
        <div className="form-group">
          <div className="input-group mb-3">
            <input
              className={"form-control"}
              onChange={this.onChangeInput}
              type="text"
              value={this.state.newCategoryName}
              name="NewCategoryName"
              required={true}
              placeholder={"Имя категории"}
              aria-describedby="add-category-btn"
            />
            <Button
              onClick={this.addCategory}
              id="add-category-btn"
              disabled={
                !(
                  this.state.newCategoryName &&
                  this.state.newCategoryName.length > 0
                )
              }
            >
              Добавить
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
