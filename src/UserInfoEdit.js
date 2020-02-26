import React from "react";



function getArrangedErrors(errors) {

    // 'user_id' <== normalField
    // 'facebook.username'
    //      facebook <== normalField
    //          username <== socialLinkField

    let arrangedErrors = {};

    for (const key in errors) {
        const fieldErrors = errors[key];

        // 1) key is like 
        const splittedKey = key.split('.');
        const normalField = splittedKey[0];

        // 
        if (splittedKey.length > 1) {

            // socialLinks errors
            const socialLinklField = splittedKey[1];

            if (arrangedErrors[normalField] == null) { arrangedErrors[normalField] = {}; }
            arrangedErrors[normalField][socialLinklField] = fieldErrors[0];
        }
        else {
            // normal errors
            arrangedErrors[normalField] = fieldErrors[0];
        }

    }

    //
    return arrangedErrors;
}



function getClassNames(arrangedErrors, field) {
    let classNames = ["form-control"];

    try {

        let errorMsg = "";

        switch (field) {
            case "facebook":
            case "instagram":
            case "twitter":
                for (const key in arrangedErrors[field]) {
                    errorMsg = arrangedErrors[field][key];
                }
                break;
            default:
                errorMsg = arrangedErrors[field];
                break;
        }

        if (errorMsg.length > 0) { classNames.push("is-invalid"); }
    } catch (error) {
        console.log("\nerror bruh ==> " + error);
    }

    return classNames.join(' ');

}



function showFeedback(errors, field) {
    let feedback = null;

    try {

        switch (field) {
            case "facebook":
            case "instagram":
            case "twitter":
                for (const key in errors[field]) {
                    const firstErrorMsg = errors[field][key];
                    feedback = <div className="invalid-feedback">{firstErrorMsg}</div>;
                    break;
                }

                break;

            default:
                feedback = <div className="invalid-feedback">{errors[field]}</div>;
                break;
        }
    } catch (error) {
        console.log("\nerror bruh ==> " + error);
    }

    return feedback;

}



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


    //
    let arrangedErrors = getArrangedErrors(props.errors);


    //
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
                    <input type="text" name="username" className={getClassNames(arrangedErrors, "username")} value={props.profile.username ? props.profile.username : ""} onChange={props.changed} />
                    {showFeedback(arrangedErrors, "username")}
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">First Name</label>

                <div className="col-sm-10">
                    <input type="text" name="first_name" className={getClassNames(arrangedErrors, "first_name")} value={props.profile.first_name ? props.profile.first_name : ""} onChange={props.changed} />
                    {showFeedback(arrangedErrors, "first_name")}
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Last Name</label>

                <div className="col-sm-10">
                    <input type="text" name="last_name" className={getClassNames(arrangedErrors, "last_name")} value={props.profile.last_name ? props.profile.last_name : ""} onChange={props.changed} />
                    {showFeedback(arrangedErrors, "last_name")}
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Facebook</label>

                <div className="col-sm-10">
                    <input type="text" name="facebook" className={getClassNames(arrangedErrors, "facebook")} value={props.socialLinks.facebook.username ? props.socialLinks.facebook.username : ""} onChange={props.changed} />
                    {showFeedback(arrangedErrors, "facebook")}
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Instagram</label>

                <div className="col-sm-10">
                    <input type="text" name="instagram" className={getClassNames(arrangedErrors, "instagram")} value={props.socialLinks.instagram.username ? props.socialLinks.instagram.username : ""} onChange={props.changed} />
                    {showFeedback(arrangedErrors, "instagram")}
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Twitter</label>

                <div className="col-sm-10">
                    <input type="text" name="twitter" className={getClassNames(arrangedErrors, "twitter")} value={props.socialLinks.twitter.username ? props.socialLinks.twitter.username : ""} onChange={props.changed} />
                    {showFeedback(arrangedErrors, "twitter")}
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
