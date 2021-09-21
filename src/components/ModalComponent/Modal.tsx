import React from "react";
import "./style.css";
import { Button } from "react-bootstrap";

interface ModalProps {
  active: boolean;
  setActive: () => void;
  children: JSX.Element;
  title: string;
}

export default function Modal(props: ModalProps): JSX.Element {
  return (
    <div
      className={props.active ? "modal_window active" : "modal_window"}
      onClick={props.setActive}
    >
      <div
        className={props.active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h5 className="modal-title">{props.title}</h5>
          <Button
            onClick={props.setActive}
            className="btn-close"
            aria-label="Close"
          />
        </div>
        {props.children}
      </div>
    </div>
  );
}
