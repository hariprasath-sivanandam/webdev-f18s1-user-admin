function UserServiceClient() {
    this.findAllUsers = findAllUsers;
    var self = this;
   
    function findAllUsers() {
        return fetch("../services/users.json")
            .then(function (response) {
                return response.json();
            });
    }
}