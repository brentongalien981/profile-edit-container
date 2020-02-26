import React from "react";
import EmploymentItemDescription from "./EmploymentItemDescription";
import "./EmploymentItem.css";



function getClassNames(props, field) {
    let classNames = ["form-control"];

    try {
        if (props.errors[field].length > 0) { classNames.push("is-invalid"); }
    } catch (error) {
        console.log("\nerror bruh ==> " + error);
    }

    return classNames.join(' ');

}



function showFeedback(props, field) {
    let feedback = null;


    try {
        feedback = <div className="invalid-feedback">{props.errors[field]}</div>;
    } catch (error) {
        console.log("\nerror bruh ==> " + error);
    }

    return feedback;

}



function getDescriptionErrors(props, index) {
    let errors = null;

    try {
        errors = props.errors.descriptions[index];
    } catch (error) {
        console.log("\nerror bruh ==> " + error);
    }

    return errors;
}



function EmploymentItem(props) {
    // Set dates.
    let startDate = "2000-01-01";
    try {
        startDate = new Date(props.employment.start_date);
        startDate = startDate.toISOString().substr(0, 10);
    } catch (error) {
        console.log("\n\nerror ===> " + error);
        startDate = "2000-01-01";
    }

    let endDate = "2000-01-01";
    try {
        endDate = new Date(props.employment.end_date);
        endDate = endDate.toISOString().substr(0, 10);
    } catch (error) {
        console.log("\n\nerror ===> " + error);
        endDate = "2000-01-01";
    }

    const descriptions = props.employment.descriptions.map((description, index) => {
        return <EmploymentItemDescription key={description.id} index={index} employmentIndex={props.index} description={description.description} errors={getDescriptionErrors(props, index)} />;
    });

    return (
        <form className="EmploymentItem">
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Company</label>

                <div className="col-sm-10">
                    <input
                        type="text"
                        name="employer"
                        className={getClassNames(props, "employer")}
                        value={props.employment.employer ? props.employment.employer : ""}
                        onChange={event => props.changed(event, props.index, props.employment.id)}
                    />
                    {showFeedback(props, "employer")}
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Position</label>

                <div className="col-sm-10">
                    <input
                        type="text"
                        name="position"
                        className={getClassNames(props, "position")}
                        value={props.employment.position ? props.employment.position : ""}
                        onChange={event => props.changed(event, props.index, props.employment.id)}
                    />
                    {showFeedback(props, "position")}
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Start Date</label>

                <div className="col-sm-10">
                    <input type="date" name="start_date" className={getClassNames(props, "start_date")} value={startDate ? startDate : ""} onChange={event => props.changed(event, props.index, props.employment.id)} />
                    {showFeedback(props, "start_date")}
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">End Date</label>

                <div className="col-sm-10">
                    <input type="date" name="end_date" className={getClassNames(props, "end_date")} value={endDate ? endDate : ""} onChange={event => props.changed(event, props.index, props.employment.id)} />
                    {showFeedback(props, "end_date")}
                </div>
            </div>

            {descriptions}

            <div className="form-group row">
                <label className="col-sm-2 col-form-label"></label>
                <div className="col-sm-10">
                    <button type="button" className="btn btn-primary" onClick={() => props.addEmploymentDescriptionClicked(props.employment.id)}>
                        Add Detail
                    </button>
                </div>
            </div>
        </form>
    );
}

export default EmploymentItem;
