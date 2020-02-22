import React from "react";
import "./ProfileEditContainer.css";
import Options from "./Options";
import UserInfoEdit from "./UserInfoEdit";
import EmploymentEdit from "./Employment/Edit/EmploymentEdit";
import axios from "axios";

class ProfileEditContainer extends React.Component {
    // token
    // x40lXKPnFndNNuQqOjRIIi97zCIPl3UGQlER0Cvh2MdN13ISF62pJQrtrK6Kgmno9fUuf3eC9ZQJlKob

    constructor(props) {
        super(props);
        this.state = {
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
            employments: []
        };

        this.fillComponent = this.fillComponent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEmploymentChanged = this.handleEmploymentChanged.bind(this);
        this.handleAddEmploymentDescriptionClicked = this.handleAddEmploymentDescriptionClicked.bind(this);
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

        this.setState({
            profile: newProfile
        });
    }

    handleEmploymentChanged() {}

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
                                <UserInfoEdit profile={this.state.profile} socialLinks={this.state.socialLinks} changed={this.handleChange} />
                            </div>
                            <div className="tab-pane" id="employmentEdit" role="tabpanel">
                                <EmploymentEdit
                                    employments={this.state.employments}
                                    changed={this.handleEmploymentChanged}
                                    addEmploymentDescriptionClicked={this.handleAddEmploymentDescriptionClicked}
                                />
                            </div>
                            <div className="tab-pane" id="messages" role="tabpanel">
                                zzz
                            </div>
                            <div className="tab-pane" id="settings" role="tabpanel">
                                xxx
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        let token = "x40lXKPnFndNNuQqOjRIIi97zCIPl3UGQlER0Cvh2MdN13ISF62pJQrtrK6Kgmno9fUuf3eC9ZQJlKob";
        let url = "http://myg.test:8000/api/user?api_token=" + token;
        // let url = "http://myg.test:8000/api/fucker?api_token=" + token;
        // let url = "http://myg.test:8000/api/fucker";

        let self = this;

        axios({
            method: "get",
            url: url
        })
            .then(function(response) {
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
            .catch(function(error) {
                // handle error
                console.log(error);
            })
            .then(function() {
                // always executed
                console.log("done axiosing");
            });

        // axios.get(url)
    }
}

export default ProfileEditContainer;
