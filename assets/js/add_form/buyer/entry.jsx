const React = require('react');
const ReactSelectize = require("react-selectize");
const SimpleSelect = ReactSelectize.SimpleSelect;
const axios = require('axios');
require('./material.scss');

class Entry extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
        };

        this.searchMember = this.searchMember.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        this.setState(nextProps);
    
    }

    searchMember (search) {
        if (search) {
            axios.get('/fr/api/v1/member?search=' + search)
                .then(json => {
                    this.setState({
                        users: json.data,
                    });
                });
        } else {
            this.setState({
                users: [],    
            });
        }
    }

    render () {
        const options = this.state.users.map(user => {
            if (user.user) {
                return {label: user.user.username, value: user.id};
            } else {
                return {label: user.id, value: user.id};
            }
        });

        return (
            <div className="input-field">
                <SimpleSelect
                    name="user"
                    options={options}
                    placeholder = {this.loading ? "Choisir l'utilisateur" : "Chargement..."}                                                                        
                    theme = "material"
                    transitionEnter = {true}
                    onSearchChange = {this.searchMember}
                />
            </div> 
        );
    }
}

Entry.propTypes = {
    users: React.PropTypes.object,
};

Entry.defaultProps = {
    users: [],
}

module.exports = Entry;
