import React from "react";
import EmploymentItemDescription from "./EmploymentItemDescription";

function EmploymentItem(props) {
    let startDate = new Date(props.employment.start_date);
    startDate = startDate.toISOString().substr(0, 10);

    let endDate = new Date(props.employment.end_date);
    endDate = endDate.toISOString().substr(0, 10);

    const descriptions = props.employment.descriptions.map(description => {
        return <EmploymentItemDescription key={description.id} description={description.description} changed={() => {}} />;
    });

    return (
        <form>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Company</label>

                <div className="col-sm-10">
                    <input type="text" name="employer" className="form-control" value={props.employment.employer ? props.employment.employer : ""} onChange={props.changed} />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Position</label>

                <div className="col-sm-10">
                    <input type="text" name="position" className="form-control" value={props.employment.position ? props.employment.position : ""} onChange={props.changed} />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Start Date</label>

                <div className="col-sm-10">
                    <input type="date" name="start_date" className="form-control" value={startDate ? startDate : ""} onChange={props.changed} />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">End Date</label>

                <div className="col-sm-10">
                    <input type="date" name="end_date" className="form-control" value={endDate ? endDate : ""} onChange={props.changed} />
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
