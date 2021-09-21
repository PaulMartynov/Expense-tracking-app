import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { store } from "../../store/store";
import { getAllCategories, saveCategories } from "../../store/categoryReducer";
import { ThunkProps } from "../ThunkTypes";
import CategoryPopup from "./CategoryPopup/CategoryPopup";
import CategoryCard from "./CategoryCard/CategoryCard";
import "./Categories.css";

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
    modalActive: boolean;
    categoryList: ExpCategory[];
  }
> {
  constructor(props: DispatchPropsType) {
    super(props);
    this.state = {
      modalActive: false,
      categoryList: [...this.props.categoryList],
    };
  }

  override async componentDidMount(): Promise<void> {
    if (this.props.userId) {
      try {
        await this.props.getAllCategories(this.props.userId);
        this.setState({
          categoryList: [...this.props.categoryList],
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  addNewCategory = async (
    name: string,
    childrens: SubCategories[]
  ): Promise<void> => {
    const exist = this.state.categoryList.filter(
      (item) => item.categoryName === name
    );
    if (name.length <= 0 || exist.length > 0) {
      return;
    }
    const category: ExpCategory = {
      categoryName: name,
      subCategoriesList: childrens,
    };
    if (this.props.userId) {
      const categories = [...this.state.categoryList];
      categories.push(category);
      await this.props.saveCategories({
        userId: this.props.userId,
        categories,
      });
    }
    this.setState({ modalActive: !this.state.modalActive });
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
            saveFn={this.addNewCategory}
          />
        ) : null}
        <div>
          <div className={"add-category-card-btn"}>
            <Button onClick={this.setModalActive} id="add-category-btn">
              Добавить
            </Button>
          </div>
          <div className={"categories-list"}>
            {this.state.categoryList.map((value, index) => (
              <React.Fragment key={`category-index-${index}`}>
                <CategoryCard category={value} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
