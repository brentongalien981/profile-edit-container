import React from "react";

function UserInfoEdit(props) {
    return (
        <form>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Photo</label>

                <div className="col-sm-10">
                    <img src="" alt="profile-photo" />
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="customFile" />
                        <label className="custom-file-label">Upload Photo</label>
                    </div>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Username</label>

                <div className="col-sm-10">
                    <input type="text" name="username" className="form-control" value={props.profile.username ? props.profile.username : ""} onChange={props.changed} />
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

            <div className="form-group row">
                <div className="col-sm-10">
                    <button type="button" className="btn btn-primary">
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
}

export default UserInfoEdit;
