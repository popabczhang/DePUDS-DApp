// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UrbanDevelopment {
    struct Project {
        uint id;
        string name;
        string description;
        address owner;
        uint votes;
        bool isActive;
    }

    mapping(uint => Project) public projects;
    mapping(address => mapping(uint => bool)) public votes;
    uint public projectCount;

    event ProjectCreated(uint id, string name, string description, address owner);
    event Voted(uint projectId, address voter);

    function createProject(string memory _name, string memory _description) public {
        projectCount++;
        projects[projectCount] = Project(projectCount, _name, _description, msg.sender, 0, true);
        emit ProjectCreated(projectCount, _name, _description, msg.sender);
    }

    function vote(uint _projectId) public {
        require(_projectId > 0 && _projectId <= projectCount, "Project does not exist");
        require(!votes[msg.sender][_projectId], "You have already voted for this project");
        require(projects[_projectId].isActive, "Project is not active");

        votes[msg.sender][_projectId] = true;
        projects[_projectId].votes++;
        emit Voted(_projectId, msg.sender);
    }

    function deactivateProject(uint _projectId) public {
        require(msg.sender == projects[_projectId].owner, "Only the owner can deactivate the project");
        projects[_projectId].isActive = false;
    }

    function getProject(uint _projectId) public view returns (uint, string memory, string memory, address, uint, bool) {
        Project memory project = projects[_projectId];
        return (project.id, project.name, project.description, project.owner, project.votes, project.isActive);
    }
}