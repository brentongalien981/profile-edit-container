import React from "react";
import "./ProfileEditContainer.css";
import Options from "./Options";
import UserInfoEdit from "./UserInfoEdit";
import EmploymentEdit from "./Employment/Edit/EmploymentEdit";
import axios from "axios";
import EmploymentContext from "./context/EmploymentContext";

class ProfileEditContainer extends React.Component {
    // token
    // x40lXKPnFndNNuQqOjRIIi97zCIPl3UGQlER0Cvh2MdN13ISF62pJQrtrK6Kgmno9fUuf3eC9ZQJlKob

    static contextType = EmploymentContext;

    constructor(props) {
        super(props);
        this.state = {
            photoUrl: "",
            name: "",
            email: "",
            profile: {},
            socialLinks: {
                facebook: {},
                instagram: {},
                twitter: {},
                linkedin: {},
                snapchat: {},
                tiktok: {}
            },
            employments: [],
            isUserInfoUpdating: false,
            isEmploymentUpdating: false,
            userInfoErrors: [],
            employmentErrors: [],
            profilePhotoErrors: []
        };
        this.appUrl = "http://myg.test:8000";

        this.fillComponent = this.fillComponent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEmploymentChanged = this.handleEmploymentChanged.bind(this);
        this.handleAddEmploymentDescriptionClicked = this.handleAddEmploymentDescriptionClicked.bind(this);
        this.handleAddEmploymentItemClicked = this.handleAddEmploymentItemClicked.bind(this);
        this.handleEmploymentDescriptionChanged = this.handleEmploymentDescriptionChanged.bind(this);
        this.handleUserInfoSaved = this.handleUserInfoSaved.bind(this);
        this.handleProfilePhotoChanged = this.handleProfilePhotoChanged.bind(this);
        // this.handleProfilePhotoSaved = this.handleProfilePhotoSaved.bind(this);
        this.handleEmploymentSaved = this.handleEmploymentSaved.bind(this);
    }


    displayErrors(error) {
        
        console.log("\n\n\n#########################");
        console.log("in method:: displayErrors()");
        console.log("error ==> " + error);
        console.log("looping through object:: error...");
        

        for (const property in error) {
            console.log(`${property}: ${error[property]}`);
        }

        try {
            console.log(error.response);
        } catch (e) {
            console.log("error bruh ==> " + e);
        }

        try {
            console.log(error.response.data.message);
        } catch (e) {
            console.log("error bruh ==> " + e);
        }

        try {
            console.log(error.response.data.errors);
        } catch (e) {
            console.log("error bruh ==> " + e);
        }
    }


    displayObjects(obj, objName) {
        
        console.log("\n\n\n#########################");
        console.log("in method:: displayObjects()");
        console.log("obj ==> " + objName);
        console.log(obj);
        console.log("looping through object:: " + objName);
        

        for (const property in obj) {
            console.log(`${property}: ${obj[property]}`);
        }
    }


    handleEmploymentSaved() {

        if (this.state.isEmploymentUpdating) {
            console.log("\nemployment is still updating");
            return;
        }
        console.log("\nhandleEmploymentSaved()");

        this.setState((prevState, props) => {
            return { isEmploymentUpdating: true };
        });
        console.log("this.state.isEmploymentUpdating now set ==> " + this.state.isEmploymentUpdating);

        let self = this;
        let token = "x40lXKPnFndNNuQqOjRIIi97zCIPl3UGQlER0Cvh2MdN13ISF62pJQrtrK6Kgmno9fUuf3eC9ZQJlKob";
        // let url = "http://myg.test:8000/api/profile/update";
        let url = "http://myg.test:8000/api/employment/update?api_token=" + token;

        axios
            .post(url, {
                employments: this.state.employments
            })
            .then(function (response) {
                self.displayObjects(response, "response");
                self.displayObjects(response.data, "response.data");
                self.displayObjects(response.data.validatedData, "response.data.validatedData");

                if (response.data.result === 1) {
                    self.setState({ employmentErrors: [] });
                }
            })
            .catch(function (error) {
                self.displayErrors(error);

                try {
                    self.setState({ employmentErrors: error.response.data.errors });
                } catch (error) {
                    console.log("error ==> " + error);
                }
                
            })
            .then(function () {
                console.log("\nalways executed");
                self.setState((prevState, props) => {
                    return { isEmploymentUpdating: false };
                });
                console.log("this.state.isEmploymentUpdating now reset ==> " + self.state.isEmploymentUpdating);
            });

    }




