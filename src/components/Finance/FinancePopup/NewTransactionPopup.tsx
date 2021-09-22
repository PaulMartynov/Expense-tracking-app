import React from "react";
import { Button } from "react-bootstrap";
import Modal from "../../ModalComponent/Modal";

interface popupProps {
  active: boolean;
  setActive: () => void;
  categoryList: ExpCategory[];
  saveFn: (data: TransactionData) => Promise<void>;
}

export default class NewTransactionPopup extends React.Component<
  popupProps,
  {
    description: string;
    date: Date;
    amount: number;
    category: string;
    subcategory: string;
    childSubCategory: string;
  }
> {
  constructor(props: popupProps) {
    super(props);
    this.state = {
      description: "",
      date: new Date(),
      amount: 0,
      category: "",
      subcategory: "",
      childSubCategory: "",
    };
  }

  render(): JSX.Element {
    return (
      <Modal
        title={"Добавить новую операцию"}
        active={this.props.active}
        setActive={this.props.setActive}
        children={
          <>
            <div className="modal-body">
              <div className="form-group row">
                <label
                  htmlFor="amountInput"
                  className="col-sm-2 col-form-label"
                >
                  Сумма:
                </label>
                <div className="col-sm-10">
                  <input
                    id="amountInput"
                    type="number"
                    step="0.01"
                    value={this.state.amount}
                    className="form-control"
                    placeholder="Сумма"
                    required={true}
                  />
                </div>
              </div>
            </div>
          </>
        }
      />
    );
  }
}
