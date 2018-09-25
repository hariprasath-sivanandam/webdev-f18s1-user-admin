(function () {

    jQuery(main);
    var tbody;
    var template;
    var userIdGlobal;
    var userService = new UserServiceClient();
    var users;
    
    function main() {
        tbody = $('.wbdv-tbody');
        template = $('.wbdv-template');
        $('#wbdv-create').click(createUser);
        $('#wbdv-update').click(updateUser);
        $('#wbdv-search').click(selectUser);
        findAllUsers();
    }
    
    function findAllUsers() {
        userService
            .findAllUsers()
            .then(renderUsers);
    }
    
    function selectUser(){
        var temp = [];
        for(var i=0; i<users.length; i++) {
        	if($('#usernameFld').val().length>0 &&
        		users[i]["username"]!==$('#usernameFld').val())
        			continue;
			if($('#firstNameFld').val().length>0 &&
					users[i]["firstName"]!==$('#firstNameFld').val())
        			continue;
			if($('#lastNameFld').val().length>0 && 
					users[i]["lastName"]!==$('#lastNameFld').val())
        			continue;
			if($('#roleFld').val().length>0 &&
					users[i]["role"]!==$('#roleFld').val())
        			continue;
        	temp.push(users[i]);
        }
        users=temp;
        renderUsers(users)
    }
			
    function createUser() {
        var username = $('#usernameFld').val();
        var password = $('#passwordFld').val();
        var firstName = $('#firstNameFld').val();
        var lastName = $('#lastNameFld').val();
        var role = $('#roleFld').val();

        var user = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            role: role
        };
        users.push(user);
        renderUsers(users);
    }

    function renderUsers(u) {
    	tbody.empty();
    	users = u;
        for(var i=0; i<users.length; i++) {
            var user = users[i];
            var clone = template.clone();
            clone.attr('id', user.id);
            clone.find('.wbdv-username')
                .html(user.username);
            clone.find('.wbdv-first-name')
            .html(user.firstName);
            clone.find('.wbdv-last-name')
            .html(user.lastName);
            clone.find('.wbdv-role')
            .html(user.role);
            
            clone.find('.delete').click(deleteUser);
            clone.find('.edit').click(editUser);

            tbody.append(clone);
        }
    }
        
    function deleteUser(event) {
        var deleteBtn = $(event.currentTarget);
        $user = deleteBtn
            .parent()
            .parent().parent();
        $user.remove();
    }

    function editUser(event) {
        var editBtn = $(event.currentTarget);
        var selectedRow = editBtn.parents(".wbdv-template");

        $('#usernameFld').val(selectedRow.find(".wbdv-username").html());
        $('#firstNameFld').val(selectedRow.find(".wbdv-first-name").html());
        $('#lastNameFld').val(selectedRow.find(".wbdv-last-name").html());
        $('#roleFld').val(selectedRow.find(".wbdv-role").html());
        $("#usernameFld").prop("readonly", true);
    }
    
    function updateUser() {
        var username = $('#usernameFld').val();
        var password = $('#passwordFld').val();
        var firstName = $('#firstNameFld').val();
        var lastName = $('#lastNameFld').val();
        var role = $('#roleFld').val();
        var user = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            role: role
        };

        for(var i=0; i<users.length; i++) {
            if (user.username === users[i].username){
            	users[i].firstName = user.firstName;
            	users[i].lastName = user.lastName;
            	users[i].role = user.role;
            }	
        }
        renderUsers(users);
        $('#usernameFld').val("");  $('#passwordFld').val("");
        $('#firstNameFld').val(""); $('#lastNameFld').val("");
        $('#roleFld').val("");
        $("#usernameFld").prop("readonly", false);
    }   
})();
