import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { store } from "../../store/store";
import { getAllCategories, saveCategories } from "../../store/categoryReducer";
import { ThunkProps } from "../ThunkTypes";
import CategoryPopup from "./CategoryPopup/CategoryPopup";

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
    modalActive: boolean;
  }
> {
  constructor(props: DispatchPropsType) {
    super(props);
    this.state = {
      newCategoryName: "",
      modalActive: false,
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

  setModalActive = (): void => {
    this.setState({ modalActive: !this.state.modalActive });
  };

  render() {
    return (
      <>
        <h3>Категории операций:</h3>
        {this.state.modalActive ? (
          <CategoryPopup
            active={this.state.modalActive}
            setActive={this.setModalActive}
            children={<div />}
          />
        ) : null}
        <Button onClick={this.setModalActive} id="add-category-btn">
          Добавить
        </Button>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
