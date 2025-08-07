class Role {
  constructor(id, name, description = '') {
    this.id = id;
    this.name = name;
  }
}

class User {
  constructor(id, email, password, role = null) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.role = role; // Un solo rol, no un array de roles
  }

  setRole(role) {
    this.role = role;
  }

  hasRole(roleName) {
    return this.role && this.role.name === roleName;
  }
}

module.exports = { User, Role };