    handleProfilePhotoChanged() {
        const self = this;

        let token = "x40lXKPnFndNNuQqOjRIIi97zCIPl3UGQlER0Cvh2MdN13ISF62pJQrtrK6Kgmno9fUuf3eC9ZQJlKob";
        let url = "http://myg.test:8000/api/profile/uploadPhoto?api_token=" + token;
        // let url = "http://myg.test:8000/api/profile-photo";

        var formData = new FormData();
        var imagefile = document.querySelector("#profilePhoto");
        formData.append("profilePhoto", imagefile.files[0]);
        axios
            .post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(function (response) {
                console.log(response);
                console.log("\n\n\nlooping through object:: response...");
                for (const property in response) {
                    console.log(`${property}: ${response[property]}`);
                }

                try {
                    const photoUrl = response.data.url;
                    // self.setState({ photoUrl: photoUrl });
                    let newProfile = self.state.profile;
                    newProfile.photo_url = photoUrl;

                    self.setState({
                        profile: newProfile,
                        profilePhotoErrors: []
                    });
                } catch (e) {
                    console.log("error bruh ==> " + e);
                }
            })
            .catch(function (error) {
                console.log(error);
                console.log("\n\n\nlooping through object:: error...");
                for (const property in error) {
                    console.log(`${property}: ${error[property]}`);
                }

                try {
                    console.log(error.response);
                } catch (e) {
                    console.log("error bruh ==> " + e);
                }
                try {
                    console.log(error.response.data.message);
                } catch (e) {
                    console.log("error bruh ==> " + e);
                }
                try {
                    console.log(error.response.data.errors);
                    self.setState({
                        profilePhotoErrors: error.response.data.errors
                    });
                } catch (e) {
                    console.log("error bruh ==> " + e);
                }
            });
    }

    handleUserInfoSaved() {
        if (this.state.isUserInfoUpdating) {
            console.log("\nuserInfo is still updating");
            return;
        }
        console.log("\nmethod:: handleUserInfoSaved()");

        this.setState((prevState, props) => {
            return { isUserInfoUpdating: true };
        });
        console.log("this.state.isUserInfoUpdating now set ==> " + this.state.isUserInfoUpdating);

        let self = this;
        let token = "x40lXKPnFndNNuQqOjRIIi97zCIPl3UGQlER0Cvh2MdN13ISF62pJQrtrK6Kgmno9fUuf3eC9ZQJlKob";
        // let url = "http://myg.test:8000/api/profile/update";
        let url = "http://myg.test:8000/api/profile/updateUserInfo?api_token=" + token;

        axios
            .post(url, {
                firstName: "Fred",
                lastName: "Flintstone",
                ...this.state.profile,
                ...this.state.socialLinks
            })
            .then(function (response) {
                console.log(response);
                console.log("\n\n\nlooping through object:: response...");
                for (const property in response) {
                    console.log(`${property}: ${response[property]}`);
                }

                if (response.data.result === 1) {
                    self.setState({ userInfoErrors: [] });
                }
            })
            .catch(function (error) {
                console.log(error);
                console.log("\n\n\nlooping through object:: error...");
                for (const property in error) {
                    console.log(`${property}: ${error[property]}`);
                }
                console.log(error.response);
                console.log(error.response.data.message);
                console.log(error.response.data.errors);

                self.setState({ userInfoErrors: error.response.data.errors });
            })
            .then(function () {
                // always executed
                console.log("\nalways executed");
                // self.setState({ isUserInfoUpdating: false });
                self.setState((prevState, props) => {
                    return { isUserInfoUpdating: false };
                });
                console.log("this.state.isUserInfoUpdating now reset ==> " + self.state.isUserInfoUpdating);
            });
    }

