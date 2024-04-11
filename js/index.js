// Function to fetch user data based on the search query
const searchUsers = async (query) => {
    const response = await fetch(https:api.github.com/search/users?q=${query});
    const data = await response.json();
    return data.items; // Assuming 'items' contains the user data
  };
  
  // Function to fetch user's repositories based on the username
  const getUserRepos = async (username) => {
    const response = await fetch(https:api.github.com/users/${username}/repos);
    const data = await response.json();
    return data;
  };
  
  // Event listener for form submission
  document.getElementById('github-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const searchQuery = document.getElementById('search').value;
    const users = await searchUsers(searchQuery);
    
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Clear previous search results
    
    users.forEach(user => {
      const userElement = document.createElement('li');
      userElement.innerHTML = `
        <h3>${user.login}</h3>
        <img src="${user.avatar_url}" alt="Avatar">
        <a href="${user.html_url}" target="_blank">View Profile</a>
      `;
      userList.appendChild(userElement);
      
      userElement.addEventListener('click', async () => {
        const repos = await getUserRepos(user.login);
        
        const reposList = document.getElementById('repos-list');
        reposList.innerHTML = ''; // Clear previous user's repositories
        
        repos.forEach(repo => {
          const repoElement = document.createElement('li');
          repoElement.innerHTML = `
            <h4>${repo.name}</h4>
            <p>${repo.description}</p>
          `;
          reposList.appendChild(repoElement);
        });
      });
    });
  });