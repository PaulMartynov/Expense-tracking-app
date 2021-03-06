import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { getAllCategories, saveCategories } from "../../store/categoryReducer";
import { ReturnState, ThunkProps } from "../ThunkTypes";
import NewCategoryPopup from "./CategoryPopup/NewCategoryPopup";
import CategoryCard from "./CategoryCard/CategoryCard";
import "./Categories.css";
import CategoryFilter from "../FilterComponent/CategoryFilterComponent/CategoryFilter";

const mapStateToProps = (state: ReturnState) => ({
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

  componentDidUpdate(prevProps: Readonly<DispatchPropsType>) {
    if (prevProps.categoryList !== this.props.categoryList) {
      this.setState({
        categoryList: [...this.props.categoryList],
      });
    }
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
    this.setState({ modalActive: !this.state.modalActive });
    const category: ExpCategory = {
      categoryName: name,
      subCategoriesList: childrens,
    };
    if (this.props.userId) {
      const categories = [...this.state.categoryList];
      categories.push(category);
      try {
        await this.props.saveCategories({
          userId: this.props.userId,
          categories,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  updateCategory = async (id: number, category: ExpCategory): Promise<void> => {
    if (this.props.userId) {
      const categories = [...this.state.categoryList];
      categories[id] = category;
      try {
        await this.props.saveCategories({
          userId: this.props.userId,
          categories,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  deleteCategory = async (id: number): Promise<void> => {
    if (this.props.userId) {
      const categories = [...this.state.categoryList];
      categories.splice(id, 1);
      try {
        await this.props.saveCategories({
          userId: this.props.userId,
          categories,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  filterCategory = (list: ExpCategory[]): void => {
    this.setState({
      categoryList: [...list],
    });
  };

  resetFilter = (): void => {
    this.setState({
      categoryList: [...this.props.categoryList],
    });
  };

  setModalActive = (): void => {
    this.setState({ modalActive: !this.state.modalActive });
  };

  render() {
    return (
      <>
        <br />
        <h3>??????????????????:</h3>
        {this.state.modalActive ? (
          <NewCategoryPopup
            active={this.state.modalActive}
            setActive={this.setModalActive}
            children={<div />}
            saveFn={this.addNewCategory}
          />
        ) : null}
        <br />
        <CategoryFilter
          categoryList={this.props.categoryList}
          resetFilter={this.resetFilter}
          filterCategories={this.filterCategory}
        />
        <br />
        <div>
          <div className={"add-category-card-btn"}>
            <Button
              onClick={this.setModalActive}
              id="add-category-btn"
              data-testid={"add-category-btn"}
            >
              ????????????????
            </Button>
          </div>
          <div className={"categories-list"}>
            {this.state.categoryList.map((value, index) => (
              <React.Fragment key={`category-index-${index}`}>
                <CategoryCard
                  category={value}
                  deleteFn={this.deleteCategory}
                  id={index}
                  saveFn={this.updateCategory}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
