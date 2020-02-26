import React, { useContext } from "react";
import EmploymentContext from "../../context/EmploymentContext";




function getClassNames(props) {
    let classNames = ["form-control"];

    const errors = props.errors;
    try {
        for (const key in errors) {
            const errorMsg = errors[key];
            classNames.push("is-invalid");
            break;
        }
    } catch (error) {
        console.log("\nerror bruh ==> " + error);
    }

    return classNames.join(' ');

}



function showFeedback(errors) {
    let feedback = null;

    try {
        for (const key in errors) {
            const errorMsg = errors[key];
            feedback = <div className="invalid-feedback">{errorMsg}</div>;
            break;
        }

    } catch (error) {
        console.log("\nerror bruh ==> " + error);
    }

    return feedback;
}



function EmploymentItemDescription(props) {
    //
    const employmentContext = useContext(EmploymentContext);

    return (
        <div className="form-group row">
            <label className="col-sm-2 col-form-label">Detail</label>

            <div className="col-sm-10">
                <textarea className={getClassNames(props)} value={props.description} onChange={(event) => employmentContext.employmentDescriptionChanged(event, props.employmentIndex, props.index)} />
                {showFeedback(props.errors)}
            </div>
        </div>
    );
}

export default EmploymentItemDescription;
