import React, { Component } from "react";
import $ from "jquery";
import EmploymentItem from "./EmploymentItem";

function EmploymentEdit(props) {
    const employments = props.employments.map((employment, index) => {
        return <EmploymentItem key={employment.id} index={index} employment={employment} changed={props.changed} addEmploymentDescriptionClicked={props.addEmploymentDescriptionClicked} />;
    });

    return (
        <div>
            <div>
                <button type="button" className="btn btn-success" onClick={props.addEmploymentItemClicked}>
                    <i className="fa fa-plus-square"></i> Add Employment
                </button>
            </div>
            {employments}

            <div className="row">
                <div className="col-sm-10">
                    <button type="button" className="btn btn-primary">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EmploymentEdit;
