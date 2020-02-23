import React, { useContext } from "react";
import EmploymentContext from "../../context/EmploymentContext";

function EmploymentItemDescription(props) {
    //
    const employmentContext = useContext(EmploymentContext);

    return (
        <div className="form-group row">
            <label className="col-sm-2 col-form-label">Detail</label>

            <div className="col-sm-10">
                <textarea className="form-control" value={props.description} onChange={(event) => employmentContext.employmentDescriptionChanged(event, props.employmentIndex, props.index)} />
            </div>
        </div>
    );
}

export default EmploymentItemDescription;
