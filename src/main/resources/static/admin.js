const url = 'http://localhost:8091/api/users';

function getAllUsers() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            loadTable(data)
        })
}

function loadTable(listAllUsers) {
    let res = ``;

    for (let user of listAllUsers) {
        res +=
            `<tr id="row" >
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.lastname}</td>
                <td>${user.age}</td>
                <td>${user.rolesToString}</td>
    
               <td>
                    <button id="button-edit" class="btn btn-sm btn-primary" type="button"
                    data-bs-toggle="modal" href="#editModal"
                    onclick="editModal(${user.id})">Edit</button></td>
                <td>
                    <button class="btn btn-sm btn-danger" type="button"
                    data-bs-toggle="modal" data-bs-target="#deleteModal"
                    onclick="deleteModal(${user.id})">Delete</button></td>
            </tr>`
    }
    document.getElementById('tableBodyAdmin').innerHTML = res;

}

function newUserTab() {
    document.getElementById('newUserForm').addEventListener('submit', (e) => {
        e.preventDefault()

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                name: document.getElementById('nameNew').value,
                lastname: document.getElementById('lastNameNew').value,
                age: document.getElementById('ageNew').value,
                password: document.getElementById('passwordNew').value,
                roles: document.getElementById('rolesNew').value
            })
        })
            .then((response) => {
                if (response.ok) {
                    document.getElementById('nameNew').value = '';
                    document.getElementById('lastNameNew').value = '';
                    document.getElementById('ageNew').value = '';
                    document.getElementById('passwordNew').value = '';
                    document.getElementById('rolesNew').value = '';
                    document.getElementById('userTable-tab').click()
                    getAllUsers();
                }
            })
     })
}

function closeModal() {
    document.querySelectorAll(".btn-close").forEach((btn) => btn.click())
}


function editModal(id) {
    let editId = `${url}/${id}`;
    fetch(editId, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(user => {
            document.getElementById('editId').value = user.id;
            document.getElementById('editName').value = user.name;
            document.getElementById('editLastName').value = user.lastname;
            document.getElementById('editAge').value = user.age;
            document.getElementById('editPassword').value = user.password;
            document.getElementById('editRole').value = user.rolesToString;
        })
    });

}


async function editUser() {
    let idValue = document.getElementById('editId').value;
    let nameValue = document.getElementById('editName').value;
    let lastNameValue = document.getElementById('editLastName').value;
    let ageValue = document.getElementById('editAge').value;
    let passwordValue = document.getElementById('editPassword').value;
    let  role = document.getElementById('editRole').value;
    let user = {
        id: idValue,
        name: nameValue,
        lastname: lastNameValue,
        age: ageValue,
        password: passwordValue,
        roles: role
    }
    await fetch(`${url}/${idValue}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(user)
    });
    closeModal()
    getAllUsers()
}


function deleteModal(id) {
    let delId = `${url}/${id}`;
    fetch(delId, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(user => {
            document.getElementById('deleteId').value = user.id;
            document.getElementById('deleteName').value = user.name;
            document.getElementById('deleteLastName').value = user.lastname;
            document.getElementById('deleteAge').value = user.age;
            document.getElementById('deleteRoles').value = user.rolesToString;
        })
    });
}

async function deleteUser() {
    const id = document.getElementById('deleteId').value
    let urlDel = `${url}/${id}`;

    let method = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(urlDel, method).then(() => {
        closeModal()
        getAllUsers()
    })

}
getAllUsers()


