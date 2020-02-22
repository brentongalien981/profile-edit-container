import React from "react";

function EmploymentItemDescription(props) {
    return (
        <div className="form-group row">
            <label className="col-sm-2 col-form-label">Detail</label>

            <div className="col-sm-10">
                <textarea className="form-control" value={props.description} onChange={props.changed} />
            </div>
        </div>
    );
}

export default EmploymentItemDescription;
