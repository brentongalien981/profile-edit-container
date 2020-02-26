import React, { Component } from "react";
import $ from "jquery";
import EmploymentItem from "./EmploymentItem";
import "./EmploymentEdit.css";



function getArrangedErrors(errors) {

    // 'employments.*.id' => 'nullable|alpha_dash|min:1|max:16',
    // 'employments.*.user_id' => 'nullable|alpha_dash|max:16',
    // 'employments.*.employer' => 'required|min:2|max:128',
    // 'employments.*.position' => 'required|min:2|max:128',
    // 'employments.*.start_date' => 'required|min:10|max:32|date',
    // 'employments.*.end_date' => 'required|min:10|max:32|date',

    // 'employments.*.descriptions.*.description' => 'nullable|min:2|max:512',

    // SAMPLE: let arrangedErrors = {
    //     0: { position: "error message for id", user_id: "error message for user_id" },
    //     3: { 
    //     id: "error message for id", 
    //     descriptions: {
    //         0: { description: "error", user_id: "error"},
    //         4: { id: "error", description: "error"}
    //     }
    //     employer: "error message for user_id" 
    // },
    //     1: { start_date: "error message for id", user_id: "error message for user_id" }
    // };

    let arrangedErrors = {};

    for (const key in errors) {
        const fieldErrors = errors[key];

        // 1) key is like this ==> employments.0.id
        // Get the index of the EmploymentItem error, which is 0
        const employmentItemIndex = key.split('.')[1];

        // 2) Get the field of the employment item error, which is id
        const employmentItemField = key.split('.')[2];

        // 3) Just show the first field error to the user.
        if (arrangedErrors[employmentItemIndex] == null) { arrangedErrors[employmentItemIndex] = {}; }

        if (employmentItemField == "descriptions") {

            // a) key is like this ==> employments.0.descriptions.2.description
            // Get the index of the description-item-error, which is 2
            const descriptionItemIndex = key.split('.')[3];

            // b) Get the field of the description-item-error, which is description
            const descriptionItemField = key.split('.')[4];

            // c) 
            if (arrangedErrors[employmentItemIndex].descriptions == null) { arrangedErrors[employmentItemIndex].descriptions = {}; }

            // d) 
            if (arrangedErrors[employmentItemIndex].descriptions[descriptionItemIndex] == null) { arrangedErrors[employmentItemIndex].descriptions[descriptionItemIndex] = {}; }

            // e) 
            arrangedErrors[employmentItemIndex].descriptions[descriptionItemIndex][descriptionItemField] = fieldErrors[0];
        }
        else {
            arrangedErrors[employmentItemIndex][employmentItemField] = fieldErrors[0];
        }

    }



    return arrangedErrors;
}



function EmploymentEdit(props) {

    const arrangedErrors = getArrangedErrors(props.employmentErrors);

    const employments = props.employments.map((employment, index) => {
        return <EmploymentItem
            key={employment.id}
            index={index}
            employment={employment}
            errors={arrangedErrors[index]}
            changed={props.changed}
            addEmploymentDescriptionClicked={props.addEmploymentDescriptionClicked} />;
    });

    return (
        <div className="EmploymentEdit">
            <div id="actionButtonsHolder" className="row justify-content-between">
                <button id="saveEmploymentBtn" type="button" className="btn btn-primary" onClick={props.employmentSaved}>Save Employments</button>

                <button id="addEmploymentItemBtn" type="button" className="btn btn-success" onClick={props.addEmploymentItemClicked}>
                    <i className="fa fa-plus-square"></i> Add Employment
                </button>
            </div>
            {employments}

        </div>
    );
}

export default EmploymentEdit;
