import fs from 'fs';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

// User type
type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  provider?: string;
};

// Initialize users array
let users: User[] = [];

// Load users from file on startup
function loadUsers() {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf-8');
      users = JSON.parse(data);
      console.log('✅ Loaded', users.length, 'users from file');
    } else {
      console.log('📁 No users file found, starting fresh');
    }
  } catch (error) {
    console.error('❌ Error loading users:', error);
    users = [];
  }
}

// Save users to file
function saveUsers() {
  try {
    const dir = path.dirname(USERS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    console.log('💾 Saved', users.length, 'users to file');
  } catch (error) {
    console.error('❌ Error saving users:', error);
  }
}

// Load users when module is imported
loadUsers();

export function addUser(user: User) {
  users.push(user);
  saveUsers();
  console.log('📝 User added:', user.email, '- Total users:', users.length);
}

export function findUserByEmail(email: string) {
  const user = users.find(u => u.email === email);
  console.log('🔍 Looking for:', email, '- Found:', !!user, '- Total users:', users.length);
  return user;
}

export function getAllUsers() {
  return users;
}

export { users };
