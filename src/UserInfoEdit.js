import React from "react";

function getProfilePhotoInput(props) {
    //
    let profilePhotoInput = {
        classNames: ["custom-file-input"],
        statusFeedback: null
    };

    const profilePhotoErrors = props.profilePhotoErrors;
    
    for (const field in profilePhotoErrors) {
        profilePhotoInput.statusFeedback = <div className="invalid-feedback">{profilePhotoErrors[field][0]}</div>;

        profilePhotoInput.classNames.push("is-invalid");
        break;
    }
    
    return profilePhotoInput;
}

function UserInfoEdit(props) {
    //
    const profilePhotoInput = getProfilePhotoInput(props);

    let formErrors = [];

    //
    let counter = 0;

    for (const field in props.errors) {
        const fieldErrors = props.errors[field];
        console.log("\n\nfield ==> " + field);
        // console.log("\fieldErrors ==> " + fieldErrors);

        for (const fieldError of fieldErrors) {
            console.log("fieldError ==> " + fieldError);
        }

        let errorItems = fieldErrors.map((fieldError, index) => {
            return <p key={index}>{fieldError}</p>;
        });

        let fieldErrorComponent = (
            <div key={counter} className="alert alert-danger">
                <label>{field}</label>
                {errorItems}
            </div>
        );

        formErrors.push(fieldErrorComponent);
        ++counter;
    }

    let formErrorsHolder = null;
    if (formErrors.length > 0) {
        formErrorsHolder = (
            <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">Well done!</h4>
                {[...formErrors]}
            </div>
        );
    }

    return (
        <form>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Photo</label>

                <div className="col-sm-10">
                    <img src={props.photoUrl} alt="profile-photo" width="200px" />
                    <div className="custom-file">
                        <input
                            type="file"
                            className={profilePhotoInput.classNames.join(" ")}
                            id="profilePhoto"
                            name="profilePhoto"
                            accept="image/png, image/jpeg"
                            onChange={props.profilePhotoChanged}
                        />
                        <label className="custom-file-label">Upload Photo</label>
                        {profilePhotoInput.statusFeedback}
                    </div>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Username</label>

                <div className="col-sm-10">
                    <input type="text" name="username" className="form-control is-valid" value={props.profile.username ? props.profile.username : ""} onChange={props.changed} />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">First Name</label>

                <div className="col-sm-10">
                    <input type="text" name="first_name" className="form-control" value={props.profile.first_name ? props.profile.first_name : ""} onChange={props.changed} />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Last Name</label>

                <div className="col-sm-10">
                    <input type="text" name="last_name" className="form-control" value={props.profile.last_name ? props.profile.last_name : ""} onChange={props.changed} />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Facebook</label>

                <div className="col-sm-10">
                    <input type="text" name="facebook" className="form-control" value={props.socialLinks.facebook.username ? props.socialLinks.facebook.username : ""} onChange={props.changed} />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Instagram</label>

                <div className="col-sm-10">
                    <input type="text" name="instagram" className="form-control" value={props.socialLinks.instagram.username ? props.socialLinks.instagram.username : ""} onChange={props.changed} />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Twitter</label>

                <div className="col-sm-10">
                    <input type="text" name="twitter" className="form-control" value={props.socialLinks.twitter.username ? props.socialLinks.twitter.username : ""} onChange={props.changed} />
                </div>
            </div>

            {formErrorsHolder}

            <div className="form-group row">
                <div className="col-sm-10">
                    <button type="button" className="btn btn-primary" onClick={props.userInfoSaved}>
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
}

export default UserInfoEdit;