    handleAddEmploymentItemClicked() {
        console.log("\nmethod:: handleAddEmploymentItemClicked()");

        const randomId = "E-" + Math.floor(Math.random() * 1000) + 1;
        let aDate = new Date();
        aDate = aDate.toISOString().substr(0, 10);

        let newEmployment = {
            id: randomId,
            user_id: 0,
            employer: "",
            position: "",
            start_date: aDate,
            end_date: aDate,
            descriptions: [
                {
                    id: 0,
                    description: ""
                }
            ]
        };

        let updatedEmployments = [newEmployment, ...this.state.employments];

        this.setState({ employments: updatedEmployments });
    }

    setMyContext() {
        this.context.employmentDescriptionChanged = this.handleEmploymentDescriptionChanged;
    }

    handleEmploymentDescriptionChanged(event, employmentIndex, descriptionIndex) {
        console.log("\nmethod:: handleEmploymentDescriptionChanged()");
        console.log("employmentIndex:: " + employmentIndex);
        console.log("descriptionIndex:: " + descriptionIndex);

        const value = event.target.value;

        let updatedEmployments = this.state.employments;
        updatedEmployments[employmentIndex].descriptions[descriptionIndex].description = value;

        this.setState({
            employments: updatedEmployments
        });
    }

    handleAddEmploymentDescriptionClicked(employmentId) {
        console.log("\n\nmethod:: handleAddEmploymentDescriptionClicked()");
        console.log("value ==> " + employmentId);

        let employments = this.state.employments;

        for (let i = 0; i < employments.length; i++) {
            const employment = employments[i];

            if (employment.id == employmentId) {
                // Check that the employment doesn't exceed 5 descriptions.
                if (employment.descriptions.length >= 5) {
                    console.log("\ntoo many descriptions...");
                    break;
                }

                // Check that the latest description is not empty.
                const descriptionsNum = employment.descriptions.length;
                const latestDescription = employment.descriptions[descriptionsNum - 1].description;

                if (latestDescription.length == 0) {
                    console.log("\nfill in the description above...");
                    break;
                }

                // Else, create a new description (textarea).
                const randomId = "A-" + Math.floor(Math.random() * 1000) + 1;
                const descriptions = employment.descriptions;
                const newDescription = { id: randomId, description: "" };

                const updatedDescriptions = [...descriptions, newDescription];
                let updatedEmployment = employment;
                updatedEmployment.descriptions = updatedDescriptions;
                employments[i] = updatedEmployment;

                //
                this.setState({
                    employments: [...employments]
                });

                console.log("\nhere's your new textarea...");
                break;
            }
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        const oldProfile = this.state.profile;
        const newProfile = { ...oldProfile, [name]: value };

        // for user-info
        this.setState({
            profile: newProfile
        });

        // for socialLinks
        switch (name) {
            case "facebook":
            case "instagram":
            case "twitter":
                let updatedSocialLinks = this.state.socialLinks;
                updatedSocialLinks[name].username = value;

                this.setState({ socialLinks: updatedSocialLinks });
                break;
        }
    }

    handleEmploymentChanged(event, index, employmentId) {
        console.log("\nemploymentId ==> " + employmentId);
        console.log("\nindex ==> " + index);

        const target = event.target;
        const value = target.value;
        const name = target.name;

        let updatedEmployments = this.state.employments;
        updatedEmployments[index][name] = value;

        //
        this.setState({
            employments: updatedEmployments
        });
    }

    fillComponent(data) {
        // combine
        data.profile.username = data.name;
        data.profile.email = data.email;

        // Set socialLinks.
        const socialLinks = data.social_links;
        let actualSocialLinks = {};

        for (const socialLink of socialLinks) {
            const linkType = socialLink.social_link_type;
            const companyName = linkType.name;

            actualSocialLinks[companyName] = {
                id: socialLink.id,
                userId: socialLink.user_id,
                socialLinkTypeId: linkType.id,
                username: socialLink.username,
                website: linkType.website
            };
        }

        console.log("\n\n\nlooping through object:: actualSocialLinks...");
        for (const companyName in actualSocialLinks) {
            console.log("looping through company ==> " + companyName);

            const company = actualSocialLinks[companyName];
            for (const linkDetail in company) {
                console.log(linkDetail + " ===> " + company[linkDetail]);
            }
        }

        const oldSocialLinks = this.state.socialLinks;
        const newSocialLinks = { ...oldSocialLinks, ...actualSocialLinks };

        // Set employments.
        console.log("\n\n\nlooping through array:: employments...");
        for (const employment of data.employments) {
            for (const key in employment) {
                console.log(key + " ===> " + employment[key]);
            }
        }

        const oldEmployments = this.state.employments;
        const newEmployments = { ...oldEmployments, ...data.employments };

        //
        this.setState({
            profile: data.profile,
            socialLinks: newSocialLinks,
            employments: data.employments
        });

        console.log("method: fillComponent() been called");
    }

    render() {
        return (
            <div className="ProfileEditContainer container">
                <h1 id="shit">ProfileEditContainer bitch!</h1>

                <div className="row">
                    <div className="col-4">
                        <Options />
                    </div>
                    <div className="col-8 bg-warning">
                        <div className="tab-content" id="profileDetailsHolder">
                            <div className="tab-pane active" id="userInfoEdit" role="tabpanel">
                                <UserInfoEdit
                                    photoUrl={this.appUrl + this.state.profile.photo_url}
                                    profile={this.state.profile}
                                    profilePhotoErrors={this.state.profilePhotoErrors}
                                    socialLinks={this.state.socialLinks}
                                    changed={this.handleChange}
                                    userInfoSaved={this.handleUserInfoSaved}
                                    errors={this.state.userInfoErrors}
                                    profilePhotoChanged={this.handleProfilePhotoChanged} />
                            </div>
                            <div className="tab-pane" id="employmentEdit" role="tabpanel">
                                <EmploymentEdit
                                    employments={this.state.employments}
                                    employmentErrors={this.state.employmentErrors}
                                    changed={this.handleEmploymentChanged}
                                    addEmploymentItemClicked={this.handleAddEmploymentItemClicked}
                                    addEmploymentDescriptionClicked={this.handleAddEmploymentDescriptionClicked}
                                    employmentSaved={this.handleEmploymentSaved} />
                            </div>
                            <div className="tab-pane" id="messages" role="tabpanel">zzz</div>
                            <div className="tab-pane" id="settings" role="tabpanel">xxx</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.setMyContext();

        let token = "x40lXKPnFndNNuQqOjRIIi97zCIPl3UGQlER0Cvh2MdN13ISF62pJQrtrK6Kgmno9fUuf3eC9ZQJlKob";
        let url = "http://myg.test:8000/api/user?api_token=" + token;
        // let url = "http://myg.test:8000/api/fucker?api_token=" + token;
        // let url = "http://myg.test:8000/api/fucker";

        let self = this;

        axios({
            method: "get",
            url: url
        })
            .then(function (response) {
                // handle success
                console.log("response ==> " + response);
                console.log("response.data ==> " + response.data);

                console.log("\n\n\nooping through object:: response...");
                for (const property in response) {
                    console.log(`${property}: ${response[property]}`);
                }


                const data = response.data.data;
                console.log("\n\n\nlooping through object:: data...");
                for (const property in data) {
                    console.log(`${property}: ${data[property]}`);
                }

                const profile = data.profile;
                console.log("\n\n\nlooping through object:: profile...");
                for (const property in profile) {
                    console.log(`${property}: ${profile[property]}`);
                }

                const socialLinks = data.social_links;
                console.log("\n\n\nlooping through object:: social_links...");
                for (const property in socialLinks) {
                    console.log(`${property}: ${socialLinks[property]}`);

                    const linkProps = socialLinks[property];
                    for (const prop in linkProps) {
                        console.log(`${prop}: ${linkProps[prop]}`);
                    }
                }

                // self.setState({ relationship: newRelationshipState });
                self.fillComponent(data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
                console.log("done axiosing");
            });

        // axios.get(url)
    }
}

export default ProfileEditContainer;
