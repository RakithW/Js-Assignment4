
document.addEventListener('DOMContentLoaded', function () {
    // display student information
    function showStudentInfo() {
        document.getElementById('student-info').textContent = 'Student ID: 200505619, Name: Rakith Wikramanayake';
    }
    // function to create a card for an agent
    function createAgentCard(agent) {
        // creats elements for card, img, name and button
        const card = document.createElement('div');
        card.className = 'agent-card';

        const img = document.createElement('img');
        img.src = agent.displayIcon;
        img.alt = agent.displayName;
        img.className = 'agent-image';

        const name = document.createElement('p');
        name.textContent = agent.displayName;

        const description = document.createElement('p');
        description.textContent = agent.description;
        description.style.display = 'none'; // Initially hide the description

        const infoButton = document.createElement('button');
        infoButton.textContent = 'Agent Info';
        infoButton.addEventListener('click', () => {
            // Toggle the display of the description
            description.style.display = description.style.display === 'none' ? 'block' : 'none';
        });

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(infoButton);
        card.appendChild(description);

        return card;
    }

    // funtion to handle the search operation
    function searchAgent() {
        // fetch agents filter based on search and display
        const searchTerm = document.getElementById('agent-search').value.toLowerCase();
        fetch('https://valorant-api.com/v1/agents')
            .then(response => response.json())
            .then(data => {
                const agents = data.data;
                const container = document.getElementById('agent-list');
                container.innerHTML = ''; // clear previous results

                const foundAgent = agents.find(agent => agent.displayName.toLowerCase() === searchTerm);
                if (foundAgent && foundAgent.isPlayableCharacter) {
                    const agentCard = createAgentCard(foundAgent);
                    container.appendChild(agentCard);
                } else {
                    container.textContent = 'Agent not found';
                }
            })
            .catch(error => console.error('Error:', error));
    }

    // function to display all agent names
    function displayAgentNames(agents) {
        const nameList = document.getElementById('name-list');
        nameList.innerHTML = '';

        agents.forEach(agent => {
            if (!agent.isPlayableCharacter) return;
            const listItem = document.createElement('li');
            listItem.textContent = agent.displayName;
            nameList.appendChild(listItem);
        });
    }

    fetch('https://valorant-api.com/v1/agents')
        .then(response => response.json())
        .then(data => {
            // handle fetch data
            const agents = data.data;
            displayAgentNames(agents);
        })
        .catch(error => console.error('Error:', error));

    // event listener for search button
    document.getElementById('search-button').addEventListener('click', searchAgent);

    document.getElementById('info-button').addEventListener('click', showStudentInfo);
});